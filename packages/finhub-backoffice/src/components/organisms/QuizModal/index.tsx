import { Modal, Radio, RadioChangeEvent, message } from 'antd';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FHFormItem } from '@finhub/components/organisms/FormItem';
import { FHTextInput } from '@finhub/components/atoms/TextInput';
import { TopicEditor } from '@finhub/components/organisms/TopicEditor';
import { quizAPI } from '@finhub/api/quiz';
import { IQuiz } from '@finhub/types/Quiz';
import { FHButton } from '@finhub/components/atoms/Button';

export const QuizModal = ({
  date = '',
  quizList = [],
  open = false,
  loading = false,
  onCancel,
  onOK,
}: {
  date: string;
  quizList: IQuiz[];
  open?: boolean;
  loading?: boolean;
  onCancel?: () => void;
  onOK?: () => void;
}) => {
  const [quizId, setQuizId] = useState(0);
  const [question, setQuestion] = useState('');
  const [comment, setComment] = useState('');
  const [answer, setAnswer] = useState('O');
  const [topicList, setTopicList] = useState<{ id: number; title: string }[]>(
    [],
  );
  const shouldReqAPI = quizList.map((quiz) => quiz.targetDate).includes(date);

  const initRequest = async () => {
    const data = await quizAPI.show({
      year: new Date(date).getFullYear(),
      month: new Date(date).getMonth() + 1,
      date: new Date(date).getDate(),
    });

    setQuizId(data.quizInfo.id);
    setQuestion(data.quizInfo.question);
    setComment(data.quizInfo.comment);
    setAnswer(data.quizInfo.answer);
    setTopicList(
      data.quizInfo.topicList.map(
        (topic: { topicId: number; title: string; categoryId: number }) => ({
          id: topic.topicId,
          title: topic.title,
        }),
      ),
    );
  };

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

  const handleSubmit = async () => {
    if (shouldReqAPI) {
      await quizAPI.update({
        id: quizId,
        year: new Date(date).getFullYear(),
        month: new Date(date).getMonth() + 1,
        day: new Date(date).getDate(),
        question,
        answer,
        comment,
        topicList: topicList.map((topic) => topic.id),
      });

      message.success('정상 반영되었습니다');

      return;
    }

    await quizAPI.create({
      year: new Date(date).getFullYear(),
      month: new Date(date).getMonth() + 1,
      day: new Date(date).getDate(),
      question,
      answer,
      comment,
      topicList: topicList.map((topic) => topic.id),
    });

    message.success('정상 반영되었습니다');

    if (onOK) onOK();
    initRequest();
  };

  const handleCancel = () => {
    setQuizId(0);
    setQuestion('');
    setComment('');
    setAnswer('');
    setTopicList([]);

    if (onCancel) onCancel();
  };

  const handleDelete = async () => {
    if (shouldReqAPI && window.confirm('퀴즈를 삭제하시겠습니까?')) {
      await quizAPI.remove({ id: quizId });
      message.success('반영되었습니다.');

      if (onOK) onOK();
      handleCancel();
    }
  };

  useEffect(() => {
    if (open && shouldReqAPI) {
      initRequest();
    }
  }, [open]);

  return (
    <Modal
      title={`${date} 퀴즈 상세`}
      okText="저장"
      open={open}
      onOk={handleSubmit}
      confirmLoading={loading}
      onCancel={handleCancel}
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
          <TopicEditor data={topicList} setter={setTopicList} />
        </FHFormItem>
      </S.formItemWrapper>
      {shouldReqAPI && (
        <FHButton onClick={handleDelete} type="default">
          퀴즈 삭제
        </FHButton>
      )}
    </Modal>
  );
};

const S = {
  formItemWrapper: styled.div`
    margin-bottom: 32px;
    width: 100%;
  `,
};
