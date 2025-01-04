'use server';

import axios from "axios";

export const userInterview = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:4000/user-interviews`, {
            params: { id }
        });

        return response.data;

    } catch (e) {
        console.log('Error fetching user interviews:', e);
        return null;
    }
};


export const SetQuestionData = async (currentQuestion : string, answer :string, interviewId : string) => {
    
    await axios.post('http://localhost:4000/store-question', {
        question: currentQuestion,
        solution: answer,
        interviewId,
    });
}



export const interviewReview = async (interviewId : string) => { 
    try { 
        const response = await axios.get('http://localhost:4000/review', 
          { params: { id : interviewId } }); 
          return response.data;
        } 
    catch (error) { 
        console.error('Error fetching interview review:', error); 
        throw error;  
    } 
};

export const updateReview = async (interviewId : string) => {
    await axios.patch('http://localhost:4000/review-update', {
          id : interviewId 
        } 
    ); 
}