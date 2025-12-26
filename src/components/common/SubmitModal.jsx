import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExam } from "../../context/ExamContext";

/**
 * SubmitModal Component
 * A high-priority confirmation dialog that appears before ending the exam.
 */
const SubmitModal = ({ onClose }) => {
  const { setIsFinished } = useExam();
  const navigate = useNavigate();

  // UX Feature: Listen for the 'R' key to "Reverse"/Cancel while modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toUpperCase() === "R") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    // Cleanup listener when modal closes
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleFinalSubmit = () => {
    // 1. Mark exam as finished in global state
    setIsFinished(true);
    // 2. Navigate to the results page
    navigate("/results");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl p-6 md:p-10 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Warning Icon/Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Finish Exam?</h2>
        </div>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Are you sure you want to submit? You still have time remaining. You{" "}
          <strong>cannot</strong> change your answers after this action.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleFinalSubmit}
            className="w-full py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 active:scale-[0.98] transition-all shadow-lg shadow-red-200"
          >
            Yes, Submit My Exam
          </button>

          <button
            onClick={onClose}
            className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 active:scale-[0.98] transition-all"
          >
            Cancel and Return (R)
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400 font-medium uppercase tracking-widest">
          JAMB CBT Practice System
        </p>
      </div>
    </div>
  );
};

// CRITICAL: This line provides the default export required by ExamPage.jsx
export default SubmitModal;
