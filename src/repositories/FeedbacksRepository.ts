import { Feedback } from "@prisma/client";

export interface CreateFeedbackData {
  type: string;
  comment: string;
  screenshot?: string;
}


export interface FeedbacksRepository {
  create(data: CreateFeedbackData): Promise<void>;
  list(): Promise<Feedback[]>;
}
