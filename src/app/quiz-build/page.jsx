import React from 'react'
import QuizBuildTitle from '../components/QuizBuildPage/QuizBuildTitle'
import QuizBuildNav from '../components/QuizBuildPage/QuizBuildNav'
import QuizBuildQuestions from '../components/QuizBuildPage/QuizBuildQuestions'

export default function Page(props) {
  return (
    <div className='mx-16 poppins'>
        <QuizBuildNav />
        <QuizBuildTitle />
        <QuizBuildQuestions />
    </div>
  )
}
