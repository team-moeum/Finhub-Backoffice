/* eslint-disable no-sparse-arrays */
import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button, TablePaginationConfig } from 'antd';
import { useContext } from 'react';
import { DndTableRow, RowContext } from './DndTableRow';
import { FHTable } from '@finhub/components/atoms/Table';

export interface TableProps {
  dataSource: any;
  columns: any;
  totalDocuments: number;
  currentPage: number;
  onTablePageChange: (pagination: TablePaginationConfig) => void;
  onRow?: any;
  defaultPageSize?: number;
  restrictToVerticalAxis?: any;
  onDragEnd?: ({ active, over }: DragEndEvent) => void;
}

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

export const FHDndTable = ({
  dataSource,
  columns,
  totalDocuments = 0,
  currentPage = 1,
  onTablePageChange,
  onRow,
  defaultPageSize,
  onDragEnd,
}: TableProps) => {
  const handleDragEnd = (event: DragEndEvent) => {
    if (onDragEnd) {
      onDragEnd(event);
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
      <SortableContext
        items={dataSource.map((i: any) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <FHTable
          dataSource={dataSource}
          columns={[
            {
              key: 'sort',
              align: 'center',
              width: 80,
              render: () => <DragHandle />,
            },
            ,
            ...columns,
          ]}
          onTablePageChange={onTablePageChange}
          totalDocuments={totalDocuments}
          currentPage={currentPage}
          defaultPageSize={defaultPageSize}
          onRow={onRow}
          rowKey="key"
          components={{ body: { row: DndTableRow } }}
        />
      </SortableContext>
    </DndContext>
  );
};
