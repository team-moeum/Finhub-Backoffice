import { IQuiz } from '@finhub/types/Quiz';
import { Modal, Radio, RadioChangeEvent } from 'antd';
import { useEffect, useState } from 'react';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHTextInput } from '@finhub/components/atoms/TextInput';
import { QuizTopicEditor } from '@finhub/components/organisms/QuizTopicEditor';
import styled from '@emotion/styled';

export const QuizModal = ({
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

const S = {
  formItemWrapper: styled.div`
    margin-bottom: 32px;
    width: 100%;
  `,
};
