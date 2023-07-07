import {useState} from "react";
import SideBar from "../components/SideBar";
import { AppDispatch } from "../store";
import { updateTitle } from "../store/questions/questionSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function CreateQuiz() {
  const [questionNo, setQuestion] = useState("2");
  const [title, setTitle] = useState("")
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [error, setError] = useState(false);


  const submit = () => {
    if(title === "") {
      setError(true)
    }
    else {
      dispatch(updateTitle({title: title, questions: questionNo, url: ""}));
      navigate("/create/question")
    }
  }
  
  return (
    <>
      <SideBar />
      <div
        className="flex items-center justify-center flex-col"
        style={{ height: "80vh" }}
      >
        <div className="text-2xl">Quiz Title</div>
        <textarea
          id="message"
          rows={4}
          onChange={(e) => setTitle(e.target.value)}
          className="block mt-4 p-2.5 w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your title..."
        ></textarea>
        <select
          value={questionNo}
          onChange={(e) => setQuestion(e.target.value)}
          className="bg-gray-50 border mt-4 w-72 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>No of Questions</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="8">8</option>
          <option value="10">10</option>
        </select>
        <button
          id="button"
          type="submit"
          onClick={submit}
          className="mt-8 bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white font-bold rounded-lg p-3 w-48"
        >
          Submit
        </button>
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
    </>
  );
}
