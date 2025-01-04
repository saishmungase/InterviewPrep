"use client";

import React, { useState } from "react";
import { useReview } from "@/hooks/hooks";

type Props = {
  id: string;
};

type Question = {
  id: string;
  question: string;
  useSoln: string;
};

type InterviewData = {
  id: string;
  role: string;
  qlen?: string | null;
  experience?: string;
  company?: string;
  review: string;
  questions: Question[];
  createdAt: string;
};

const parseReviewContent = (review) => {
  const parsedContent = [];

  const headingRegex = /(?<!\*)\*\*(.+?)\*\*/g; 
  const subheadingRegex = /\*\s*\*\*(.+?)\*\*/g; 
  const lines = review.split("\n");

  lines.forEach((line) => {
    let trimmedLine = line.trim();

    let subheadingMatch;
    while ((subheadingMatch = subheadingRegex.exec(trimmedLine)) !== null) {
      parsedContent.push(
        <h3 className="font-semibold text-lg text-gray-800 mb-2" key={parsedContent.length}>
          {subheadingMatch[1].trim()}
        </h3>
      );

      trimmedLine = trimmedLine.replace(subheadingMatch[0], "");
    }

    let match;
    let lastIndex = 0;
    while ((match = headingRegex.exec(trimmedLine)) !== null) {
      if (match.index > lastIndex) {
        parsedContent.push(
          <p className="text-gray-700 mb-2" key={parsedContent.length}>
            {trimmedLine.slice(lastIndex, match.index).trim()}
          </p>
        );
      }

      parsedContent.push(
        <h2 className="font-bold text-xl text-gray-900 mb-2" key={parsedContent.length}>
          {match[1].trim()}
        </h2>
      );

      lastIndex = headingRegex.lastIndex;
    }

    if (lastIndex < trimmedLine.length) {
      parsedContent.push(
        <p className="text-gray-700 mb-2" key={parsedContent.length}>
          {trimmedLine.slice(lastIndex).trim()}
        </p>
      );
    }
  });

  return <div>{parsedContent}</div>;
};



export const Review = ({ id }: Props) => {
  const { isLoading, data, error } = useReview(id);
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error || !data) {
    return (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
        role="alert"
      >
        <p className="font-bold">Error</p>
        <p>Failed to load interview data. Please try again later.</p>
      </div>
    );
  }

  const { role, company, experience, review, questions = [], createdAt } =
    data as InterviewData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-green-100 to-teal-200 shadow-lg rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{role.toUpperCase()} Interview</h1>
        <p className="text-gray-600 mb-4">
          {company && `Company: ${company}`}
          {experience && ` • Experience: ${experience}`}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Date: {new Date(createdAt).toLocaleDateString()}
        </p>
        <h2 className="text-lg font-semibold text-[1.8rem] underline text-gray-800 mb-2">AI Review</h2>
        <div>{parseReviewContent(review)}</div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Interview Questions</h2>
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-all"
          onClick={() => setShowQuestions(!showQuestions)}
        >
          {showQuestions ? "Hide Questions" : "View Questions"}
        </button>
      </div>

      {showQuestions && (
        <div className="grid grid-cols-1 gap-4">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="bg-green-50 shadow-md rounded-lg p-4 cursor-pointer hover:bg-green-100 transition-all"
              onClick={() => setSelectedQuestion(q)}
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Question {index + 1}
              </h3>
              <p className="text-gray-700">{q.question}</p>
            </div>
          ))}
        </div>
      )}

      {selectedQuestion && (
        <div className="fixed overflow-y-scroll inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-lg">
            <h3 className="text-xl font-bold mb-4 text-teal-600">Question Details</h3>
            <p className="mb-2 text-gray-800">
              <strong>Question:</strong> {selectedQuestion.question}
            </p>
            <p className="mb-4 text-gray-700">
              <strong>Your Response:</strong> {selectedQuestion.useSoln}
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
              onClick={() => setSelectedQuestion(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </div>
    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="bg-white shadow-lg rounded-lg p-6 mb-4 animate-pulse"
      >
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    ))}
  </div>
);
