export interface IColumn {
  id: number;
  title: string;
  summary: string;
  content: string;
  backgroundUrl: string;
  createdBy: string;
  useYN: string;
  createdTime: string;
  modifiedTime: string;
  topicList: {
    id: number;
    title: string;
  }[];
  commentList: {
    id: number;
    nickname: string;
    date: string;
    avatarImgPath: string;
    comment: string;
    like: number;
    reportedYn: string;
    useYn: string;
  }[];
}

export interface IColumnListItem {
  id: number;
  createdBy: string;
  title: string;
  createdTime: string;
  modifiedTime: string;
  useYN: string;
}
