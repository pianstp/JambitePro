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
    <header className="bg-[#003366] text-white shadow-md z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Top Section: Timer and Candidate Info */}
        <div className="h-14 sm:h-16 flex items-center justify-between border-b border-blue-800/50">
          {/* Logo/Project Name (Visible on Desktop) */}
          <div className="hidden lg:block">
            <h1 className="font-black tracking-tighter text-xl text-blue-100">
              JambitePro
            </h1>
          </div>

          {/* Timer Section */}
          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1 rounded-md font-mono text-lg sm:text-xl font-bold border-2 transition-colors ${
                timeLeft < 300
                  ? "border-red-400 text-red-400 animate-pulse bg-red-950/20"
                  : "border-blue-400 text-blue-100"
              }`}
            >
              {formatTime(timeLeft)}
            </div>
            <p className="text-[10px] leading-tight text-blue-300 font-bold uppercase">
              Time <br /> Remaining
            </p>
          </div>

          {/* Candidate Info */}
          <div className="text-right">
            <p className="text-[9px] sm:text-[10px] uppercase font-bold text-blue-400">
              Candidate
            </p>
            <p className="text-xs sm:text-sm font-bold truncate max-w-[120px] sm:max-w-none">
              JAMB PRACTITIONER
            </p>
          </div>
        </div>

        {/* Bottom Section: Subject Navigation (Horizontal Scrollable) */}
        <nav className="flex gap-1 overflow-x-auto no-scrollbar pt-1">
          {subjects.map((sub) => {
            const isActive = subject === sub;
            return (
              <button
                key={sub}
                onClick={() => {
                  setSubject(sub);
                  setIndex(0);
                }}
                className={`flex-none px-4 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap rounded-t-md ${
                  isActive
                    ? "bg-white text-[#003366]"
                    : "text-blue-200 hover:bg-blue-800/50"
                }`}
              >
                {sub}
                {isActive && (
                  <span className="ml-2 inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Visual Progress Bar (Optional: Shows exam time completion) */}
      <div className="h-[2px] w-full bg-blue-900">
        <div
          className="h-full bg-blue-400 transition-all duration-1000"
          style={{ width: `${(timeLeft / 7200) * 100}%` }}
        />
      </div>
    </header>
  );
}
