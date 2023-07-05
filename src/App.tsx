
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create/question" element={<Home />} />
        <Route path="/create" element={<CreateQuiz />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
