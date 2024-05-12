import Link from "next/link";
import React, { useState } from "react";
import useGlobalContextProvider from "../ContextApi";
import Image from "next/image";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function successRate(singleQuiz) {
  let correctQuestions = 0;
  let totalAttempts = 0;
  let successRate = 0;

  if (singleQuiz && singleQuiz.quizQuestions) {
    singleQuiz.quizQuestions.forEach((question) => {
      totalAttempts += question?.statistics?.totalAttempts;
      correctQuestions += question?.statistics?.correctAttempts;
    });

    successRate = Math.ceil((correctQuestions / totalAttempts) * 100);
    return successRate;
  } else {
    console.error("singleQuiz or quizQuestions is undefined.");
  }
}

export default function QuizCard({ singleQuiz }) {
   const { quizToStartObject } = useGlobalContextProvider();
   const { setSelectQuizToStart } = quizToStartObject;
  const { quizTitle, quizQuestions, icon } = singleQuiz;
  const totalQuestions = quizQuestions?.length;
  console.log(totalQuestions);
  const globalSuccessRate = successRate(singleQuiz);

  console.log(singleQuiz);

  return (
    <div className="rounded-[10px] flex flex-col gap-2 border border-gray-300 bg-white p-4">
      <div className="relative bg-grren-700 w-full h-32 flex justify-center items-center rounded-md">
        <div className="absolute cursor-pointer top-3 right-3">
          {/* <FontAwesomeIcon className="text-white" height={13} width={13} icon={}/>  */}
        </div>
        {/* <FontAwesomeIcon className="text-white" width={80} height={80} icon={faCode} /> */}
      </div>
      <h3 className="font-bold text-slate-950">{quizTitle}</h3>
      <p className="text-sm font-light text-gray-950">
        {totalQuestions} question (s)
      </p>
      <div className="flex gap-3">
        {/* <Image src={"./"}  width={20} height={10} alt=""  /> */}
        <span className="text-[12px] text-slate-950">
          Success rate: {globalSuccessRate} %
        </span>
      </div>
      <Link href={"/quiz-start"}>
        <div className="rounded-full w-7 h-7 bg-green-700 flex items-center justify-center cursor-pointer ">
          {/* <FontAwesomeIcon className="text-white" width={15} height={15} icon={faPlay} /> */}
          <p
            onClick={() => {
              setSelectQuizToStart(singleQuiz);
            }}
          >
            h
          </p>
        </div>
      </Link>
    </div>
  );
}
