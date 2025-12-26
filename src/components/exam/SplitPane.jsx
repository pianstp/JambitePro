import QuestionCard from "./QuestionCard";

export default function SplitPane({ question, answer, onSelect }) {
  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="md:w-1/2 p-6 overflow-y-auto border-r bg-gray-50">
        <h2 className="font-bold mb-4 text-primary">Comprehension Passage</h2>
        <p className="leading-relaxed text-gray-700">{question.passage}</p>
      </div>
      <div className="md:w-1/2 p-6 overflow-y-auto">
        <QuestionCard question={question} answer={answer} onSelect={onSelect} />
      </div>
    </div>
  );
}
