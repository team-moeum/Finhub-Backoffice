import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { ListPageTemplate } from '../../components/templates/List';
import { FHFormItem } from '../../components/organisms/FormItem';
import { FHSelect } from '../../components/atoms/Select';
import { noWordAPI } from '../../api/noWord';
import { Button } from 'antd';

export const NoWordListPage = () => {
  const [keyword, setKeyword] = useState('');
  const [list, setList] = useState<any[]>([
    {
      no: 2,
      key: 10,
      term: 'term3',
      requester: 'requester3',
      requestedAt: '2023-03-17T09:25:00',
      resolvedYN: 'Y',
    },
    {
      no: 1,
      key: 11,
      term: 'term1',
      requester: 'requester1',
      requestedAt: '2023-03-15T10:15:30',
      resolvedYN: 'N',
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [resolvedYN, setResolvedYN] = useState('전체');

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
        record: { key: string; term: string; resolvedYN: string },
      ) => {
        if (record.resolvedYN === 'N') {
          return (
            <Button
              type="primary"
              onClick={() => {
                if (window.confirm(`${record.term} 요청 확인하시겠습니까?`)) {
                  alert('정상 반영되었습니다');
                }
              }}
            >
              요청완료
            </Button>
          );
        }

        return (
          <Button
            type="primary"
            danger
            onClick={() => {
              if (window.confirm(`${record.term} 요청 취소하시겠습니까?`)) {
                alert('정상 반영되었습니다');
              }
            }}
          >
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
      keyword,
      resolvedYN,
    });

    setTotalDocuments(totalDocuments);

    const dataSource: {
      key?: number;
      no?: number;
      name?: string;
    }[] = list.map((item, idx) => ({
      key: item.id,
      no: totalDocuments - idx,
      term: item.term,
      resolvedYN: item.resolvedYN,
      requestedAt: item.requestedAt,
    }));

    setList(dataSource);
  };

  const handleSearch = () => {
    initRequest();
  };

  const handleTextChange =
    (_: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    };

  const handleTablePageChange = ({ current }: { current?: number }) => {
    setCurrentPage(current ?? 1);
  };

  const handleUseYNChange = (value: string) => {
    setResolvedYN(value);
  };

  useEffect(() => {
    initRequest();
  }, [currentPage, keyword, resolvedYN]);

  return (
    <ListPageTemplate
      label="없는 단어 요청 목록"
      isCreate={false}
      keyword={keyword}
      onSearch={handleSearch}
      onTextChange={handleTextChange}
      tableDataSource={list}
      tableColumns={columns}
      totalDocuments={totalDocuments}
      currentPage={currentPage}
      onTablePageChange={handleTablePageChange}
      placeholder="단어명을 검색해주세요"
      isSearch
    >
      <S.formWrapper>
        <S.formItemWrapper>
          <FHFormItem direction="horizontal" label="확인여부">
            <FHSelect
              value={resolvedYN}
              onChange={handleUseYNChange}
              items={['전체', 'Y', 'N']}
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
