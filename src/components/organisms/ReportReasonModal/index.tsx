import { columnAPI } from '@finhub/api/column';
import { Modal, message } from 'antd';
import { ICommentReport } from '@finhub/types/CommentReport';
import { useEffect, useState } from 'react';
import { ReportReasonEditor } from './ReportReasonEditor';

export const ReportReasonModal = ({
  open = false,
  loading = false,
  onCancel,
  onOK,
}: {
  open?: boolean;
  loading?: boolean;
  onCancel?: () => void;
  onOK?: () => void;
}) => {
  const [reasonList, setReasonList] = useState<ICommentReport[]>([]);

  const handleCreate = async (reason: string) => {
    await columnAPI.createReportReason({ reason });
    initRequest();
  };

  const handleUpdate = async (item: ICommentReport) => {
    const newList = reasonList.map((reason) => {
      if (reason.id === item.id) {
        return item;
      }

      return reason;
    });
    setReasonList(newList);
  };

  const handleSubmit = async (item: ICommentReport) => {
    await columnAPI.updateReportReason(item);
    message.success('반영되었습니다');
  };

  const initRequest = async () => {
    const data = await columnAPI.reportReason();
    setReasonList(data.reportReasons);
  };

  useEffect(() => {
    initRequest();
  }, []);

  return (
    <Modal
      title={'신고 사유 목록'}
      okText="저장"
      open={open}
      onOk={onOK}
      confirmLoading={loading}
      onCancel={onCancel}
      closeIcon={false}
    >
      <ReportReasonEditor
        data={reasonList}
        onCreate={({ reason }) => handleCreate(reason)}
        onUpdate={({ id, reason, useYn }) =>
          handleUpdate({ id, reason, useYn })
        }
        onSubmit={({ id, reason, useYn }) =>
          handleSubmit({ id, reason, useYn })
        }
      />
    </Modal>
  );
};
