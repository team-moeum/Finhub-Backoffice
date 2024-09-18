import { Modal } from 'antd';
import { IComment } from '@finhub/types/Comment';
import { CommentList } from './CommentList';

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
        <CommentList data={list} />
      </Modal>
    </>
  );
};
