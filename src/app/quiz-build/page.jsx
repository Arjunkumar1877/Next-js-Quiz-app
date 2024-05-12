'use client'
import React, { useState } from 'react'
import QuizBuildTitle from '../components/QuizBuildPage/QuizBuildTitle'
import QuizBuildNav from '../components/QuizBuildPage/QuizBuildNav'
import QuizBuildQuestions from '../components/QuizBuildPage/QuizBuildQuestions'

export default function Page(props) {
  const [focusFirst, setFocusFirst] = useState(true);
  const quizTitleProps = {
    focusProp: { focus: focusFirst, setFocusFirst},
  };

  const quizQuestionsProps = {
    focusProp: { focus: !focusFirst, setFocusFirst}
  }


  return (
    <div className='mx-16 poppins'>
        <QuizBuildNav />
        <QuizBuildTitle {...quizTitleProps} />
        <QuizBuildQuestions {...quizQuestionsProps} />
    </div>
  )
}
