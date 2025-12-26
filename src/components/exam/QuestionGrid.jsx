import { useExam } from "../../context/ExamContext";

export default function QuestionGrid() {
  const { questions, subject, index, jumpTo, answers } = useExam();

  return (
    <div className="flex-1">
      <h3 className="font-bold mb-4 text-gray-500 uppercase text-xs tracking-widest">
        Question Map
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {questions[subject].map((_, i) => (
          <button
            key={i}
            onClick={() => jumpTo(i)}
            className={`h-10 w-10 rounded border text-sm font-bold transition-all ${
              index === i ? "border-primary ring-2 ring-primary/20" : ""
            } ${
              answers[`${subject}-${i}`]
                ? "bg-green-500 text-white border-green-600"
                : "bg-gray-50"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
