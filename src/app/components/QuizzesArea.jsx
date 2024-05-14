"use client";
import React, { useEffect } from "react";
import QuizCard from "./QuizCard";
import PlaceHolder from "./PlaceHolder";
import useGlobalContextProvider from "../ContextApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DropDown from "./DropDown";

export default function QuizzesArea({ props }) {
  const { allQuizzes, userObject } = useGlobalContextProvider();
  const { user, setUser } = userObject;
  const router = useRouter()
  console.log(user);

  useEffect(()=>{
    if(user?.isLogged === false){
  router.push('/');
    }
  })

  return (
    <div className="poppins mx-12 mt-10">
      <div>
        {user && user?.isLogged === true ? (
          <>
            {allQuizzes?.length === 0 ? (
              <PlaceHolder />
            ) : (
              <div className="">
                <DropDown />
                <h2 className="text-xl font-bold">My Quizzes</h2>
                <div className="mt-6 flex gap-2 flex-wrap">
                <div className="flex gap-2 flex-wrap">
                {allQuizzes.map((singleQuiz, qizIndex) => (
                    <div key={qizIndex}>
                      <QuizCard singleQuiz={singleQuiz} />
                    </div>
                  ))}
                </div>
             
                <div className="cursor-pointer justify-center items-center rounded=[10px] w-[230px] flex flex-col gap-2 border border-gray-100 bg-white p-4" onClick={()=> router.push("/quiz-build")}>
                  {/* <Image src={"/add-quiz.png"} width={160} height={160} alt="" /> */}+
                  <span className="select-none opacity-40">
                    Add new Quiz
                  </span>
                </div>
                </div>
              </div>
            )}
          </>
        ) : (
 
          <div className="h-96 flex flex-col gap-4 justify-center items-center">
            <h2 className="font-bold text-5xl">
              Learn 10x <span className="text-green-700">Faster !</span>
            </h2>
            <span className="text-xl font-light">
              Unlock Your Potential with Personal Quizzes
            </span>
            <button onClick={()=>{
         
              router.push('/signup')
            }} className="p-4 bg-green-700 text-white rounded-md">
              Get Started Now !
            </button>
          </div>

        )}
      </div>
    </div>
  );
}
