import { prisma } from '../../prisma';
import { FeedbackCreateData, FeedbackRepository } from '../feedbacksRepository';

export class PrismaFeedbackRepository implements FeedbackRepository {
  async create(data: FeedbackCreateData) {
    const { type, comment, screenshot } = data;

    const Feedback = await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });

    return Feedback;
  }
}
