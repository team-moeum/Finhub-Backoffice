import { useEffect, useState } from 'react';
import { ListPageTemplate } from '../../components/templates/List';
import { useNavigate } from 'react-router-dom';
import { categoryAPI } from '../../api/category';
import styled from '@emotion/styled';
import { FHSelect } from '../../components/atoms/Select';
import { FHFormItem } from '../../components/organisms/FormItem';

export const CategoryListPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [list, setList] = useState<
    { key?: number; no?: number; name?: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [useYN, setUseYN] = useState('전체');

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
      title: '노출여부',
      dataIndex: 'useYN',
      key: 'useYN',
    },
    {
      ellipsis: true,
      title: '카테고리명',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const initRequest = () => {
    const { list, totalDocuments } = categoryAPI.list({
      page: currentPage,
      listSize: 10,
      keyword,
      useYN,
    });

    setTotalDocuments(totalDocuments);

    const dataSource: {
      key?: number;
      no?: number;
      name?: string;
      useYN?: string;
    }[] = list.map((item, idx) => ({
      key: item.id,
      no: totalDocuments - idx,
      name: item.name,
      useYN: item.useYN,
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

  const handleUseYNChange = (value: string) => {
    setUseYN(value);
  };

  useEffect(() => {
    initRequest();
  }, [currentPage, useYN, keyword]);

  return (
    <ListPageTemplate
      label="카테고리목록"
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
        <FHFormItem direction="horizontal" label="노출여부">
          <FHSelect
            value={useYN}
            onChange={handleUseYNChange}
            items={['전체', 'Y', 'N']}
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
