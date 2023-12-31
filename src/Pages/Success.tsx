import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Link } from 'react-router-dom'

export default function success() {
  const questionSlice = useSelector((state: RootState) => state.question)
  useEffect(() => {
    console.log(questionSlice.url)
  }, [])
  return (
<div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className=" p-6  md:mx-auto">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg>
        <div className="text-center">
            <p className="text-gray-600 my-2">Quiz has been successfully created. The link for the quiz is</p>
            <a className="underline" href={`https://quizsync-vqnz.onrender.com/quiz/${questionSlice.url}`} target="_blank">https://quizsync-vqnz.onrender.com/quiz/{questionSlice.url}</a>
            <div className="py-10 text-center">
                <Link to="/create" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK 
               </Link>
            </div>
        </div>
    </div>
  </div>
  )
}
