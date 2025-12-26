import React from "react";

export default function QuestionCard({ question, answer, onSelect }) {
  const options = question.options;

  return (
    <div>
      {/* Question Text */}
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-800 leading-relaxed">
          {question.text}
        </h3>
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {options.map((option, i) => {
          const label = String.fromCharCode(65 + i); // A, B, C, D
          const isSelected = answer === label;

          return (
            <button
              key={label}
              onClick={() => onSelect(label)}
              className={`w-full flex items-center p-4 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? "border-primary bg-blue-50 ring-1 ring-primary"
                  : "border-gray-100 hover:border-gray-300 bg-white"
              }`}
            >
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 font-bold ${
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {label}
              </span>
              <span
                className={`flex-1 text-lg ${
                  isSelected ? "text-primary font-bold" : "text-gray-700"
                }`}
              >
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
