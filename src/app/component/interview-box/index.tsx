'use client';

import { useEffect, useState } from 'react';
import { Screen } from '../interview-sections/interview-question';
import { Script } from '../interview-sections/interview-script';
import { SetQuestionData, updateReview } from '@/actions';
import { Video } from '../interview-sections/interview-vid';
import { createSwapy } from 'swapy';

export const InterviewBox = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const storedData = localStorage.getItem('questionsData');
    if (storedData) {
      setQuestions(JSON.parse(storedData));
    }

    const container = document.querySelector('.container');
    const swap = createSwapy(container, {
      swapMode: 'hover',
    });
    console.log(swap);
  }, []);

  const handleSubmit = async (answer: string) => {
    const currentQuestion = questions[currentIndex];
    
    const interviewId = localStorage.getItem('interviewId'); 
    
    if (!interviewId) {
      alert('Interview ID not found. Please start an interview first.');
      return;
    }

    try {
      await SetQuestionData(currentQuestion, answer, interviewId );

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        alert('Thank You!');
        await updateReview(interviewId);
        window.location.href = `/dashboard/`;
      }
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const currentQuestion = questions[currentIndex] || '';

  return (
    <div className="container overflow-hidden gap-2 flex w-[100%] h-[90%] rounded-lg shadow-2xl p-6 bg-gray-900 text-white border-2 border-gray-700">
  <div className="slot a w-1/2 h-[90%] w-[50%] flex justify-center items-center bg-gray-800 rounded-lg shadow-lg" data-swapy-slot="1">
    <Video />
  </div>
  <div className="second-row h-[90%] w-[50%] flex flex-col justify-between bg-gray-850 rounded-lg p-4 shadow-lg">
    <div className="slot c h-1/4 flex items-center justify-center bg-black rounded-md shadow-md" data-swapy-slot="3">
      <Screen currentQuestion={currentQuestion} />
    </div>
    <div className="slot b h-3/4 bg-gray-700 rounded-md shadow-md flex flex-col justify-between p-4" data-swapy-slot="2">
      <Script currentQuestion={currentQuestion} onSubmit={handleSubmit} />
    </div>
  </div>
</div>

  );
};
