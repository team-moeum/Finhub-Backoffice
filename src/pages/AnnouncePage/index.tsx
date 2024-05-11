import { useEffect, useState } from 'react';
import { ListPageTemplate } from '@finhub/components/templates/List';
import { useNavigate } from 'react-router-dom';
import { announceAPI } from '@finhub/api/announce';

const columns = [
  {
    width: 100,
    align: 'center',
    title: 'no',
    dataIndex: 'no',
    key: 'no',
  },
  {
    ellipsis: true,
    title: '제목',
    dataIndex: 'title',
    key: 'title',
  },
];

export const AnnounceListPage = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<
    { key?: number; no?: number; title?: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);

  const initRequest = async () => {
    const { list, totalDocuments } = await announceAPI.list({
      page: currentPage,
      listSize: 10,
    });

    setTotalDocuments(totalDocuments);

    const dataSource: {
      key?: number;
      no?: number;
      title?: string;
    }[] = list.map((item, idx) => ({
      key: item.id,
      no: totalDocuments - (currentPage - 1) * 10 - idx,
      title: item.title,
    }));

    setList(dataSource);
  };

  const handleTablePageChange = ({ current }: { current?: number }) => {
    setCurrentPage(current ?? 1);
  };

  const handleRow = (data: any) => {
    return {
      onClick: () => {
        navigate(`${location.pathname}/${data.key}`);
      },
    };
  };

  useEffect(() => {
    initRequest();
  }, [currentPage]);

  return (
    <ListPageTemplate
      label="공지사항목록"
      tableDataSource={list}
      tableColumns={columns}
      totalDocuments={totalDocuments}
      currentPage={currentPage}
      onTablePageChange={handleTablePageChange}
      onRow={handleRow}
      isSearch={false}
    />
  );
};
