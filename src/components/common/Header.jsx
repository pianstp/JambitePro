import React from "react";
import { useExam } from "../../context/ExamContext";

export default function Header() {
  const { timeLeft, subject, setSubject, questions, setIndex } = useExam();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const subjects = Object.keys(questions);

  return (
    <header className="bg-[#003366] text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Navigation Tabs */}
        <nav className="flex gap-1 h-full pt-2">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => {
                setSubject(sub);
                setIndex(0);
              }}
              className={`px-4 rounded-t-lg text-sm font-bold transition-all ${
                subject === sub
                  ? " bg-blue-800 text-primary"
                  : "text-blue-100 hover:bg-blue-800"
              }`}
            >
              {sub}
            </button>
          ))}
        </nav>

        {/* Timer */}
        <div className="flex items-center gap-4">
          <div
            className={`px-4 py-1 rounded-md font-mono text-xl font-bold border-2 ${
              timeLeft < 300
                ? "border-red-400 text-red-400 animate-pulse"
                : "border-white"
            }`}
          >
            {formatTime(timeLeft)}
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] uppercase font-bold text-blue-300">
              Candidate
            </p>
            <p className="text-sm font-bold">JAMB PRACTITIONER</p>
          </div>
        </div>
      </div>
    </header>
  );
}
