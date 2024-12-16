import { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import styled from '@emotion/styled';
import { ListPageTemplate } from '@finhub/components/templates/List';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHSelect } from '@finhub/components/atoms/Select';
import { USE_YN_FILTER } from '@finhub/configs/constants';
import { columnAPI } from '@finhub/api/column';

export const ColumnCommentReportPage = () => {
  const [list, setList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [useYn, setUseYn] = useState(USE_YN_FILTER[0]);

  const columns = [
    {
      width: 100,
      align: 'center',
      title: 'no',
      dataIndex: 'no',
      key: 'no',
    },
    {
      width: 240,
      align: 'left',
      title: '댓글내용',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      align: 'left',
      title: '작성자',
      dataIndex: 'reportedNickname',
      key: 'reportedNickname',
    },
    {
      align: 'left',
      title: '신고자',
      dataIndex: 'reporterNickname',
      key: 'reporterNickname',
    },
    {
      align: 'left',
      title: '신고사유',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      width: 100,
      align: 'center',
      title: '신고처리',
      dataIndex: 'useYn',
      key: 'useYn',
      render: (
        _: undefined,
        record: {
          key: number;
          commentId: number;
          reason: string;
          useYn: string;
        },
      ) => {
        if (record.useYn === 'N') {
          return (
            <Button
              type="primary"
              onClick={() => {
                if (window.confirm(`신고 처리하시겠습니까?`)) {
                  columnAPI.confirmComment({ id: record.commentId });
                  message.success('정상 반영되었습니다');
                  initRequest();
                }
              }}
            >
              신고요청
            </Button>
          );
        }

        return <div>신고완료</div>;
      },
    },
  ];

  const initRequest = async () => {
    const { list, totalDocuments } = await columnAPI.listCommentReport({
      page: currentPage,
      listSize: 10,
      useYn,
    });

    setTotalDocuments(totalDocuments);

    if (list && list.length) {
      const dataSource: {
        key?: number;
        no?: number;
        commentId?: number;
        reason?: string;
        useYn?: string;
        comment?: string;
        reportedNickname?: string;
        reporterNickname?: string;
      }[] = list.map((item, idx) => ({
        key: item.id,
        commentId: item.commentId,
        no: totalDocuments - (currentPage - 1) * 10 - idx,
        reason: item.reason,
        useYn: item.useYn,
        comment: item.comment,
        reportedNickname: item.reportedNickname,
        reporterNickname: item.reporterNickname,
      }));

      setList(dataSource);
    }
  };

  const handleTablePageChange = ({ current }: { current?: number }) => {
    setCurrentPage(current ?? 1);
  };

  const handleUseYNChange = (value: string) => {
    setUseYn(value);
  };

  useEffect(() => {
    initRequest();
  }, [currentPage, useYn]);

  return (
    <ListPageTemplate
      isCreate={false}
      label="GPT 칼럼 댓글 신고 목록"
      tableDataSource={list}
      tableColumns={columns}
      totalDocuments={totalDocuments}
      currentPage={currentPage}
      onTablePageChange={handleTablePageChange}
      isSearch={false}
      isBack
    >
      <S.formWrapper>
        <S.formItemWrapper>
          <FHFormItem direction="horizontal" label="노출여부">
            <FHSelect
              value={useYn}
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
