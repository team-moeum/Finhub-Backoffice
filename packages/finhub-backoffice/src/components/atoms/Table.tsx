import { Table, TablePaginationConfig } from 'antd';

export interface TableProps {
  dataSource: any;
  columns: any;
  totalDocuments: number;
  currentPage: number;
  onTablePageChange: (pagination: TablePaginationConfig) => void;
  onRow?: any;
  defaultPageSize?: number;
  rowKey?: string;
  components?: any;
}

export const FHTable = ({
  dataSource,
  columns,
  totalDocuments = 0,
  currentPage = 1,
  onTablePageChange,
  onRow,
  defaultPageSize = 10,
  rowKey,
  components,
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
        pageSize: defaultPageSize,
      }}
      onRow={onRow}
      rowKey={rowKey}
      components={components}
    />
  );
};
