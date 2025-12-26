import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExamProvider } from "./context/ExamContext";
import ExamPage from "./pages/ExamPage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  return (
    <ExamProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExamPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </ExamProvider>
  );
}
