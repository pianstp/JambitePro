import React from "react";
import { useNavigate } from "react-router-dom";
import { useExam } from "../context/ExamContext";

export default function ResultsPage() {
  const { questions, answers, setIsFinished } = useExam();
  const navigate = useNavigate();

  // 1. Calculate scores per subject
  const results = Object.keys(questions).map((subject) => {
    let correct = 0;
    questions[subject].forEach((q, idx) => {
      if (answers[`${subject}-${idx}`] === q.answer) {
        correct++;
      }
    });
    return {
      subject,
      correct,
      total: questions[subject].length,
    };
  });

  // 2. Aggregate totals
  const totalCorrect = results.reduce((acc, curr) => acc + curr.correct, 0);
  const totalQuestions = results.reduce((acc, curr) => acc + curr.total, 0);

  // 3. Percentage Calculation
  const percentage =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // 4. Determine Color Theme based on performance
  const getThemeColor = () => {
    if (percentage >= 70) return "text-green-600 border-green-100";
    if (percentage >= 50) return "text-orange-500 border-orange-100";
    return "text-red-600 border-red-100";
  };

  const handleRestart = () => {
    localStorage.removeItem("jamb-session");
    setIsFinished(false);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center py-12 px-4 font-inter">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-gray-100">
        <header className="mb-8">
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Exam Analysis
          </h1>
          <p className="text-gray-500 font-medium">JAMB CBT Practice Result</p>
        </header>

        {/* Hero Percentage Circle */}
        <div
          className={`relative w-56 h-56 mx-auto mb-10 flex items-center justify-center rounded-full border-[16px] transition-colors duration-1000 ${
            getThemeColor().split(" ")[1]
          }`}
        >
          <div className="text-center">
            <span
              className={`block text-6xl font-black ${
                getThemeColor().split(" ")[0]
              }`}
            >
              {percentage}%
            </span>
            <span className="text-gray-400 font-bold uppercase tracking-tighter text-xs">
              Aggregate Score
            </span>
          </div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">
              Total Correct
            </p>
            <p className="text-2xl font-black text-primary">{totalCorrect}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">
              Attempted
            </p>
            <p className="text-2xl font-black text-primary">
              {Object.keys(answers).length}
            </p>
          </div>
        </div>

        {/* Subject Progress Bars */}
        <div className="space-y-6 mb-10 text-left">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">
            Subject Breakdown
          </h3>
          {results.map((res) => {
            const subPercent = Math.round((res.correct / res.total) * 100);
            return (
              <div key={res.subject}>
                <div className="flex justify-between mb-2 px-1">
                  <span className="font-bold text-gray-700">{res.subject}</span>
                  <span className="font-mono text-primary font-bold">
                    {res.correct}/{res.total}
                  </span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-1000"
                    style={{ width: `${subPercent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-5 bg-[#003366] text-white rounded-2xl font-black text-lg hover:bg-blue-900 transition-all shadow-xl shadow-blue-100 active:scale-95"
        >
          START NEW PRACTICE
        </button>
      </div>
    </div>
  );
}
