import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListPageTemplate } from '../../components/templates/List';
import { topicAPI } from '../../api/topic';
import styled from '@emotion/styled';
import { FHFormItem } from '../../components/organisms/FormItem';
import { FHSelect } from '../../components/atoms/Select';
import { dataSource as categoryDataSource } from '../../api/category';

export const TopicListPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [list, setList] = useState<
    { key?: number; no?: number; name?: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [category, setCategory] = useState('전체');

  const columns = [
    {
      width: 100,
      align: 'center',
      title: 'no',
      dataIndex: 'no',
      key: 'no',
      render: (_: undefined, record: { key: string; no: string }) => (
        <button
          type="button"
          onClick={() => {
            navigate(`${location.pathname}/${record.key}`);
          }}
        >
          {record.no}
        </button>
      ),
    },
    {
      width: 100,
      align: 'center',
      title: '카테고리',
      dataIndex: 'category',
      key: 'category',
    },
    {
      ellipsis: true,
      title: '주제명',
      dataIndex: 'title',
      key: 'title',
    },
  ];

  const initRequest = () => {
    const { list, totalDocuments } = topicAPI.list({
      page: currentPage,
      listSize: 10,
      category,
      keyword,
    });

    setTotalDocuments(totalDocuments);

    const dataSource: {
      key?: number;
      no?: number;
      name?: string;
    }[] = list.map((item, idx) => ({
      key: item.id,
      no: totalDocuments - idx,
      title: item.title,
      category: item.category,
    }));

    setList(dataSource);
  };

  const handleSearch = () => {
    initRequest();
  };

  const handleTextChange =
    (_: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    };

  const handleTablePageChange = ({ current }: { current?: number }) => {
    setCurrentPage(current ?? 1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  useEffect(() => {
    initRequest();
  }, [currentPage, category, keyword]);

  return (
    <ListPageTemplate
      label="주제목록"
      keyword={keyword}
      onSearch={handleSearch}
      onTextChange={handleTextChange}
      tableDataSource={list}
      tableColumns={columns}
      totalDocuments={totalDocuments}
      currentPage={currentPage}
      onTablePageChange={handleTablePageChange}
      isSearch
    >
      <S.formItemWrapper>
        <FHFormItem direction="horizontal" label="카테고리">
          <FHSelect
            value={category}
            onChange={handleCategoryChange}
            items={['전체', ...categoryDataSource.map((item) => item.name)]}
          />
        </FHFormItem>
      </S.formItemWrapper>
    </ListPageTemplate>
  );
};

const S = {
  formItemWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 24px;
  `,
};
