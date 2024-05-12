"use client";
import React from "react";
import QuizCard from "../quiz-start/QuizCard";
import PlaceHolder from "./PlaceHolder";
import useGlobalContextProvider from "../ContextApi";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function QuizzesArea({ props }) {
  const { allQuizzes, userObject } = useGlobalContextProvider();
  const { user, setUser } = userObject;
  const router = useRouter()
  // console.log(user);
  return (
    <div className="poppins mx-12 mt-10">
      <div>
        {user.isLogged && (
          <>
            {allQuizzes.length === 0 ? (
              <PlaceHolder />
            ) : (
              <div className="">
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
        )}
      </div>
    </div>
  );
}
