import { useEffect, useState } from 'react';
import { topicAPI } from '../../api/topic';
import styled from '@emotion/styled';
import { FHFormItem } from '../../components/organisms/FormItem';
import { FHSelect } from '../../components/atoms/Select';
import { ICategory } from '../../types/Category';
import { categoryAPI } from '../../api/category';
import { ITopic } from '../../types/Topic';
import { IUsertype } from '../../types/UserType';
import { LayoutTemplate } from '../../components/templates/Layout';
import { FHDivider } from '../../components/atoms/Divider';
import { FHSearchInput } from '../../components/atoms/SearchInput';
import { FHCollapse } from '../../components/atoms/Collapse';
import { usertypeAPI } from '../../api/userType';

export const LogListPage = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('전체');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [topic, setTopic] = useState('전체');
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [usertype, setUsertype] = useState('전체');
  const [usertypes, setUsertypes] = useState<IUsertype[]>([]);

  const initRequest = async () => {
    const res = await Promise.all([
      categoryAPI.list({
        page: 1,
        listSize: 20,
        keyword: '',
        useYN: '',
      }),
      topicAPI.list({
        page: 1,
        category: '',
        listSize: 20,
        keyword: '',
        useYN: '',
      }),
      usertypeAPI.list({
        page: 1,
        listSize: 20,
        keyword: '',
        useYN: '',
      }),
    ]);
    setCategories(res[0].list);
    setTopics(res[1].list);
    setUsertypes(res[2].list);
  };

  const handleSearch = () => {
    initRequest();
  };

  const handleTextChange =
    (_: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleTopicChange = (value: string) => {
    setTopic(value);
  };

  const handleUsertypeChange = (value: string) => {
    setUsertype(value);
  };

  useEffect(() => {
    initRequest();
  }, [keyword]);

  return (
    <LayoutTemplate>
      <S.pageHeaderWrapper>
        <div>로그목록</div>
      </S.pageHeaderWrapper>
      <S.contentWrapper>
        <S.formWrapper>
          <S.formItemWrapper>
            <FHFormItem direction="horizontal" label="카테고리">
              <FHSelect
                value={category}
                onChange={handleCategoryChange}
                items={['전체', ...categories.map((item) => item.name)]}
              />
            </FHFormItem>
          </S.formItemWrapper>
          <S.formItemWrapper>
            <FHFormItem direction="horizontal" label="주제">
              <FHSelect
                value={topic}
                onChange={handleTopicChange}
                items={['전체', ...topics.map((item) => item.title)]}
              />
            </FHFormItem>
          </S.formItemWrapper>
          <S.formItemWrapper>
            <FHFormItem direction="horizontal" label="유저타입">
              <FHSelect
                value={usertype}
                onChange={handleUsertypeChange}
                items={['전체', ...usertypes.map((item) => item.name)]}
              />
            </FHFormItem>
          </S.formItemWrapper>
        </S.formWrapper>
        <FHDivider />
        <S.inputWrapper>
          <FHSearchInput
            placeholder=""
            value={keyword}
            onChange={handleTextChange('search')}
            onSearch={handleSearch}
          />
        </S.inputWrapper>
        <FHDivider />
        <FHCollapse
          items={[
            {
              key: '1',
              label:
                '주식에 관해서 주식매매란 무엇일까?에 대해서 !유저타입!에게 알기 쉽게 설명해주고 싶어. 비유를 들어서 !유저타입!이 이해하기 쉽게 설명해줘',
              children: (
                <p>
                  {`네, 알겠습니다. 주식매매를 설명하기 위해 비유를
                  사용하겠습니다. 여기서 !유저타입!을 '초등학생'으로 가정하고
                  설명을 시작하겠습니다.`}
                </p>
              ),
            },
          ]}
        />
      </S.contentWrapper>
    </LayoutTemplate>
  );
};

const S = {
  formWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 24px 0;
  `,
  formItemWrapper: styled.div`
    margin-right: 24px;
  `,
  pageHeaderWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;

    div {
      font-size: 16px;
      font-weight: 600;
    }
  `,
  contentWrapper: styled.div`
    width: 100%;
  `,
  inputWrapper: styled.div`
    width: 320px;
  `,
};
