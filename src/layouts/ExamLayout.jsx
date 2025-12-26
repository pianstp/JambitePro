import Header from "../components/common/Header";
import QuestionGrid from "../components/exam/QuestionGrid";

export default function ExamLayout({ children }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-white m-4 rounded-lg shadow-sm">
          {children}
        </main>
        <aside className="w-80 bg-white border-l p-4 hidden lg:flex flex-col">
          <QuestionGrid />
        </aside>
      </div>
    </div>
  );
}
