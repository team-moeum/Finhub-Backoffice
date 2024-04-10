import { Table, TablePaginationConfig } from 'antd';

export interface TableProps {
  dataSource: any;
  columns: any;
  totalDocuments: number;
  currentPage: number;
  onTablePageChange: (pagination: TablePaginationConfig) => void;
  onRow?: any;
}

export const FHTable = ({
  dataSource,
  columns,
  totalDocuments = 0,
  currentPage = 1,
  onTablePageChange,
  onRow,
}: TableProps) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      onChange={onTablePageChange}
      pagination={{
        position: ['bottomCenter'],
        total: totalDocuments,
        current: currentPage,
      }}
      onRow={onRow}
    />
  );
};
