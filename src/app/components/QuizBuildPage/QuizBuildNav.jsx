'use client'
import useGlobalContextProvider from '@/app/ContextApi'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast'


function validateQuizQuestions(quizQuestions){
  for(let question of quizQuestions){
    if(!question.mainQuestion.trim()){
      return { valid: false, message: 'Please fill in the main question. 🤦‍♂️'};
    }

    if(question.choices.some((choice)=> !choice.trim().substring(2))){
      return { valid: false, message: 'Please fill in all choices. 🤦‍♂️'};
    }

    if(question.correctAnswer.length === 0){
      return { valid: false, message: 'Please specify the correct answer. 🤦‍♂️'};
    }
  }
  return { valid: true };
}


export default function QuizBuildNav({ quizQuestions, newQuiz }) {
  const { allQuizzes, setAllQuizzes, selectedQuizObject,  dropDownToggleObject } = useGlobalContextProvider();
  const { dropDownToggle, setDropDownToggle } = dropDownToggleObject;
  const { selectedQuiz } = selectedQuizObject;
  const router = useRouter();

 function addNewQuiz(){
  if(newQuiz.quizTitle.trim(' ').length === 0){
    return toast.error("Please add a name for the Quiz!.");
  }

    setAllQuizzes([...allQuizzes, newQuiz]);
  const isValid = validateQuizQuestions(newQuiz.quizQuestions);
  if(isValid.valid === false){
    toast.error(isValid.message);
    return;
  }

 
  router.push('/');

 }

  return (
    <div className='poppins my-12 flex justify-between items-center'>
      <div className="flex items-center">
        {/* <Image src={"/quiz-builder-icon.png"} alt='' height={50} width={50} /> */}
        <span className="text-2xl">
          Quiz <span className="text-green-700 font-bold">Builder</span>
        </span>
      </div>
      <button onClick={()=> {
        addNewQuiz();
        setDropDownToggle(false)
      }} className="p-2 px-4 bg-green-700 rounded-md text-white">
        Save
      </button>
    </div>
  )
}
