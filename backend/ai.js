import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getAiResponse({ role, company, experience }) {
  const prompt = questionsPrompt(role, company, experience);
  try {
    const result = await model.generateContent(prompt);

    const generatedQuestions = result.response.candidates[0].content.parts[0].text;

    return generatedQuestions;
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw error;
  }
}


export function questionsPrompt(role, company, experience) {
  return `Generate exactly ${5} interview questions for a ${role ? role : 'engineer'}
at ${company ? company : 'a reputable company'}, with the candidate's experience level being
${experience ? experience : 'fresher'}. Do not include any introductory text, explanations, or 
extra details. Provide the questions as a plain list, with each question on a new line. And question 
should be for face to face interview questions.`;
}

export const getAiReview = async (data) => {
  const prompt = `You are an expert interviewer providing feedback for a mock interview. Below are the questions asked during the interview and the answers provided by the user. Your task is to give a brief review of the overall performance and suggest specific improvements the user can make.

Questions and Answers:
${data
  .map(
    (item, index) =>
      `${index + 1}. Question: ${item.question}\n   Answer: ${item.useSoln}`
  )
  .join("\n\n")}

Please provide:
1. A general overview of the user's performance.
2. Specific areas where the user can improve.
3. Suggestions for how the user can enhance their answers in future interviews.`;


  try {
    const response = await model.generateContent(prompt);

    if (response && response.response && response.response.candidates && response.response.candidates[0] && response.response.candidates[0].content && response.response.candidates[0].content.parts && response.response.candidates[0].content.parts[0] && response.response.candidates[0].content.parts[0].text) {
      const aiText = response.response.candidates[0].content.parts[0].text;
      return aiText;
    } else {
      throw new Error('Invalid AI response structure');
    }
  } catch (error) {
    console.error('Error generating AI review:', error);
    throw error;
  }
};



export default getAiResponse;
