import React from "react";
import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { updateURL } from "../store/questions/questionSlice";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Home() {
  const questionSlice = useSelector((state: RootState) => state.question);
  const userSlice = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [question, setQuestion] = React.useState<any[]>([]);
  const navigate = useNavigate()
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    console.log(userSlice.id, userSlice.email, userSlice.name)
    let emptyArray = new Array(parseInt(questionSlice.questions));
    emptyArray.fill({});
    setQuestion(emptyArray);
  }, []);

  const submit = async () => {
    for (let i = 0; i < question.length; i++) {
      if(!question[i].question || !question[i].opt1 || !question[i].opt2 || !question[i].opt3 || !question[i].opt4 || !question[i].answer) {
        setError(true);
        return;
      }
    }
    if(!error) {
      const res = await axios.post("http://localhost:5000/api/admins/quiz/create", {
        questions: question,
        adminId: userSlice.id,
        quizTitle: questionSlice.title,
      });
      if (res.status === 200) {
        dispatch(updateURL((res.data.question._id)))
        navigate(`/quiz/success`)
      }
    }
  };

  const handleQuestion = (value: string, index: number, property: string) => {
    setQuestion((prevQuestion) => {
      const updatedQuestion = prevQuestion.map((item, ind) => {
        if (ind === index && property === "question") {
          return {
            ...item,
            question: value,
          };
        } else if (ind === index && property === "opt1") {
          return {
            ...item,
            opt1: value,
          };
        } else if (ind === index && property === "opt2") {
          return {
            ...item,
            opt2: value,
          };
        } else if (ind === index && property === "opt3") {
          return {
            ...item,
            opt3: value,
          };
        } else if (ind === index && property === "opt4") {
          return {
            ...item,
            opt4: value,
          };
        } else if (ind === index && property === "answer") {
          return {
            ...item,
            answer: value,
          };
        }
        return item;
      });
      return updatedQuestion;
    });
  };

  return (
    <div>
      <SideBar />
      {question.map((quest, index) => {
        return (
          <div key={index}>
            <div className="box flex justify-center items-center h-3/4 mt-10">
              <div className="question-box">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Question {index + 1}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  onChange={(e) =>
                    handleQuestion(e.target.value, index, "question")
                  }
                  className="block p-2.5 w-36 sm:w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your question..."
                ></textarea>
              </div>
            </div>
            <div
              className="grid-cols-2 flex gap-4 mt-5"
              style={{ display: "grid" }}
            >
              <div className="col-box text-right">
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  1.
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    handleQuestion(e.target.value, index, "opt1")
                  }
                  placeholder="option 1"
                  className="m-4 w-36 sm:w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="col-box">
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  2.
                </label>
                <input
                  type="text"
                  placeholder="option 2"
                  onChange={(e) =>
                    handleQuestion(e.target.value, index, "opt2")
                  }
                  className="m-4 w-36 sm:w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div
              className="grid-cols-2 flex gap-4 mt-5"
              style={{ display: "grid" }}
            >
              <div className="col-box text-right">
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  3.
                </label>
                <input
                  type="text"
                  placeholder="option 3"
                  onChange={(e) =>
                    handleQuestion(e.target.value, index, "opt3")
                  }
                  className="m-4 w-36 sm:w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="col-box">
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  4.
                </label>
                <input
                  type="text"
                  placeholder="option 4"
                  onChange={(e) =>
                    handleQuestion(e.target.value, index, "opt4")
                  }
                  className="m-4 w-36 sm:w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
            <select
              onChange={(e) => handleQuestion(e.target.value, index, "answer")}
              className="bg-gray-50 mb-5 border mt-4 w-72 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Correct Answer</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            </div>
          </div>
        );
      })}
      <div
        className="flex items-center justify-center mt-4 mb-4"
        style={{ display: "grid" }}
      >
        <a
          onClick={submit}
          className="inline-flex cursor-pointer w-32 mt-4 items-center justify-center px-4 py-2 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"
        >
          Submit
        </a>
      </div>
      {error ? (
          <>
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed" style={{ bottom: "5vh", left: "2vw"}}
          role="alert"
        >
          <span className="font-bold">Incomplete Submition</span>
          <span className="block sm:inline pl-3">
            Please enter title
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          </span>
        </div>
          </>
        ): (
          <></>
        )}
    </div>
  );
}
