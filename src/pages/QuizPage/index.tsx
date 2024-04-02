import styled from '@emotion/styled';
import type { Dayjs } from 'dayjs';
import { Modal, Radio, RadioChangeEvent, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { FHDivider } from '../../components/atoms/Divider';
import { LayoutTemplate } from '../../components/templates/Layout';
import { FHCalendar } from '../../components/atoms/Calendar';
import { formatDateString } from '../../utils/formatter';
import { IQuiz } from '../../types/Quiz';
import { FHFormItem } from '../../components/organisms/FormItem';
import { FHTextInput } from '../../components/atoms/TextInput';
import { QuizTopicEditor } from '../../components/organisms/QuizTopicEditor';

const QuizModal = ({
  date = '',
  open = false,
  loading = false,
  onOk,
  onCancel,
}: {
  date: string;
  open?: boolean;
  loading?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}) => {
  const [question, setQuestion] = useState('');
  const [comment, setComment] = useState('');
  const [answer, setAnswer] = useState('O');

  const handleRadioChange = (e: RadioChangeEvent) => {
    setAnswer(e.target.value);
  };

  const handleTextChange =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (type === 'comment') {
        setComment(value);
      } else if (type === 'question') {
        setQuestion(value);
      }
    };

  useEffect(() => {
    const data: IQuiz = {
      id: 4,
      question: '금리가 오르면 대출을 받아야할까 ?',
      answer: 'O',
      comment: '금리가 인상하면 저축을 해야 좋아요!!',
      targetDate: '2024-03-18',
      createdBy: 'ROLE_SUPER',
      createdTime: '2024-03-17T00:18:24',
      modifiedTime: '2024-03-17T00:18:24',
      topicList: [
        {
          id: 1,
          title: '펀드란?',
        },
        {
          id: 2,
          title: '펀드란?',
        },
        {
          id: 3,
          title: '펀드란?',
        },
        {
          id: 4,
          title: '펀드란?',
        },
      ],
    };
    setQuestion(data.question);
    setComment(data.comment);
  }, []);

  return (
    <Modal
      title={`${date} 퀴즈 상세`}
      okText="저장"
      open={open}
      onOk={onOk}
      confirmLoading={loading}
      onCancel={onCancel}
      closeIcon={false}
    >
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="퀴즈명">
          <FHTextInput
            type="text"
            value={question}
            onChange={handleTextChange('question')}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="설명">
          <FHTextInput
            type="text"
            value={comment}
            onChange={handleTextChange('comment')}
          />
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="정답">
          <Radio.Group onChange={handleRadioChange} value={answer}>
            <Radio value={'O'}>O</Radio>
            <Radio value={'X'}>X</Radio>
          </Radio.Group>
        </FHFormItem>
      </S.formItemWrapper>
      <S.formItemWrapper>
        <FHFormItem direction="vertical" label="토픽">
          <QuizTopicEditor />
        </FHFormItem>
      </S.formItemWrapper>
    </Modal>
  );
};

export const QuizListPage = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(formatDateString(new Date()));

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleCalendarSelect = (
    date: Dayjs,
    info: {
      source: 'date' | 'month' | 'year' | 'customize';
    },
  ) => {
    if (info.source === 'date') {
      setDate(date.format('YYYY-MM-DD'));
      openModal();
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleSubmit = () => {};

  const cellRender = (cellDate: Dayjs) => {
    return (
      <S.cellRenderWrapper
        current={cellDate.month() === new Date(date).getMonth()}
      >
        <h3>금리가 인상하면 대출을 받는 것이 좋을까?</h3>
        <Tag>#펀드란?</Tag>+@
      </S.cellRenderWrapper>
    );
  };

  return (
    <>
      <LayoutTemplate>
        <S.pageHeaderWrapper>
          <div>퀴즈 목록</div>
        </S.pageHeaderWrapper>
        <FHDivider />
        <S.contentWrapper>
          <FHCalendar onSelect={handleCalendarSelect} cellRender={cellRender} />
        </S.contentWrapper>
      </LayoutTemplate>
      <QuizModal
        date={date}
        open={open}
        onCancel={handleCancel}
        onOk={handleSubmit}
      />
    </>
  );
};

const S = {
  pageHeaderWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;

    div {
      font-size: 16px;
      font-weight: 600;
    }
  `,
  contentWrapper: styled.div`
    width: 100%;
  `,
  cellRenderWrapper: styled.div<{ current: boolean }>`
    opacity: ${({ current }) => (current ? 1 : 0.4)};
    h3 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 8px;
    }
  `,
  formItemWrapper: styled.div`
    margin-bottom: 32px;
    width: 100%;
  `,
};
