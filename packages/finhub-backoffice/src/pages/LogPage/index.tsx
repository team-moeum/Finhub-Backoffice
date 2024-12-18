import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { topicAPI } from '@finhub/api/topic';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHSelect } from '@finhub/components/atoms/Select';
import { ICategory } from '@finhub/types/Category';
import { categoryAPI } from '@finhub/api/category';
import { ITopic } from '@finhub/types/Topic';
import { IUsertype } from '@finhub/types/UserType';
import { LayoutTemplate } from '@finhub/components/templates/Layout';
import { FHDivider } from '@finhub/components/atoms/Divider';
import { FHCollapse } from '@finhub/components/atoms/Collapse';
import { usertypeAPI } from '@finhub/api/userType';
import { gptLogAPI } from '@finhub/api/gptLog';
import { IGptLog } from '@finhub/types/GptLog';
import { MAX_LIST_SIZE } from '@finhub/api/common';

export const LogListPage = () => {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [topic, setTopic] = useState('');
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [usertype, setUsertype] = useState('');
  const [usertypes, setUsertypes] = useState<IUsertype[]>([]);
  const [list, setList] = useState<IGptLog[]>([]);

  const initRequest = async () => {
    const res = await Promise.all([
      categoryAPI.list({
        page: 1,
        listSize: MAX_LIST_SIZE,
        useYN: '전체',
      }),
      usertypeAPI.list({
        page: 1,
        listSize: MAX_LIST_SIZE,
        useYN: '전체',
      }),
    ]);
    setCategories(res[0].list);
    if (res[0].list.length) {
      setCategory(res[0].list[0].name);
    }

    setUsertypes(res[1].list);
    if (res[1].list.length) {
      setUsertype(res[1].list[0].name);
    }
  };

  const handleChangeTopic = async () => {
    const data = await topicAPI.list({
      page: 1,
      category: categories.find((ct) => ct.name === category)?.id ?? -1,
      listSize: MAX_LIST_SIZE,
      useYN: '전체',
    });

    setTopics(data.list);
    setTopic(data.list.length ? data.list[0].title : '');
  };

  const handleSearch = async () => {
    const data = await gptLogAPI.list({
      topicId: topics.find((ct) => ct.title === topic)?.id ?? -1,
      usertypeId: usertypes.find((ct) => ct.name === usertype)?.id ?? -1,
    });

    setList(data.list);
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
  }, []);

  useEffect(() => {
    if (category) {
      handleChangeTopic();
    }
  }, [category]);

  useEffect(() => {
    if (usertype && topic) {
      handleSearch();
    }
  }, [usertype, topic]);

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
                items={[...categories.map((item) => item.name)]}
              />
            </FHFormItem>
          </S.formItemWrapper>
          <S.formItemWrapper>
            <FHFormItem direction="horizontal" label="주제">
              <FHSelect
                value={topic}
                onChange={handleTopicChange}
                items={[...topics.map((item) => item.title)]}
              />
            </FHFormItem>
          </S.formItemWrapper>
          <S.formItemWrapper>
            <FHFormItem direction="horizontal" label="유저타입">
              <FHSelect
                value={usertype}
                onChange={handleUsertypeChange}
                items={[...usertypes.map((item) => item.name)]}
              />
            </FHFormItem>
          </S.formItemWrapper>
        </S.formWrapper>
        <FHDivider />
        {list?.map((log) => (
          <FHCollapse
            key={log.id}
            items={[
              {
                key: log.id,
                label: log.question,
                children: <p>{log.answer}</p>,
              },
            ]}
          />
        ))}
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
