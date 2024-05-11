 "use client"
import useGlobalContextProvider from "@/app/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function page() {
    const { allQuizzes } = useGlobalContextProvider()
    console.log(allQuizzes);
  return (
    <div>
      <div className="poppins flex-col px-24 mt-[35px]">
        <QuizStartHeader />
        <div className="mt-10 flex items-center justify-center">
          <QuizStartQuestions />
        </div>
      </div>
    </div>
  );
}

function QuizStartQuestions() {
  return (
    <div className="poppins rounded-sm m-9  w-9/12">
      <div className="flex justify-center items-center gap-2">
        <div className="flex justify-center items-center  rounded-md w-11 h-11">
          1
        </div>
        <p>
          What does the typeof operator in javascript return when with the
          following data types ?
        </p>
      </div>

      <div className="mt-7 flex flex-col gap-2">
        <div className="p-3 ml-11 w-10/12 border border-green-700 rounded-md bg-green-700">
          A: string
        </div>
        <div className="p-3 ml-11 w-10/12 border border-green-700 rounded-md">
          B: number
        </div>
        <div className="p-3 ml-11 w-10/12 border border-green-700 rounded-md">
          C: boolean
        </div>
        <div className="p-3 ml-11 w-10/12 border border-green-700 rounded-md">
          D: undefined
        </div>
      </div>

      <div className="flex justify-end mt-7">
        <button className="p-2 px-5 text-[15px] text-white rounded-md bg-gree mt-[700]">
          submit
        </button>
      </div>
    </div>
  );
}

function QuizStartHeader() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 justify-center">
        <div className="bg-green-700 w-12 h-12 flex items-center justify-center p-2 rounded-md">
          {/* <FontAwesomeIcon 
                    className='text-white' 
                    width={25}
                    height={25}
                    icon={faCode}
                    /> */}
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-xl">Javascript Quiz</h2>
          <span className="font-light text-sm">20 Questions</span>
        </div>
      </div>

      <div className="flex gap-2 item-center">
        {/* <FontAwesomeIcon 
                className='text-green-700'
                width={20}
                height={20}
                icon={faStopwatch}
                 /> */}
        <span>00:00:29</span>
      </div>
    </div>
  );
}
