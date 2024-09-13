export interface ICommentReport {
  id: number;
  reason: string;
  isProcessed: string;
  commentId?: number;
  comment?: string;
  reportedNickname?: string;
  reporterNickname?: string;
  approvalStatus?: string;
}
