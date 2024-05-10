import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { CreatePageTemplate } from '@finhub/components/templates/Create';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHTextInput } from '@finhub/components/atoms/TextInput';
import { FHButton } from '@finhub/components/atoms/Button';
import { FHSwitch } from '@finhub/components/atoms/Switch';
import { FHUploader } from '@finhub/components/atoms/Uploader';
import { message } from 'antd';
import { useConfirmNavigate } from '@finhub/hooks/useConfirmNavigate';
import { columnAPI } from '@finhub/api/column';
import { FHTextArea } from '@finhub/components/atoms/TextArea';
import { TopicEditor } from '@finhub/components/organisms/TopicEditor';

export const ColumnDetailPage = () => {
  const { id } = useParams();
  const columnId = Number(id);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [topicList, setTopicList] = useState<{ id: number; title: string }[]>(
    [],
  );
  const [useYN, setUseYN] = useState(false);
  const { onConfirm } = useConfirmNavigate(`/services/columns`);

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
      } else if (type === 'summary') {
        setSummary(value);
      } else if (type === 'content') {
        setContent(value);
      }
    };

  const initRequest = async () => {
    const showData = await columnAPI.show({ id: columnId });

    if (showData) {
      setTitle(showData.title ?? '');
      setSummary(showData.summary ?? '');
      setContent(showData.content ?? '');
      setTopicList(showData.topicList);
      setThumbnail(showData.backgroundUrl ?? '');
      setUseYN(showData.useYN === 'Y');
    }
  };

  const handleSubmit = () => {
    if (!title) {
      alert('컬럼명을 입력해주세요');
      return;
    }

    if (!summary) {
      alert('컬럼요약을 입력해주세요');
      return;
    }

    if (!content) {
      alert('컬럼내용을 입력해주세요');
      return;
    }

    if (!topicList) {
      alert('관련 토픽을 입력해주세요');
      return;
    }

    columnAPI.update({
      id: columnId,
      title,
      summary,
      content,
      topicList: topicList.map((topic) => topic.id),
      useYN: useYN ? 'Y' : 'N',
      backgroundUrl: thumbnail,
      file: thumbnail,
    });

    message.success('반영되었습니다.');
    onConfirm('컬럼목록으로 이동하시겠습니까?');
  };

  const handleUseYNChange = (value: boolean) => {
    setUseYN(value);
  };

  useEffect(() => {
    initRequest();
  }, []);

  return (
    <CreatePageTemplate label="컬럼 수정">
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="썸네일">
          <FHUploader thumbnail={thumbnail} setThumbnail={setThumbnail} />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="컬럼명">
          <FHTextInput
            type="text"
            value={title}
            onChange={handleTextChange('title')}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="컬럼요약">
          <FHTextInput
            type="text"
            value={summary}
            onChange={handleTextChange('summary')}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="컬럼내용">
          <FHTextArea value={content} onChange={handleTextChange('content')} />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="관련 토픽">
          <TopicEditor data={topicList} setter={setTopicList} />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="노출여부">
          <FHSwitch value={useYN} onChange={handleUseYNChange} />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHButton width="100%" onClick={handleSubmit} type="primary">
          컬럼 수정
        </FHButton>
      </S.formItemWrapper>
    </CreatePageTemplate>
  );
};

const S = {
  formItemWrapper: styled.div`
    max-width: 720px;
    width: 100%;
    padding: 0 16px;
    margin-bottom: 32px;
  `,
  cardWrapper: styled.div`
    width: 100%;
  `,
};
