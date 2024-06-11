import { useEffect, useState } from 'react';
import { ListPageTemplate } from '@finhub/components/templates/List';
import { useNavigate } from 'react-router-dom';
import { categoryAPI } from '@finhub/api/category';
import styled from '@emotion/styled';
import { FHSelect } from '@finhub/components/atoms/Select';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { USE_YN_FILTER } from '@finhub/configs/constants';
import { arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core';
import { message } from 'antd';

const columns = [
  {
    width: 100,
    align: 'center',
    title: 'no',
    dataIndex: 'no',
    key: 'no',
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

export const CategoryListPage = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<
    { key?: number; no?: number; name?: string; position?: number }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [useYN, setUseYN] = useState(USE_YN_FILTER[0]);

  const initRequest = async () => {
    const { list, totalDocuments } = await categoryAPI.list({
      page: currentPage,
      listSize: 10,
      useYN,
    });

    setTotalDocuments(totalDocuments);

    const dataSource: {
      key?: number;
      no?: number;
      name?: string;
      useYN?: string;
      position?: number;
    }[] = list.map((item, idx) => ({
      key: item.id,
      no: totalDocuments - (currentPage - 1) * 10 - idx,
      name: item.name,
      useYN: item.useYN,
      position: item.position,
    }));

    setList(dataSource);
  };

  const handleTablePageChange = ({ current }: { current?: number }) => {
    setCurrentPage(current ?? 1);
  };

  const handleUseYNChange = (value: string) => {
    setUseYN(value);
  };

  const handleRow = (data: any) => {
    return {
      onClick: () => {
        navigate(`${location.pathname}/${data.key}`);
      },
    };
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setList((prevState: any) => {
      const activeIndex = prevState.findIndex(
        (record: any) => record.key === active?.id,
      );
      const overIndex = prevState.findIndex(
        (record: any) => record.key === over?.id,
      );

      const newList = arrayMove([...prevState], activeIndex, overIndex);

      [newList[activeIndex].position, newList[overIndex].position] = [
        newList[overIndex].position,
        newList[activeIndex].position,
      ];

      return newList;
    });
  };

  const handleUpdateSort = async () => {
    if (window.confirm('순서를 변경하시겠습니까?')) {
      try {
        const orderMap = list.reduce<{ [key: number]: number }>((acc, item) => {
          if (item.position && item.key) {
            acc[item.key] = item.position;
          }
          return acc;
        }, {});

        await categoryAPI.updateOrder({ orders: orderMap });
        message.success('정상반영되었습니다.');
      } catch {
        message.error('오류 확인부탁드립니다.');
      }
    }
  };

  useEffect(() => {
    initRequest();
  }, [currentPage, useYN]);

  return (
    <ListPageTemplate
      label="카테고리목록"
      tableDataSource={list}
      tableColumns={columns}
      totalDocuments={totalDocuments}
      currentPage={currentPage}
      onTablePageChange={handleTablePageChange}
      onRow={handleRow}
      isSearch={false}
      isDnd={true}
      onDragEnd={handleDragEnd}
      onUpdateSort={handleUpdateSort}
    >
      <S.formItemWrapper>
        <FHFormItem direction="horizontal" label="노출여부">
          <FHSelect
            value={useYN}
            onChange={handleUseYNChange}
            items={USE_YN_FILTER}
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
