import { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import styled from '@emotion/styled';
import { ListPageTemplate } from '@finhub/components/templates/List';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHSelect } from '@finhub/components/atoms/Select';
import {
  COMMENT_REPORT_STATUS,
  USE_YN_FILTER,
} from '@finhub/configs/constants';
import { columnAPI } from '@finhub/api/column';
import { useParams } from 'react-router-dom';
import { ICommentReport } from '@finhub/types/CommentReport';

interface TableDataSource extends Omit<ICommentReport, 'id'> {
  key: number;
  no: number;
}

export const ColumnCommentReportPage = () => {
  const { id } = useParams();
  const [list, setList] = useState<TableDataSource[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [isProcessed, setIsProcessed] = useState(USE_YN_FILTER[0]);

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
      width: 120,
      align: 'center',
      title: '신고처리',
      dataIndex: 'isProcessed',
      key: 'isProcessed',
      render: (
        _: undefined,
        record: {
          key: number;
          commentId: number;
          reason: string;
          isProcessed: string;
          approvalStatus: string;
        },
      ) => {
        if (record.isProcessed === 'N') {
          return (
            <S.buttonWrapper>
              <Button
                type="primary"
                onClick={handleConfirmComment(
                  record.commentId,
                  COMMENT_REPORT_STATUS.APPROVED,
                )}
              >
                신고
              </Button>
              <Button
                onClick={handleConfirmComment(
                  record.commentId,
                  COMMENT_REPORT_STATUS.REJECTED,
                )}
              >
                반려
              </Button>
            </S.buttonWrapper>
          );
        }

        return (
          <div>
            신고
            {record.approvalStatus === COMMENT_REPORT_STATUS.REJECTED
              ? '반려'
              : '처리'}
            완료
          </div>
        );
      },
    },
  ];

  const handleConfirmComment =
    (id: number, approvalStatus: COMMENT_REPORT_STATUS) => async () => {
      if (window.confirm('신고 처리하시겠습니까?')) {
        await columnAPI.confirmComment({ id, approvalStatus });
        message.success('정상 반영되었습니다');
        initRequest();
      }
    };

  const initRequest = async () => {
    const { list, totalDocuments } = await columnAPI.listCommentReport({
      columnId: id || '',
      page: currentPage,
      listSize: 10,
      isProcessed,
    });

    setTotalDocuments(totalDocuments);

    const dataSource: TableDataSource[] = list.map(
      (item: ICommentReport, idx) => ({
        key: item.id,
        commentId: item.commentId,
        no: totalDocuments - (currentPage - 1) * 10 - idx,
        reason: item.reason,
        isProcessed: item.isProcessed,
        comment: item.comment,
        reportedNickname: item.reportedNickname,
        reporterNickname: item.reporterNickname,
        approvalStatus: item.approvalStatus,
        useYn: item.useYn,
      }),
    );

    setList(dataSource);
  };

  const handleTablePageChange = ({ current }: { current?: number }) => {
    setCurrentPage(current ?? 1);
  };

  const handleIsProcessedChange = (value: string) => {
    setIsProcessed(value);
  };

  useEffect(() => {
    initRequest();
  }, [currentPage, isProcessed, id]);

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
          <FHFormItem direction="horizontal" label="신고처리여부">
            <FHSelect
              value={isProcessed}
              onChange={handleIsProcessedChange}
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
  buttonWrapper: styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  `,
};
