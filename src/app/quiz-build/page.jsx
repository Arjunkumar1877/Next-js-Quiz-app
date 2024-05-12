'use client'
import React, { useEffect, useState } from 'react'
import QuizBuildTitle from '../components/QuizBuildPage/QuizBuildTitle'
import QuizBuildNav from '../components/QuizBuildPage/QuizBuildNav'
import QuizBuildQuestions from '../components/QuizBuildPage/QuizBuildQuestions'
import { v4 as uuidv4 } from "uuid";
import { faCode } from '@fortawesome/free-solid-svg-icons'

export default function Page(props) {
  const prefixes = ['A', 'B', 'C', 'D'];
  const [focusFirst, setFocusFirst] = useState(true);
  // const { allQuizzes, quizToStartObject } = useGlobalContextProvider();
  const [quizQuestions, setQuizQuestions] = useState([
    {
      id: uuidv4(),
      mainQuestion: '',
      choices: prefixes.slice(0, 2).map((prefix)=> prefix + '. '),
      correctAnswer: '',
      answeredResult: -1,
      statistics: {
        totalAttempts: 0,
        correctAttempts: 0,
        incorrectAttepts: 0
      }
    }
  ])


  const [newQuiz, setNewQuiz] = useState({
    id: uuidv4(),
    icon: faCode,
    quizTitle: '',
    quizQuestions: quizQuestions
  });


  useEffect(()=>{
    setNewQuiz((prevQuiz)=> ({
      ...prevQuiz,
      quizQuestions: quizQuestions
    }))
},[quizQuestions])

function onChangeQuizTitle(text){
  setNewQuiz((prevQuiz)=> ({ ...prevQuiz, quizTitle: text}))
}

console.log(newQuiz)
// console.log(allQuizzes)

  const quizNavBarProps = {
    quizQuestions,
    newQuiz
  }

  const quizTitleProps = {
    focusProp: { focus: focusFirst, setFocusFirst},
    // newQuiz,
    // setNewQuiz
    onChangeQuizTitle
  };

  const quizQuestionsProps = {
    focusProp: { focus: !focusFirst, setFocusFirst},
    quizQuestions,
    setQuizQuestions,
  }

  return (
    <div className='mx-16 poppins'>
        <QuizBuildNav {...quizNavBarProps} />
        <QuizBuildTitle {...quizTitleProps} />
        <QuizBuildQuestions {...quizQuestionsProps} />
    </div>
  )
}
