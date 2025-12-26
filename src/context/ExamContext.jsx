import { createContext, useContext, useState, useEffect } from "react";
import questionsData from "../data/questions";

const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
  const [subject, setSubject] = useState("English");
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(7200);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const selectOption = (opt) => {
    setAnswers((prev) => ({ ...prev, [`${subject}-${index}`]: opt }));
  };

  const next = () =>
    setIndex((i) => Math.min(i + 1, questionsData[subject].length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  return (
    <ExamContext.Provider
      value={{
        subject,
        setSubject,
        index,
        setIndex,
        questions: questionsData,
        answers,
        timeLeft,
        setTimeLeft,
        selectOption,
        next,
        prev,
        isFinished,
        setIsFinished,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

// Ensure this hook is exported!
export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error("useExam must be used within an ExamProvider");
  }
  return context;
};
