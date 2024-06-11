/* eslint-disable no-sparse-arrays */
import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, TablePaginationConfig } from 'antd';
import { createContext, useContext, useMemo } from 'react';
import { FHTable } from './Table';

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

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = createContext<RowContextProps>({});

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

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row: React.FC<RowProps> = (props: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props['data-row-key'] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
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
  // const [data, setData] = useState(dataSource);
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
          components={{ body: { row: Row } }}
        />
      </SortableContext>
    </DndContext>
  );
};
