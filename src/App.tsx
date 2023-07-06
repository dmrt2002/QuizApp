
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/setQuestions";
import CreateQuiz from "./pages/CreateQuiz";
import SuccessPage from "./pages/Success";
import LoginPage from "./pages/userLogin";
import QuestionsPage from "./pages/Questions";
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create/question" element={<Home />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/quiz/success" element={<SuccessPage />} />
        <Route path="/quiz/:slug" element={<LoginPage/>} />
        <Route path="/quiz/:slug/questions" element={<QuestionsPage/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
