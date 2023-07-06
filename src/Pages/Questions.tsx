import axios from 'axios'
import { useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function Questions() {
    const { slug } = useParams();
    const [ questions, setQuestions] = useState([])
    const [optionSelected, select] = useState<String[]>([])
    const userSlice = useSelector((state: RootState) => state.user)
  useEffect(() => {
    fetchQuestions().then((res) => {
        setQuestions(res.questions)
        let emptyArray = new Array()
        emptyArray.fill("");
        select(emptyArray)
    })
  }, [])
  let fetchQuestions = async () => {
    let param = {
        id: slug,
    }
    let res = await axios.post("http://localhost:5000/users/questions", param )
    return res.data.questions
  }
  let handleSelect = (index: number, answer: string) => {
    let newAnswer = [...optionSelected]
    newAnswer[index] = answer
    select(newAnswer)
  }

  let submit = async () => {
    console.log(questions[0])
    let marks = 0;
    questions.map((question, index) => {
        if(optionSelected[index] !== undefined && optionSelected[index] === question.answer) {
            marks++;
        }
    })
    let percentage = marks/questions.length
    let param = {
        quizId: slug,
        userId: userSlice.id,
        percentage: percentage * 100
    }
    let res = await axios.post("http://localhost:5000/users/results", param )
    console.log(res.status)
  }

  return (
    <div>
      {questions !== undefined ? questions.map((quest, index) => {
        return (
          <div key={index}>
            <div className="box flex justify-center items-center h-3/4 mt-10">
              <div className="question-box">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Question {index + 1}
                </label>
                <div className="question-text">
                    {quest.question}
                </div>
              </div>
            </div>
            <div
              className="grid-cols-2 flex gap-4 mt-5"
              style={{ display: "grid" }}
            >
              <div className="col-box text-center">
              <input id="default-checkbox" type="radio" name={`checkbox-${index}`} value={quest.opt1} onChange={(e) => handleSelect(index, "1") }  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{quest.opt1}</label>
              </div>
              <div className="col-box text-center">
              <input id="default-checkbox" type="radio" name={`checkbox-${index}`}  value={quest.opt2} onChange={(e) => handleSelect(index, "2") }  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{quest.opt2}</label>
              </div>
              <div className="col-box text-center">
              <input id="default-checkbox" type="radio" name={`checkbox-${index}`}  value={quest.opt3} onChange={(e) => handleSelect(index, "3") }  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{quest.opt3}</label>
              </div>
              <div className="col-box text-center">
              <input id="default-checkbox" type="radio" name={`checkbox-${index}`}  value={quest.opt4} onChange={(e) => handleSelect(index, "4") }   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{quest.opt4}</label>
              </div>
            </div>
          </div>
        );
      }) : <></>} 
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
    </div>
  )
}
