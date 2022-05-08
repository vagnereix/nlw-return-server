import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/NodemailerMailAdapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/PrismaFeedbacksRepository';
import { GetFeedbackUseCase } from './useCases/GetFeedbacksUseCase';
import { SubmitFeedbackUseCase } from './useCases/SubmitFeedbackUseCase';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({ type, comment, screenshot });

  return res.status(201).send();
});

routes.get('/feedbacks', async (req, res) => {
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  const getFeedbackUseCase = new GetFeedbackUseCase(
    prismaFeedbacksRepository,
  );

  const feedbacks = await getFeedbackUseCase.execute();

  return res.status(201).json({ data: feedbacks });
});
