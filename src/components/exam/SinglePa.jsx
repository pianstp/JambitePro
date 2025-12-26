import React from "react";
import QuestionCard from "./QuestionCard";

/**
 * SinglePane Component
 * Used for non-English subjects (Math, Physics, etc.)
 * to provide a centered, distraction-free layout.
 */
const SinglePane = ({ question, answer, onSelect }) => {
  // Safety guard: If question is somehow missing, don't crash the app
  if (!question) {
    return (
      <div className="flex items-center justify-center p-10 text-gray-400">
        Loading question content...
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-4 md:py-8 px-4">
      {/* Container Card */}
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-200">
        {/* Badge/Breadcrumb */}
        <div className="mb-6">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest">
            Objective Question
          </span>
        </div>

        {/* The Question and Options */}
        <QuestionCard question={question} answer={answer} onSelect={onSelect} />

        {/* Keyboard Hint Footer (Optional but helpful) */}
        <div className="mt-8 pt-6 border-t border-gray-100 hidden md:flex gap-4 text-[10px] text-gray-400 font-medium">
          <span>[A-D] Select Option</span>
          <span>[N] Next</span>
          <span>[P] Previous</span>
        </div>
      </div>
    </div>
  );
};

// This line is the most important part to fix your error!
export default SinglePane;
