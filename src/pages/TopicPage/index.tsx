import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { ListPageTemplate } from '@finhub/components/templates/List';
import { topicAPI } from '@finhub/api/topic';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHSelect } from '@finhub/components/atoms/Select';
import { ICategory } from '@finhub/types/Category';
import { categoryAPI } from '@finhub/api/category';
import { USE_YN_FILTER } from '@finhub/configs/constants';
import { arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core';
import { message } from 'antd';
import { MAX_LIST_SIZE } from '@finhub/api/common';

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
    title: '카테고리',
    dataIndex: 'category',
    key: 'category',
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
    title: '주제명',
    dataIndex: 'title',
    key: 'title',
  },
];

export const TopicListPage = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<
    { key?: number; no?: number; name?: string; position?: number }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [category, setCategory] = useState('전체');
  const [useYN, setUseYN] = useState(USE_YN_FILTER[0]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const initRequest = async () => {
    const listData = await categoryAPI.list({
      page: 1,
      listSize: MAX_LIST_SIZE,
      useYN: '전체',
    });
    setCategories(listData.list);

    const { list, totalDocuments } = await topicAPI.list({
      page: currentPage,
      listSize: 10,
      category: listData.list.find((item) => item.name === category)?.id,
      useYN,
    });

    setTotalDocuments(totalDocuments);

    const dataSource: {
      key?: number;
      no?: number;
      name?: string;
      title?: string;
      useYN?: string;
      position?: number;
    }[] = list.map((item, idx) => ({
      key: item.id,
      no: totalDocuments - (currentPage - 1) * 10 - idx,
      title: item.title,
      category: item.categoryName,
      useYN: item.useYN,
      position: item.position,
    }));

    setList(dataSource);
  };

  const handleTablePageChange = ({ current }: { current?: number }) => {
    setCurrentPage(current ?? 1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
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

        await topicAPI.updateOrder({ orders: orderMap });
        message.success('정상반영되었습니다.');
      } catch {
        message.error('오류 확인부탁드립니다.');
      }
    }
  };

  useEffect(() => {
    initRequest();
  }, [currentPage, category, useYN]);

  return (
    <ListPageTemplate
      label="주제목록"
      tableDataSource={list}
      tableColumns={columns}
      totalDocuments={totalDocuments}
      currentPage={currentPage}
      onTablePageChange={handleTablePageChange}
      isSearch={false}
      onRow={handleRow}
      isDnd={true}
      onDragEnd={handleDragEnd}
      onUpdateSort={handleUpdateSort}
    >
      <S.formWrapper>
        <S.formItemWrapper>
          <FHFormItem direction="horizontal" label="카테고리">
            <FHSelect
              value={category}
              onChange={handleCategoryChange}
              items={['전체', ...categories.map((item) => item.name)]}
            />
          </FHFormItem>
        </S.formItemWrapper>
        <S.formItemWrapper>
          <FHFormItem direction="horizontal" label="노출여부">
            <FHSelect
              value={useYN}
              onChange={handleUseYNChange}
              items={USE_YN_FILTER}
            />
          </FHFormItem>
        </S.formItemWrapper>
      </S.formWrapper>
    </ListPageTemplate>
  );
};

const S = {
  formWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 24px;
  `,
  formItemWrapper: styled.div`
    margin-right: 24px;
  `,
};
