"use client"
import React from 'react'
import QuizCard from '../quiz-start/QuizCard'
import PlaceHolder from './PlaceHolder';
import useGlobalContextProvider from '../ContextApi';

export default function QuizzesArea() {
    const { allQuizzes } = useGlobalContextProvider()
  return (
    <div className='poppins mx-12 mt-10'>
        {
      allQuizzes.length === 0 ? (<PlaceHolder/>): (
<div className="">
<h2 className="text-xl font-bold">My Quizzes</h2>
        <div className="mt-6 flex gap-2 flex-wrap">
            {
                allQuizzes.map((singleQuiz, qizIndex)=> (
                    <div key={qizIndex}>
                        <QuizCard singleQuiz={singleQuiz} />
                        </div>
                ))
            }
        </div>
</div>
      )
         }

      
    </div>
  )
}
