'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

import React, { useEffect, useRef, useState } from 'react'

export default function QuizBuildTitle({focusProp, newQuiz, setNewQuiz, onChangeQuizTitle }) {
  const [quizTitle, setQuizTitle] = useState('');
  const {focus, setFocusFirst} = focusProp;
  const quizTitleRef = useRef(null);

  function handleTextInputChange(text) {
    setQuizTitle(text)
    // setNewQuiz({ ...newQuiz, quizTitle: text });
    // setFocusFirst(text)
    onChangeQuizTitle(text)
  }

  console.log(focus)
  
  useEffect(()=>{
    if(focus){
      quizTitleRef.current.focus();
    }
  },[]);

  // console.log(focus)
  return (
    <div className='p-3 flex justify-between border border-green-700 rounded-md'>
  <div className="flex gap-2">
    <div className="flex gap-2 items-center">
      <div className="bg-green-700 px-4 py-1 rounded-md text-white">1</div>
      <span className="font-bold">Quiz Name: </span>
    </div>
    <input type="text" className="outline-none border-b-2 pt-1 w-[300px] text-[13px]" onChange={(e)=> {
      handleTextInputChange(e.target.value);
    }} value={quizTitle} ref={quizTitleRef} placeholder='Enter the Name of the quiz...' />
  </div>
  <FontAwesomeIcon icon={faCode} height={40} width={40} className='text-white p-2 rounded-md bg-green-700 cursor-pointer' />
 
    </div>
  )
}
