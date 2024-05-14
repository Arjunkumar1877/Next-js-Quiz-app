// import useGlobalContextProvider from '@/app/ContextApi'
import useGlobalContextProvider from '../../ContextApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faTimes } from '@fortawesome/free-solid-svg-icons';
import React from 'react'


export default function QuizStartHeader({parentTimer}) {
  const { quizToStartObject } = useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;
  console.log(selectQuizToStart)
  const { quizTitle } = selectQuizToStart;
  const { quizQuestions } = selectQuizToStart;
    return (
    <div className='flex justify-between'>
     <div className="flex gap-2 justify-center">
      <div className="bg-green-700 w-12 h-12 flex items-center justify-center p-2 rounded-md">
        <FontAwesomeIcon className='text-white' width={25} height={25} icon={faCode} />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-xl">{quizTitle && quizTitle}</h2>
        <span className="font-light text-sm">
          {quizQuestions?.length} Questions b
        </span>
      </div>
     </div>

     <div className="flex gap-2 items-center">
      <FontAwesomeIcon
        className='text-green-700'
        icon={faTimes}
        width={20}
        height={20}
       />

       <span>00:00:{parentTimer}</span>
     </div>
    </div>
  )
}
