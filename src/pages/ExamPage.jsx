import { useEffect, useState } from "react";
import { useExam } from "../context/ExamContext";
import ExamLayout from "../layouts/ExamLayout";
import SplitPane from "../components/exam/SplitPane";
import SinglePane from "../components/exam/SinglePa";

import SubmitModal from "../components/common/SubmitModal";
import useKeyboardNav from "../hooks/UsekeyboardNav";

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

  // Safety Check: If questions aren't loaded, don't try to render them
  if (!questions || !questions[subject]) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const currentQuestion = questions[subject][index];
  const currentAnswer = answers[`${subject}-${index}`];

  return (
    <ExamLayout>
      <div className="pb-24 h-full">
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

      {/* Persistent Navigation Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between lg:pr-80">
        <div className="flex gap-2 md:gap-4">
          <button
            onClick={prev}
            className="px-4 md:px-6 py-2 bg-gray-200 rounded-lg font-bold"
          >
            PREV (P)
          </button>
          <button
            onClick={next}
            className="px-4 md:px-6 py-2 bg-[#003366] text-white rounded-lg font-bold"
          >
            NEXT (N)
          </button>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 md:px-10 py-2 bg-red-600 text-white rounded-lg font-bold"
        >
          SUBMIT (S)
        </button>
      </footer>

      {isModalOpen && <SubmitModal onClose={() => setIsModalOpen(false)} />}
    </ExamLayout>
  );
}
