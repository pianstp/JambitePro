import { useEffect } from "react";
import { useExam } from "../context/ExamContext";

export default function useKeyboardNav(openSubmit) {
  const { selectOption, next, prev } = useExam();

  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toUpperCase();
      if (["A", "B", "C", "D"].includes(key)) selectOption(key);
      if (key === "N") next();
      if (key === "P") prev();
      if (key === "S") openSubmit(true);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
