import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export default function success() {
  const questionSlice = useSelector((state: RootState) => state.question)
  useEffect(() => {
    console.log(questionSlice.url)
  }, [])
  return (
    <div className='flex justify-center items-center h-screen'>
        <h3>Your quiz is Live in the below url</h3>
        <a href={"http://127.0.0.1:5173/quiz" + questionSlice.url}>http://127.0.0.1:5173/quiz + {questionSlice.url}</a>
    </div>
  )
}
