import useGlobalContextProvider from '@/app/ContextApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fascinate } from 'next/font/google';
import React from 'react'


export default function QuizStartHeader(props) {
  const { quizToStartObject } = useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;
  console.log(selectQuizToStart)
  const { quizTitle } = selectQuizToStart;
  const { quizQuestions } = selectQuizToStart;
    return (
    <div className='flex justify-between'>
     <div className="flex gap-2 justify-center">
      <div className="bg-green-700 w-12 h-12 flex items-center justify-center p-2 rounded-md">
        {/* <FontAwesomeIcon className='text-white' width={25} height={25} icon={Fascinate} /> */}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-xl">{quizTitle && quizTitle}</h2>
        <span className="font-light text-sm">
          {quizQuestions?.length} Questions
        </span>
      </div>
     </div>

     <div className="flex gap-2 items-center">
      {/* <FontAwesomeIcon
        className='text-green-700'
        width={20}
        height={20}
       /> */}
     </div>
    </div>
  )
}
