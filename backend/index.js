'use server';

import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import getAiResponse, { getAiReview } from './ai.js';

const app = express();

app.use(express.json());

const client = new PrismaClient();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/user-interviews', async (req, res) => {
  try {
    const data = await findInterview(req.query.id);
    res.send({ data });
  } catch (error) {
    console.error('Error in /user-interviews:', error);
    res.status(500).json({ error: 'Failed to fetch user interviews' });
  }
});

app.post('/book-interview', async (req, res) => {
  try {
    const { role, company, experience, id, review } = req.body;
    
    const finalRole = role || 'engineer';
    const finalCompany = company || 'a reputable company';
    const finalExperience = experience || 'fresher';

    const response = await getAiResponse({
      role: finalRole,
      company: finalCompany,
      experience: finalExperience
    });

    const newInterview = await addInterview(req.body);

    res.status(200).json({
      message: 'Data received successfully',
      questions: response, 
      interviewId: newInterview.id, 
    });
  } catch (error) {
    console.error('Error in /book-interview:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/store-question', async (req, res) => {
  const { question, solution, interviewId } = req.body;

  if (!interviewId) {
    return res.status(400).json({ error: 'Missing interviewId in request' });
  }

  const interview = await client.interview.findUnique({
    where: { id: interviewId },
  });

  if (!interview) {
    return res.status(404).json({ error: 'Interview not found' });
  }

  try {
    await client.question.create({
      data: {
        question,
        useSoln: solution,
        interviewId,
      },
    });

    res.status(200).json({ message: 'Question stored successfully' });
  } catch (error) {
    console.error('Error storing question:', error);
    res.status(500).json({ error: 'Failed to store question' });
  }
});


app.get('/review', async (req, res) => {
  const { id } = req.query; 
  if (!id) {
    return res.status(400).json({ error: 'Missing id parameter' });
  }

  try {
    const review = await getReview(id); 
    res.send(review);

  } catch (error) {
    console.error('Error in /review:', error);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
});

app.patch('/review-update', async (req, res) => {
  const { id } = req.body; 
  if (!id) {
    return res.status(400).json({ error: 'Missing id parameter' });
  }
  try {
    const success = await updateReview(id); 
    res.status(200).json({ message: 'Review updated successfully', success });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});


app.listen(4000, () => {
  console.log('Listening at Port 4000!');
});

async function addInterview({ role, company, experience, id, review }) {
  const user = await client.user.update({
    where: { id },
    data: {
      interviews: {
        create: {
          role,
          company,
          experience,
          review,
        },
      },
    },
    include: {
      interviews: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  return user.interviews[0];
}

const findInterview = async (id) => {
  try {
    const userWithInterviews = await client.user.findUnique({
      where: { id },
      select: {
        interviews: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
    return userWithInterviews?.interviews || [];
  } catch (error) {
    console.error('Error finding interviews:', error);
    throw error;
  }
};


const getReview = async (id) => {
  const data = await client.interview.findFirst({
    where: { id },
    select: {
      id: true,
      role: true,
      qlen: true,
      experience: true,
      company: true,
      review: true,
      questions: {
        select: {
          id: true,
          question: true,
          useSoln: true,
        },
      },
      createdAt: true,
    },
  });

  if (!data) {
    throw new Error("Interview not found");
  }
  return data;
};


const updateReview = async (id) => {
  try {
    const qAndA = await getQuestions(id); 
    if (!qAndA || !qAndA.questions) {
      throw new Error('Questions not found for the given interview ID');
    }

    const reviewText = await getAiReview(qAndA.questions);

    const updatedInterview = await client.interview.update({
      where: {
        id,
      },
      data: {
        review: reviewText,
      },
    });
    return updatedInterview;
  } catch (error) {
    console.error('Error in updateReview:', error);
    throw error;
  }
};


const getQuestions = async (id) => {
  try {
    const interview = await client.interview.findFirst({
      where: {
        id,
      },
      select: {
        questions: true,
      },
    });

    if (!interview) {
      throw new Error('Interview not found');
    }

    return interview;
  } catch (error) {
    console.error('Error in getQuestions:', error);
    throw error;
  }
};