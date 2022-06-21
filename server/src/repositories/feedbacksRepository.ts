export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

interface Feedback {
  id: string;
  type: string;
  comment: string;
  screenshot: null | string;
}

export interface FeedbackRepository {
  create: (data: FeedbackCreateData) => Promise<Feedback>;
}
