export interface ICommentReport {
  id: number;
  reason: string;
  useYn: string;
  commentId?: number;
  comment?: string;
  reportedNickname?: string;
  reporterNickname?: string;
}
