import { IQuiz } from '@finhub/types/Quiz';
import { ApiResposne, client } from './client';

const list = async ({ year, month }: { year: number; month: number }) => {
  const url = `/admin/quiz/${year}/${month}`;

  const response: ApiResposne = await client.get(url);

  if (response.status === 'FAIL') {
    return {
      quizList: [],
    };
  }

  const dataSource: {
    quizList: IQuiz[];
  } = response.data;

  return dataSource;
};

const show = async ({
  year,
  month,
  date,
}: {
  year: number;
  month: number;
  date: number;
}) => {
  const url = `/admin/quiz/${year}/${month}/${date}`;

  const response: ApiResposne = await client.get(url);
  const dataSource = response.data;
  return dataSource;
};

const create = async ({
  year,
  month,
  day,
  question,
  answer,
  comment,
  topicList,
}: {
  year: number;
  month: number;
  day: number;
  question: string;
  answer: string;
  comment: string;
  topicList: number[];
}) => {
  const response: ApiResposne = await client.post('/admin/quiz', {
    year,
    month,
    day,
    question,
    answer,
    comment,
    topicList,
  });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

const update = async ({
  id,
  year,
  month,
  day,
  question,
  answer,
  comment,
  topicList,
}: {
  id: number;
  year: number;
  month: number;
  day: number;
  question: string;
  answer: string;
  comment: string;
  topicList: number[];
}) => {
  const response: ApiResposne = await client.put('/admin/quiz', {
    id,
    year,
    month,
    day,
    question,
    answer,
    comment,
    topicList,
  });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

const remove = async ({ id }: { id: number }) => {
  const response: ApiResposne = await client.delete('/admin/quiz', { id });

  if (response.status === 'FAIL') {
    return {
      errorMsg: response.errorMsg,
    };
  }

  const dataSource = response.data;

  return dataSource;
};

export const quizAPI = {
  list,
  show,
  create,
  update,
  remove,
};
