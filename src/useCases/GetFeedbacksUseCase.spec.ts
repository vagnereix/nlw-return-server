import { GetFeedbackUseCase } from "./GetFeedbacksUseCase";

const createFeedbackSpy = jest.fn();
const listFeedbacksSpy = jest.fn();

const getFeedback = new GetFeedbackUseCase(
  { create: createFeedbackSpy, list: listFeedbacksSpy },
);

describe('Get feedbacks', () => {
  it('should be able to get feedbacks', async () => {
    await expect(getFeedback.execute()).resolves.not.toThrow();
    expect(listFeedbacksSpy).toBeCalled();
  });
});
