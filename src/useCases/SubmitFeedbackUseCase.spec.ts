import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const listFeedbacksSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy, list: listFeedbacksSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'This is a bug',
        screenshot: 'data:image/png;base64,AAuidhadjad',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without a type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'This is a bug',
        screenshot: 'data:image/png;base64,AAuidhadjad',
      })
    ).rejects.toThrow();
  });
  
  it('should not be able to submit feedback without a comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,AAuidhadjad',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback with a invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'This is a bug',
        screenshot: 'image/png',
      })
    ).rejects.toThrow();
  });
})
