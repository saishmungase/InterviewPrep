
export function questionsPrompt (role, qlen, company, experience) {
    return `Generate exactly ${qlen && 3} interview questions for a ${role && 'engineer'} at ${company && "good company"}, with the candidate's experience level being ${experience && "fresher"}. Do not include any introductory text, explanations, or extra details. Provide the questions as a plain list, with each question on a new line.`
}