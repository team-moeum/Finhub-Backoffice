export interface IQuiz {
  id: number;
  question: string;
  answer: string;
  comment: string;
  targetDate: string;
  createdBy: string;
  createdTime: string;
  modifiedTime: string;
  topicList: { id: number; title: string }[];
}
