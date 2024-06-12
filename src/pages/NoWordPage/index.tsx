import { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import styled from '@emotion/styled';
import { ListPageTemplate } from '@finhub/components/templates/List';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHSelect } from '@finhub/components/atoms/Select';
import { noWordAPI } from '@finhub/api/noWord';
import { USE_YN_FILTER } from '@finhub/configs/constants';

export const NoWordListPage = () => {
  const [list, setList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [resolvedYN, setResolvedYN] = useState(USE_YN_FILTER[0]);

  const handleUpdate = async (id: number) => {
    await noWordAPI.update({ id });
    message.success('정상 반영되었습니다');
    initRequest();
  };

  const handleConfirm = (record: {
    key: number;
    term: string;
    resolvedYN: string;
  }) => {
    if (window.confirm(`${record.term} 요청 확인하시겠습니까?`)) {
      handleUpdate(record.key);
    }
  };

  const handleCancel = (record: {
    key: number;
    term: string;
    resolvedYN: string;
  }) => {
    if (window.confirm(`${record.term} 요청 취소하시겠습니까?`)) {
      handleUpdate(record.key);
    }
  };

  const columns = [
    {
      width: 100,
      align: 'center',
      title: 'no',
      dataIndex: 'no',
      key: 'no',
    },
    {
      align: 'center',
      title: '단어',
      dataIndex: 'term',
      key: 'term',
    },
    {
      width: 200,
      align: 'center',
      title: '요청시간',
      dataIndex: 'requestedAt',
      key: 'requestedAt',
    },
    {
      width: 100,
      align: 'center',
      title: '확인여부',
      dataIndex: 'resolvedYN',
      key: 'resolvedYN',
      render: (
        _: undefined,
        record: { key: number; term: string; resolvedYN: string },
      ) => {
        if (record.resolvedYN === 'N') {
          return (
            <Button type="primary" onClick={() => handleConfirm(record)}>
              요청완료
            </Button>
          );
        }

        return (
          <Button type="primary" danger onClick={() => handleCancel(record)}>
            요청취소
          </Button>
        );
      },
    },
  ];

  const initRequest = async () => {
    const { list, totalDocuments } = await noWordAPI.list({
      page: currentPage,
      listSize: 10,
      resolvedYN,
    });

    setTotalDocuments(totalDocuments);

    const dataSource: {
      key?: number;
      no?: number;
      name?: string;
    }[] = list.map((item, idx) => ({
      key: item.id,
      no: totalDocuments - (currentPage - 1) * 10 - idx,
      term: item.term,
      resolvedYN: item.resolvedYN,
      requestedAt: item.requestedAt,
    }));

    setList(dataSource);
  };

  const handleTablePageChange = ({ current }: { current?: number }) => {
    setCurrentPage(current ?? 1);
  };

  const handleUseYNChange = (value: string) => {
    setResolvedYN(value);
  };

  useEffect(() => {
    initRequest();
  }, [currentPage, resolvedYN]);

  return (
    <ListPageTemplate
      label="없는 단어 요청 목록"
      isCreate={false}
      tableDataSource={list}
      tableColumns={columns}
      totalDocuments={totalDocuments}
      currentPage={currentPage}
      onTablePageChange={handleTablePageChange}
      isSearch={false}
    >
      <S.formWrapper>
        <S.formItemWrapper>
          <FHFormItem direction="horizontal" label="확인여부">
            <FHSelect
              value={resolvedYN}
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
    margin: 24px 0;
  `,
  formItemWrapper: styled.div`
    margin-right: 24px;
  `,
};
