 "use client"
import useGlobalContextProvider from "@/app/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import QuizStartHeader from "../components/QuizStartPage/QuizStartHeader";
import { QuizStartQuestions } from "../components/QuizStartPage/QuizStartQuestions";

export default function page(prop) {
    const { allQuizzes, quizToStartObject } = useGlobalContextProvider();
    const { selectQuizToStart } = quizToStartObject;
    console.log(allQuizzes);
    const router = new useRouter();

    useEffect(()=>{
      if(selectQuizToStart === null){
        router.push('/');
      }
    }, [])
  return (
    <div>
      <div className="poppins flex-col px-24 mt-[35px]">
       {
        selectQuizToStart === null ? (
          <div className="h-svh flex flex-col gap-2 items-center justify-center">
            {/* <Image width={100} height={180} /> */}
            <h2 className="text-xl font-bold">
              Please Select your quiz first...
            </h2>
            <span className="font-light">
              You will be redirected to the home page.
            </span>
          </div>
        ): (
          <>
           <QuizStartHeader />
        <div className="mt-10 flex items-center justify-center">
          <QuizStartQuestions />
        </div>
          </>
        )
       }
      </div>
    </div>
  );
}

// function QuizStartQuestions() {
//   return (
//     <div className="poppins rounded-sm m-9  w-9/12">
//       <div className="flex justify-center items-center gap-2">
//         <div className="flex justify-center items-center  rounded-md w-11 h-11">
//           1
//         </div>
//         <p>
//           What does the typeof operator in javascript return when with the
//           following data types ?
//         </p>
//       </div>

//       <div className="mt-7 flex flex-col gap-2">
//         <div className="p-3 ml-11 w-10/12 border border-green-700 rounded-md bg-green-700">
//           A: string
//         </div>
//         <div className="p-3 ml-11 w-10/12 border border-green-700 rounded-md">
//           B: number
//         </div>
//         <div className="p-3 ml-11 w-10/12 border border-green-700 rounded-md">
//           C: boolean
//         </div>
//         <div className="p-3 ml-11 w-10/12 border border-green-700 rounded-md">
//           D: undefined
//         </div>
//       </div>

//       <div className="flex justify-end mt-7">
//         <button className="p-2 px-5 text-[15px] text-white rounded-md bg-gree mt-[700]">
//           submit
//         </button>
//       </div>
//     </div>
//   );
// }

// function QuizStartHeader() {
//   return (
//     <div className="flex justify-between">
//       <div className="flex gap-2 justify-center">
//         <div className="bg-green-700 w-12 h-12 flex items-center justify-center p-2 rounded-md">
//           {/* <FontAwesomeIcon 
//                     className='text-white' 
//                     width={25}
//                     height={25}
//                     icon={faCode}
//                     /> */}
//         </div>
//         <div className="flex flex-col gap-1">
//           <h2 className="font-bold text-xl">Javascript Quiz</h2>
//           <span className="font-light text-sm">20 Questions</span>
//         </div>
//       </div>

//       <div className="flex gap-2 item-center">
//         {/* <FontAwesomeIcon 
//                 className='text-green-700'
//                 width={20}
//                 height={20}
//                 icon={faStopwatch}
//                  /> */}
//         <span>00:00:29</span>
//       </div>
//     </div>
//   );
// }
