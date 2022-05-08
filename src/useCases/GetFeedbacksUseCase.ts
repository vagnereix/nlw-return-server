import { FeedbacksRepository } from '../repositories/FeedbacksRepository';

export class GetFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
  ) {}

  async execute() {
    return await this.feedbacksRepository.list();
  }
}
