'use client'
import React, { useEffect, useState } from 'react'
import QuizBuildTitle from '../components/QuizBuildPage/QuizBuildTitle'
import QuizBuildNav from '../components/QuizBuildPage/QuizBuildNav'
import QuizBuildQuestions from '../components/QuizBuildPage/QuizBuildQuestions'
import { v4 as uuidv4 } from "uuid";
import { faCode } from '@fortawesome/free-solid-svg-icons'
import IconsComponents from '../components/QuizBuildPage/IconsComponents'
import useGlobalContextProvider from '../ContextApi'

export default function Page(props) {
  const prefixes = ['A', 'B', 'C', 'D'];
  const [focusFirst, setFocusFirst] = useState(true);
  const { selectedIconObject, selectedQuizObject } = useGlobalContextProvider();
  const { selectedQuiz } = selectedQuizObject;
  const { selectedIcon } = selectedIconObject;
  const [quizQuestions, setQuizQuestions] = useState(()=>{
    if(selectedQuiz){
      return selectedQuiz.quizQuestions;
    }else{
      return  [
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
      ]
    }
  })


  const [newQuiz, setNewQuiz] = useState(()=>{
    if(selectedQuiz){
      return selectedQuiz;
     }else{
      return  {
        id: uuidv4(),
        icon: selectedIcon.faIcon,
        quizTitle: '',
        quizQuestions: quizQuestions
      }
     }
  });


  useEffect(()=>{
    setNewQuiz((prevQuiz)=> ({
      ...prevQuiz,
      icon: selectedIcon.faIcon,
      quizQuestions: quizQuestions
    }));
},[quizQuestions, selectedIcon.faIcon])

function onChangeQuizTitle(text){
  setNewQuiz((prevQuiz)=> ({ ...prevQuiz, quizTitle: text}));
}

// console.log(newQuiz)
// console.log(allQuizzes)

  const quizNavBarProps = {
    quizQuestions,
    newQuiz,
    setNewQuiz
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
    <div className='mx-16 poppins relative'>
       <IconsComponents />

        <QuizBuildNav {...quizNavBarProps} />
        <QuizBuildTitle {...quizTitleProps} />
        <QuizBuildQuestions {...quizQuestionsProps} />
    </div>
  )
}
