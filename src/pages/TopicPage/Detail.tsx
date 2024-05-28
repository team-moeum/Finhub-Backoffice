import { message } from 'antd';
import { useEffect, useState } from 'react';
import { produce } from 'immer';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { CreatePageTemplate } from '@finhub/components/templates/Create';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHTextInput } from '@finhub/components/atoms/TextInput';
import { FHButton } from '@finhub/components/atoms/Button';
import { topicAPI } from '@finhub/api/topic';
import { FHUploader } from '@finhub/components/atoms/Uploader';
import { FHSelect } from '@finhub/components/atoms/Select';
import { GPTCard } from '@finhub/components/organisms/GPTCard';
import { FHSwitch } from '@finhub/components/atoms/Switch';
import { ICategory } from '@finhub/types/Category';
import { categoryAPI } from '@finhub/api/category';
import { FHTextArea } from '@finhub/components/atoms/TextArea';
import theme from '@finhub/styles/theme';
import { usertypeAPI } from '@finhub/api/userType';
import { LoadingTemplate } from '@finhub/components/templates/Loading/Loading';
import { useConfirmNavigate } from '@finhub/hooks/useConfirmNavigate';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

interface GPTItem extends GPTListItem {
  usertypeName: string;
  avatarImgPath: string;
}

interface GPTListItem {
  gptId?: number | null;
  content: string;
  useYN: string;
  usertypeId: number;
}

export const TopicDetailPage = () => {
  const { id } = useParams();
  const topicId = Number(id);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [definition, setDefinition] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState('');
  const [useYN, setUseYN] = useState(false);
  const [gptList, setGptList] = useState<GPTItem[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [gptTemplate, setGptTemplate] = useState('');
  const [tempGptTemplate, setTempGptTemplate] = useState('');
  const [gptIdx, setGptIdx] = useState(0);
  const [summary, setSummary] = useState('');
  const { onConfirm } = useConfirmNavigate(`/services/topics`);
  const navigate = useNavigate();

  const handleTextChange =
    (type: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      const { value } = e.target;
      if (type === 'title') {
        setTitle(value);
      } else if (type === 'definition') {
        setDefinition(value);
      } else if (type === 'gptTemplate') {
        setGptTemplate(value);
      } else if (type === 'tempGptTemplate') {
        setTempGptTemplate(value);
      } else if (type === 'summary') {
        setSummary(value);
      }
    };

  const initRequest = async () => {
    const [listData, userTypeData, data, promptData] = await Promise.all([
      categoryAPI.list({
        page: 1,
        listSize: 20,
        useYN: '전체',
      }),
      usertypeAPI.list({
        page: 1,
        listSize: 20,
        useYN: '전체',
      }),
      topicAPI.show({
        id: topicId,
      }),
      topicAPI.getPrompt(),
    ]);

    setCategories(listData.list);

    if (listData.list.length) {
      setCategory(listData.list[0].name);
    }

    if (data) {
      setTitle(data.title ?? '');
      setCategory(
        data.categoryName ?? (listData.list.length && listData.list[0].name),
      );
      setDefinition(data.definition ?? '');
      const newGptList = userTypeData.list.map((userType) => {
        const target = data.gptList.find(
          (gptUserType: GPTItem) => gptUserType.usertypeId === userType.id,
        );

        const newGPTItem: GPTItem = {
          usertypeId: userType.id,
          usertypeName: userType.name,
          avatarImgPath: userType.avatarImgPath ?? '',
          content: target?.content ?? '',
          useYN: target?.useYN ?? 'N',
        };

        if (target?.gptId) newGPTItem['gptId'] = target?.gptId;

        return newGPTItem;
      });
      setGptList(newGptList);
      setUseYN(data.useYN === 'Y');
      setThumbnail(data.thumbnailImgPath);
      setSummary(data.summary);
    }

    setGptTemplate(promptData.prompt);
    setTempGptTemplate(promptData.prompt);
  };

  const handleSubmit = () => {
    if (!title) {
      alert('주제명을 입력해주세요');
      return;
    }
    if (!definition) {
      alert('원본내용을 입력해주세요');
      return;
    }
    if (!summary) {
      alert('요약을 입력해주세요');
      return;
    }

    topicAPI.update({
      topicId,
      title,
      definition,
      summary,
      categoryId: categories.find((ct) => ct.name === category)?.id ?? -1,
      s3ImgUrl: thumbnail,
      file: thumbnail,
      gptList: gptList
        .filter((gpt) => gpt.content)
        .map((gpt) => {
          const listItem: GPTListItem = {
            content: gpt.content,
            useYN: gpt.useYN,
            usertypeId: gpt.usertypeId,
            gptId: null,
          };

          if (gpt.gptId) listItem['gptId'] = gpt.gptId;

          return listItem;
        }),
      useYN,
    });

    message.success('정상 반영되었습니다');
    onConfirm('주제목록으로 이동하시겠습니까?');
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleClickGPT = (idx: number) => () => {
    setGptIdx(idx);
  };

  const handleGPTCardClick = (idx: number) => async () => {
    try {
      setLoading(true);
      const { usertypeName, usertypeId } = gptList[idx];
      if (window.confirm(`${usertypeName} GPT를 생성하시겠습니까?`)) {
        const data = await topicAPI.craeteAITopicContent({
          topicId,
          categoryId: categories.find((ct) => ct.name === category)?.id ?? -1,
          userTypeId: usertypeId,
        });

        setGptList((prevGptList) => {
          return produce(prevGptList, (draft) => {
            draft[idx].content = data.answer;
          });
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGPTCardChange =
    (idx: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setGptList((prevGptList) => {
        return produce(prevGptList, (draft) => {
          draft[idx].content = e.target.value;
        });
      });
    };

  const handleGPTCardUseYNChange = (idx: number) => (value: boolean) => {
    setGptList((prevGptList) => {
      return produce(prevGptList, (draft) => {
        draft[idx].useYN = value ? 'Y' : 'N';
      });
    });
  };

  const handleUseYNChange = (value: boolean) => {
    setUseYN(value);
  };

  const handleClickKeyword = (keyword: string) => () => {
    setTempGptTemplate(tempGptTemplate + keyword);
  };

  const handleSubmitGptTemplate = () => {
    if (window.confirm('GPT 템플릿을 저장하시겠습니까?')) {
      topicAPI.craetePrompt({
        prompt: tempGptTemplate,
      });
      setGptTemplate(tempGptTemplate);

      message.success('정상 반영되었습니다');
    }
  };

  const handleClickSummaryGPT = async () => {
    if (window.confirm('토픽 요약 GPT를 생성하시겠습니까?')) {
      const data = await topicAPI.createTopicSummary({ id: topicId });
      setSummary(data.answer);

      message.success('정상 반영되었습니다');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('토픽을 삭제하시겠습니까?')) {
      await topicAPI.remove({ id: topicId });
      message.success('반영되었습니다.');
      navigate(`/services/topics`);
    }
  };

  useEffect(() => {
    initRequest();
  }, []);

  const keywords = ['!카테고리!', '!토픽!', '!유저타입!'];

  return (
    <LoadingTemplate loading={loading}>
      <CreatePageTemplate label="주제 수정">
        <S.contentWrapper>
          <S.formWrapper>
            <S.formItemWrapper>
              <FHFormItem direction="vertical" label="썸네일">
                <FHUploader thumbnail={thumbnail} setThumbnail={setThumbnail} />
              </FHFormItem>
            </S.formItemWrapper>
            <S.formItemWrapper>
              <FHFormItem direction="vertical" label="카테고리">
                <FHSelect
                  value={category}
                  onChange={handleCategoryChange}
                  items={categories.map((item) => item.name)}
                />
              </FHFormItem>
            </S.formItemWrapper>
            <S.formItemWrapper>
              <FHFormItem direction="vertical" label="주제명">
                <FHTextInput
                  type="text"
                  value={title}
                  onChange={handleTextChange('title')}
                />
              </FHFormItem>
            </S.formItemWrapper>
            <S.formItemWrapper>
              <S.formRowWrapper>
                <S.rowLabelWrapper>요약</S.rowLabelWrapper>
                <FHButton type="default" onClick={handleClickSummaryGPT}>
                  생성
                </FHButton>
              </S.formRowWrapper>
              <FHTextArea
                value={summary}
                onChange={handleTextChange('summary')}
              />
            </S.formItemWrapper>

            <S.formItemWrapper>
              <FHFormItem direction="vertical" label="원본내용">
                <FHTextArea
                  value={definition}
                  onChange={handleTextChange('definition')}
                />
              </FHFormItem>
            </S.formItemWrapper>
            <S.formItemWrapper>
              <FHFormItem direction="vertical" label="노출여부">
                <FHSwitch value={useYN} onChange={handleUseYNChange} />
              </FHFormItem>
            </S.formItemWrapper>
            <S.formItemWrapper>
              <FHFormItem direction="vertical" label="GPT">
                <S.rowWrapper>
                  {gptList.map((gpt, index) => (
                    <S.cardWrapper
                      key={gpt.usertypeId}
                      onClick={handleClickGPT(index)}
                      active={gptIdx === index}
                    >
                      <S.userTypeWrapper>
                        <S.avatar
                          style={{
                            backgroundImage: gpt.avatarImgPath
                              ? `url(${gpt.avatarImgPath})`
                              : 'url(/logo.png)',
                          }}
                        />
                        <S.name>{gpt.usertypeName}</S.name>
                      </S.userTypeWrapper>
                    </S.cardWrapper>
                  ))}
                </S.rowWrapper>
                <GPTCard
                  useYN={gptList[gptIdx] && gptList[gptIdx].useYN === 'Y'}
                  content={gptList[gptIdx] && gptList[gptIdx].content}
                  onClick={handleGPTCardClick(gptIdx)}
                  onChange={handleGPTCardChange(gptIdx)}
                  onUseYNChange={handleGPTCardUseYNChange(gptIdx)}
                />
              </FHFormItem>
            </S.formItemWrapper>
            <S.buttonWrapper>
              <FHButton width="100%" onClick={handleDelete} type="default">
                주제 삭제
              </FHButton>
              <FHButton width="100%" onClick={handleSubmit} type="primary">
                주제 수정
              </FHButton>
            </S.buttonWrapper>
          </S.formWrapper>
          <S.logWrapper>
            <S.formItemWrapper>
              <FHFormItem direction="vertical" label="GPT 템플릿">
                <FHTextArea readOnly value={gptTemplate} />
              </FHFormItem>
            </S.formItemWrapper>
            <S.formItemWrapper>
              <FHFormItem direction="vertical" label="">
                <S.rowWrapper>
                  {keywords.map((keyword) => (
                    <FHButton
                      key={keyword}
                      onClick={handleClickKeyword(keyword)}
                      type="default"
                    >
                      {keyword}
                    </FHButton>
                  ))}
                </S.rowWrapper>
                <FHTextArea
                  height={400}
                  value={tempGptTemplate}
                  onChange={handleTextChange('tempGptTemplate')}
                />
              </FHFormItem>
            </S.formItemWrapper>
            <S.formItemWrapper>
              <FHButton
                width="100%"
                onClick={handleSubmitGptTemplate}
                type="primary"
              >
                GPT 템플릿 수정
              </FHButton>
            </S.formItemWrapper>
          </S.logWrapper>
        </S.contentWrapper>
      </CreatePageTemplate>
    </LoadingTemplate>
  );
};

const S = {
  contentWrapper: styled.div`
    display: flex;
    flex-direction: row;
    max-width: 920px;
    width: 100%;
    padding: 0 16px;
    gap: 16px;
  `,
  formWrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
  `,
  logWrapper: styled.div`
    width: 50%;
    @media only screen and (min-width: 920px) {
      dispaly: none;
    }
  `,
  formItemWrapper: styled.div`
    margin-bottom: 32px;
    width: 100%;
  `,
  cardWrapper: styled.div<{ active: boolean }>`
    width: 100%;
    margin-bottom: 32px;
    transition:
      opacity,
      background 0.15s ease;
    padding: 6px;
    border-radius: 12px;
    ${(props) =>
      props.active
        ? css`
            opacity: 1;
            background-color: ${theme.colors.gray.eaeaea};
          `
        : css`
            opacity: 0.5;
          `}
  `,
  rowWrapper: styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    gap: 12px;
    width: 100%;
  `,
  userTypeWrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    cursor: pointer;
  `,
  avatar: styled.div`
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 44px;
    height: 44px;
    border-radius: 22px;
  `,
  name: styled.div`
    margin-top: 8px;
    text-align: center;
    font-size: 13px;
    width: max-content;
    color: ${theme.colors.text[444444]};
  `,
  rowLabelWrapper: styled.div`
    font-size: 14px;
    font-weight: 500;
  `,
  formRowWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
  `,
  buttonWrapper: styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  `,
};
