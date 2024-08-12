export interface FeedbackType {
  feedbackId: number;
  email: string;
  context: string;
  reply: string;
  createdTime: string;
}

export interface FeedbackItemType extends FeedbackType {
  userAgent: string;
  appVersion: string;
  fileUrl1: string | null;
  fileUrl2: string | null;
  fileUrl3: string | null;
  fileUrl4: string | null;
}
