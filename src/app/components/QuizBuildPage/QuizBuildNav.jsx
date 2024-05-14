'use client'
import useGlobalContextProvider from '../../ContextApi'
import { convertFaToText } from '../../convertFromFaToText';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
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


export default function QuizBuildNav({ quizQuestions, newQuiz, setNewQuiz }) {
  const { allQuizzes, setAllQuizzes, selectedQuizObject,  dropDownToggleObject } = useGlobalContextProvider();
  const { dropDownToggle, setDropDownToggle } = dropDownToggleObject;
  const { selectedQuiz } = selectedQuizObject;
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState(false);

  async function createNewQuiz(){
    try {
      setIsLoading(true);
      const textIcon = convertFaToText(newQuiz.icon);
      const quizWithTextIcon = {
        ...newQuiz,
        icon: textIcon,
      }

      const res = await fetch('http://localhost:3000/api/quizzes', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizWithTextIcon)
      })

      if(!res.ok){
        toast.error("Failed to create a new Quiz");
        setIsLoading(false);
        return;
      }

      const { id } = await res.json();
      // setNewQuiz((prev)=> (
      // {  ...prev,
      //   _id: id}
      // ))

      const updatedQuiz = { ...newQuiz, _id: id, icon: textIcon};

      setAllQuizzes([...allQuizzes, updatedQuiz]);
     toast.success('The quiz has been created succesfully !');
    } catch (error) {
      console.log(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  async function saveQuiz(){
    if(newQuiz.quizTitle.trim(' ').length === 0){
      return toast.error('Please add a name for the quiz !. ');
    }

    const isValid = validateQuizQuestions(newQuiz.quizQuestions);
    if(isValid.valid === false){
      toast.error(isValid.message);
      return;
    }

    if(selectedQuiz){
      // setAllQuizzes((prevQuizState)=> {
      //   const updatedQuiz = [ ...prevQuizState];
      //   const findIndexQuiz = updatedQuiz.findIndex(
      //     (quiz) => quiz._id === newQuiz._id
      //   );

      //   if(findIndexQuiz !== -1){
      //     updatedQuiz[findIndexQuiz] = newQuiz;
      //   }
 
      //   return updatedQuiz;
      // });


      const updatedQuiz = [...allQuizzes];
      const findIndexQuiz = updatedQuiz.findIndex((quiz)=> quiz._id === newQuiz._id);

      if(findIndexQuiz !== -1){
        updatedQuiz[findIndexQuiz] = newQuiz;
      }

      const id = updatedQuiz[findIndexQuiz]._id;

      const convertIconText = convertFaToText(updatedQuiz[findIndexQuiz].icon);
      console.log(updatedQuiz[findIndexQuiz]);
      updatedQuiz[findIndexQuiz].icon = convertIconText;
      try {
        const res = await fetch(`http://localhost:3000/api/quizzes?id=${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            updateQuiz: updatedQuiz[findIndexQuiz]
          })
        });

        if(!res.ok){
          throw new Error('Failed to update quiz..');
        }

        toast.success('The quiz has been saved successfully.');
        setAllQuizzes(updatedQuiz)

      } catch (error) {
        
      }


      toast.success('The quiz has been modified successfully..');
    }else{
      createNewQuiz();
    }

    router.push('/');
  }

//  function addNewQuiz(){
//   if(newQuiz.quizTitle.trim(' ').length === 0){
//     return toast.error("Please add a name for the Quiz!.");
//   }

//     setAllQuizzes([...allQuizzes, newQuiz]);
//   const isValid = validateQuizQuestions(newQuiz.quizQuestions);
//   if(isValid.valid === false){
//     toast.error(isValid.message);
//     return;
//   }

 
//   router.push('/');

//  }

  return (
    <div className='poppins my-12 flex justify-between items-center'>
      <div className="flex items-center">
        {/* <Image src={"/quiz-builder-icon.png"} alt='' height={50} width={50} /> */}
        <span className="text-2xl">
          Quiz <span className="text-green-700 font-bold">Builder</span>
        </span>
      </div>
      <button onClick={()=> {
        saveQuiz();
        setDropDownToggle(false)
      }} className="p-2 px-4 bg-green-700 rounded-md text-white">
        Save
      </button>
    </div>
  )
}
