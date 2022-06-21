import { SubmitFeedback } from './submitFeedback';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

// const submitFeedback = new SubmitFeedback(
//   {
//     create: async () => {
//       return {
//         id: 'id-test',
//         type: 'type-test',
//         comment: 'comment-test',
//         screenshot: 'screenshot-test',
//       };
//     },
//   },
//   { sendMail: async () => {} },
// );

const submitFeedback = new SubmitFeedback(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

describe('Submit Feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'type-test',
        comment: 'comment-test',
        screenshot: 'data:image/png;base64,screenshot-test',
      }),
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'comment-test',
        screenshot: 'data:image/png;base64,screenshot-test',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'type-test',
        comment: '',
        screenshot: 'data:image/png;base64,screenshot-test',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'type-test',
        comment: 'comment-test',
        screenshot: 'invalid-screenshot,screenshot-test',
      }),
    ).rejects.toThrow();
  });
});
