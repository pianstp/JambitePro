import { useEffect, useState } from "react";
import { useExam } from "../context/ExamContext";
import ExamLayout from "../layouts/ExamLayout";
import SplitPane from "../components/exam/SplitPane";
import SinglePane from "../components/exam/SinglePa"; // Fixed typo from 'SinglePa'
import SubmitModal from "../components/common/SubmitModal";
import useKeyboardNav from "../hooks/UsekeyboardNav"; // Fixed casing from 'UsekeyboardNav'

export default function ExamPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Custom hook for A, B, C, D, N, P, S keys
  useKeyboardNav(setIsModalOpen);

  const {
    subject,
    index,
    questions,
    answers,
    selectOption,
    next,
    prev,
    setTimeLeft,
  } = useExam();

  // Timer Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [setTimeLeft]);

  // Safety Check: If questions aren't loaded
  if (!questions || !questions[subject]) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-[#003366]">
        Loading Exam Content...
      </div>
    );
  }

  const currentQuestion = questions[subject][index];
  const currentAnswer = answers[`${subject}-${index}`];

  return (
    <ExamLayout>
      {/* Main Content Area - Added padding bottom to prevent footer overlap */}
      <div className="pb-32 min-h-screen">
        {subject === "English" && currentQuestion.passage ? (
          <SplitPane
            question={currentQuestion}
            answer={currentAnswer}
            onSelect={selectOption}
          />
        ) : (
          <SinglePane
            question={currentQuestion}
            answer={currentAnswer}
            onSelect={selectOption}
          />
        )}
      </div>

      {/* RESPONSIVE NAVIGATION FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-3 sm:p-4 z-40 lg:pr-80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left Side: Prev/Next Group */}
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={prev}
              className="flex-1 sm:flex-none px-4 sm:px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm sm:text-base hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="hidden sm:inline">PREVIOUS</span>
              <span className="sm:hidden">PREV</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-xs bg-white rounded border border-gray-300 shadow-sm">
                P
              </kbd>
            </button>

            <button
              onClick={next}
              className="flex-1 sm:flex-none px-4 sm:px-10 py-3 bg-[#003366] text-white rounded-xl font-bold text-sm sm:text-base hover:bg-blue-800 active:scale-95 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
            >
              <span className="hidden sm:inline">NEXT QUESTION</span>
              <span className="sm:hidden">NEXT</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-xs bg-blue-700 rounded border border-blue-500 shadow-sm">
                N
              </kbd>
            </button>
          </div>

          {/* Right Side: Submit Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 sm:px-8 py-3 bg-red-600 text-white rounded-xl font-bold text-sm sm:text-base hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-100 flex items-center gap-2"
          >
            <span className="hidden sm:inline">SUBMIT</span>
            <span className="sm:hidden">FINISH</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-xs bg-red-500 rounded border border-red-400 shadow-sm">
              S
            </kbd>
          </button>
        </div>
      </footer>

      {isModalOpen && <SubmitModal onClose={() => setIsModalOpen(false)} />}
    </ExamLayout>
  );
}
