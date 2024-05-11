import { useState } from 'react';
import { Input, Switch, Button, Form } from 'antd';
import { ICommentReport } from '@finhub/types/CommentReport';

const ReasonEditor = ({
  data,
  onUpdate,
  onSubmit,
}: {
  data: ICommentReport;
  onUpdate: ({ id, reason, useYn }: ICommentReport) => void;
  onSubmit: ({ id, reason, useYn }: ICommentReport) => void;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Input
        value={data.reason}
        onChange={(e) =>
          onUpdate({ id: data.id, reason: e.target.value, useYn: data.useYn })
        }
      />
      <Switch
        checkedChildren="Y"
        unCheckedChildren="N"
        checked={data.useYn === 'Y'}
        onChange={(checked) =>
          onUpdate({
            id: data.id,
            reason: data.reason,
            useYn: checked ? 'Y' : 'N',
          })
        }
      />
      <Button
        onClick={() =>
          onSubmit({ id: data.id, reason: data.reason, useYn: data.useYn })
        }
      >
        저장
      </Button>
    </div>
  );
};

interface ReportReasonEditorProps {
  data: {
    id: number;
    reason: string;
    useYn: string;
  }[];
  onCreate: ({ reason }: { reason: string }) => void;
  onUpdate: ({ id, reason, useYn }: ICommentReport) => void;
  onSubmit: ({ id, reason, useYn }: ICommentReport) => void;
}

export const ReportReasonEditor = ({
  data,
  onCreate,
  onUpdate,
  onSubmit,
}: ReportReasonEditorProps) => {
  const [reason, setReason] = useState('');

  const handleCreate = () => {
    setReason('');
    onCreate({ reason });
  };

  const handleUpdate = (item: ICommentReport) => {
    onUpdate(item);
  };

  const handleSubmit = (item: ICommentReport) => {
    onSubmit(item);
  };

  return (
    <Form>
      <div
        style={{
          marginBottom: 20,
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
        }}
      >
        <Input
          placeholder="입력"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <Button type="primary" onClick={handleCreate}>
          생성
        </Button>
      </div>
      {data.map((item) => (
        <div key={item.id} style={{ marginBottom: 20 }}>
          <ReasonEditor
            data={item}
            onUpdate={handleUpdate}
            onSubmit={handleSubmit}
          />
        </div>
      ))}
    </Form>
  );
};
