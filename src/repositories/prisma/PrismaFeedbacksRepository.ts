import { prisma } from '../../prisma';
import { CreateFeedbackData, FeedbacksRepository } from '../FeedbacksRepository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: CreateFeedbackData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }

  async list() {
    return await prisma.feedback.findMany({ orderBy: { type: 'asc' } });
  }
}
