import moment from 'moment';

import { MailAdapter } from '../adapters/mailAdapter';
import { FeedbackRepository } from '../repositories/feedbacksRepository';

interface SubmitFeedbackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedback {
  private feedbacksRepository: FeedbackRepository;
  private mailAdapter: MailAdapter;

  constructor(
    feedbacksRepository: FeedbackRepository,
    mailAdapter: MailAdapter,
  ) {
    this.feedbacksRepository = feedbacksRepository;
    this.mailAdapter = mailAdapter;
  }

  async execute(request: SubmitFeedbackRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error('Type is required.');
    }

    if (!comment) {
      throw new Error('Comment is required.');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new Error(
        'Invalid screenshot format. It should be a base64 encoded image.',
      );
    }

    const feedback = await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #222">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<p>Screenshot: <img src="${screenshot}" /></p>` : '',
        `<p>Feedback enviado no dia ${new Date().toLocaleDateString(
          'pt-br',
        )} às ${moment().format('LTS')}</p>`,
        `</div>`,
      ].join('\n'),
    });

    return feedback;
  }
}
