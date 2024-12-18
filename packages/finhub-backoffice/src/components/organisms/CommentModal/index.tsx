import { Modal, message } from 'antd';
import { IComment } from '@finhub/types/Comment';
import { CommentList } from './CommentList';
import { columnAPI } from '@finhub/api/column';

export const CommentModal = ({
  list,
  open = false,
  loading = false,
  onCancel,
  onOK,
}: {
  list: IComment[];
  open?: boolean;
  loading?: boolean;
  onCancel?: () => void;
  onOK?: () => void;
}) => {
  const handleConfirm = async (id: number) => {
    if (window.confirm('신고처리하시겠습니까?')) {
      await columnAPI.confirmComment({ id });
      message.success('반영되었습니다');
    }
  };

  return (
    <>
      <Modal
        title={'댓글 목록'}
        okText="저장"
        open={open}
        onOk={onOK}
        confirmLoading={loading}
        onCancel={onCancel}
        closeIcon={false}
      >
        <CommentList data={list} confirm={handleConfirm} />
      </Modal>
    </>
  );
};
