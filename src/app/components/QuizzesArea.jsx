import React from 'react'
import QuizCard from './QuizCard'
import PlaceHolder from './PlaceHolder';

export default function QuizzesArea() {
    const allQuizzes = [];
  return (
    <div className='poppins mx-12 mt-10'>
        {
      allQuizzes.length === 0 ? (<PlaceHolder/>): (
<div className="">
<h2 className="text-xl font-bold">My Quizzes</h2>
        <div className="mt-6 flex gap-2 flex-wrap">
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
        </div>
</div>
      )
         }

      
    </div>
  )
}
