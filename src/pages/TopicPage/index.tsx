import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListPageTemplate } from '../../components/templates/List';
import { topicAPI } from '../../api/topic';

export const TopicListPage = () => {
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
      title: '주제명',
      dataIndex: 'title',
      key: 'title',
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initRequest = () => {
    setIsLoading(true);
    const { list, totalDocuments } = topicAPI.list({
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
      title: item.title,
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
    />
  );
};
