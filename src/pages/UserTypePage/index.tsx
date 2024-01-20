import { useEffect, useState } from 'react';
import { ListPageTemplate } from '../../components/templates/List';
import { useNavigate } from 'react-router-dom';
import { userTypeAPI } from '../../api/userType';

export const UserTypeListPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [list, setList] = useState<
    { key?: number; no?: number; name?: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);

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
      ellipsis: true,
      title: '유저유형명',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initRequest = () => {
    setIsLoading(true);
    const { list, totalDocuments } = userTypeAPI.list({
      page: currentPage,
      listSize: 10,
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
      name: item.name,
    }));

    setList(dataSource);
    setIsLoading(false);
  };

  const handleSearch = () => {
    initRequest();
  };

  const handleTextChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    };

  const handleTablePageChange = ({ current }: { current?: number }) => {
    setCurrentPage(current ?? 1);
  };

  useEffect(() => {
    initRequest();
  }, [currentPage, initRequest]);

  return (
    <ListPageTemplate
      label="유저유형목록"
      keyword={keyword}
      onSearch={handleSearch}
      onTextChange={handleTextChange}
      tableDataSource={list}
      tableColumns={columns}
      totalDocuments={totalDocuments}
      currentPage={currentPage}
      onTablePageChange={handleTablePageChange}
      isSearch
    />
  );
};
