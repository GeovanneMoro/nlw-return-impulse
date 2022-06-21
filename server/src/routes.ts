import express from 'express';

import { prisma } from './prisma';

import { NodemailerMailAdapter } from './nodemailer/nodemailerMailAdapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prismaFeedbackRepository';

import { SubmitFeedback } from './services/submitFeedback';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedback = new SubmitFeedback(
    prismaFeedbackRepository,
    nodemailerMailAdapter,
  );

  const newFeedback = await submitFeedback.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send(newFeedback);
});

routes.get('/feedbacks', async (req, res) => {
  const allFeedbacks = await prisma.feedback.findMany();

  return res.json(allFeedbacks);
});
