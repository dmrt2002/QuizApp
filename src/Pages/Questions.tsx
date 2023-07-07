import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router";

export default function Questions() {
  const { slug } = useParams();
  const [questions, setQuestions] = useState([]);
  const [optionSelected, select] = useState<String[]>([]);
  const userSlice = useSelector((state: RootState) => state.user);
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [currentIndex, setIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetchQuestions().then((res) => {
      setQuestions(res.questions);
      setCurrentQuestion(res.questions[0]);
      setIndex(0);
      let emptyArray = new Array();
      emptyArray.fill("");
      select(emptyArray);
    });
  }, []);
  let fetchQuestions = async () => {
    let param = {
      id: slug,
    };
    let res = await axios.post("http://localhost:5000/users/questions", param);
    return res.data.questions;
  };
  let handleSelect = (index: number, answer: string) => {
    let newAnswer = [...optionSelected];
    newAnswer[index] = answer;
    select(newAnswer);
  };

  let submit = async () => {
    let marks = 0;
    questions.map((question, index) => {
      if (
        optionSelected[index] !== undefined &&
        optionSelected[index] === question.answer
      ) {
        marks++;
      }
    });
    let percentage = marks / questions.length;
    let param = {
      quizId: slug,
      userId: userSlice.id,
      percentage: percentage * 100,
    };
    let res = await axios.post("http://localhost:5000/users/results", param);
    if (res.status === 200) {
      navigate("/completed");
    }
  };

  const handlePrevious = () => {
    console.log(currentIndex);
    const prevQues = currentIndex - 1;
    prevQues >= 0;
    setCurrentQuestion(questions[prevQues]);
    setIndex(prevQues);
  };

  const handleNext = () => {
    const nextQues = currentIndex + 1;
    if (nextQues < questions.length) {
      setCurrentQuestion(questions[nextQues]);
      setIndex(nextQues);
    } else {
      submit();
      navigate("/completed")
    }
  };

  return (
    <div className="bg-[#1A1A1A] overflow-x-hidden">
      <div>
        <div className="flex flex-col h-screen w-screen px-5 bg-[#1A1A1A] justify-center items-center">
          <h4 className="mt-10 text-xl text-white/60">
            Question {currentIndex + 1} of {questions.length}
          </h4>
          <div className="mt-4 text-2xl text-white pb-4">
            {currentQuestion.question}
          </div>
          <div className="flex flex-col sm:w-3/4 w-full">
            <div className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl">
              <input
                id="default-checkbox"
                type="radio"
                name={`checkbox-${currentIndex}`}
                value={currentQuestion.opt1}
                onChange={(e) => handleSelect(currentIndex, "1")}
                className="w-6 h-6 bg-black"
              />
              <p className="ml-6 text-white">{currentQuestion.opt1}</p>
            </div>
            <div className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl">
              <input
                id="default-checkbox"
                type="radio"
                name={`checkbox-${currentIndex}`}
                value={currentQuestion.opt2}
                onChange={(e) => handleSelect(currentIndex, "2")}
                className="w-6 h-6 bg-black"
              />
              <p className="ml-6 text-white">{currentQuestion.opt2}</p>
            </div>
            <div className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl">
              <input
                id="default-checkbox"
                type="radio"
                name={`checkbox-${currentIndex}`}
                value={currentQuestion.opt3}
                onChange={(e) => handleSelect(currentIndex, "3")}
                className="w-6 h-6 bg-black"
              />
              <p className="ml-6 text-white">{currentQuestion.opt3}</p>
            </div>
            <div className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl">
              <input
                id="default-checkbox"
                type="radio"
                name={`checkbox-${currentIndex}`}
                value={currentQuestion.opt4}
                onChange={(e) => handleSelect(currentIndex, "4")}
                className="w-6 h-6 bg-black"
              />
              <p className="ml-6 text-white">{currentQuestion.opt4}</p>
            </div>
          </div>
          <div className="max-w-lg p-5 container flex justify-center mx-auto">
            <div className="flex flex-row mx-auto">
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-black hover:text-white px-3"
              >
                <div className="flex flex-row align-middle">
                  <svg
                    className="w-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <p className="ml-2">Prev</p>
                </div>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-black hover:text-white px-3"
              >
                <div className="flex flex-row align-middle">
                  <span className="mr-2">Next</span>
                  <svg
                    className="w-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
