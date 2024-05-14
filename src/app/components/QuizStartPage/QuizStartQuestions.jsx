"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import toast,{ Toaster } from "react-hot-toast";
const { default: useGlobalContextProvider } = require("@/app/ContextApi");
const { useState, useEffect } = require("react");

export function QuizStartQuestions({ onUpdateTime }) {
  const time = 30;
  const { quizToStartObject, allQuizzes, setAllQuizzes, userObject } =
    useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;
  const { quizQuestions } = selectQuizToStart;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [indexOfQuizSelected, setIndexOfQuizSelected] = useState(null);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);
  const { user, setUser } = userObject;
  let interval;

  async function saveDataIntoDB(){
      try {
        
        const id = selectQuizToStart._id;

        const res = await fetch(`http://localhost:3000/api/quizzes?id=${id}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            updateQuizQuestions: allQuizzes[indexOfQuizSelected].quizQuestions
          })
        })

        console.log(allQuizzes[indexOfQuizSelected].quizQuestions);
        if(!res.ok){
          toast.error('Something went wrong while saving... ');
          return;
        }
      } catch (error) {
        console.log(error.message)
      }
  }

  function startTimer() {
    clearInterval(interval);
    setTimer(time);

    interval = setInterval(() => {
      setTimer((currentTime) => {
        onUpdateTime(currentTime);
        if (currentTime === 0) {
          clearInterval(interval);
          return 0;
        }
        return currentTime - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval);
    };
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (timer === 0  && !isQuizEnded) {
      // Updating the allQuizzes
      const currentQuizzes = [...allQuizzes];
      currentQuizzes[indexOfQuizSelected].quizQuestions[
        currentQuestionIndex
      ].statistics.totalAttempts += 1;
      currentQuizzes[indexOfQuizSelected].quizQuestions[
        currentQuestionIndex
      ].statistics.incorrectAttempts += 1;

      setAllQuizzes(currentQuizzes);
      if (currentQuestionIndex !== quizQuestions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex((current) => {
            return current + 1;
          });
        }, 1000);
      } else {
        setIsQuizEnded(true);
        clearInterval(interval);
      }
    }
  }, [timer]);

  // console.log(allQuizzes)

  // useEffect(()=>{
  //   if(timer === 0){
  //       if(currentQuestionIndex !== quizQuestions.length - 1){
  //           setTimeout(()=>{
  //               setCurrentQuestionIndex((current)=>{
  //                   return current + 1;
  //               })
  //           }, 1000)
  //       }
  //   }
  // }, [timer])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((currentTime) => {
        onUpdateTime(currentTime);
        if (currentTime === 0) {
          clearInterval(interval);
          return 0;
        }
        return currentTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const quizIndexFound = allQuizzes.findIndex(
      (quiz) => quiz._id === selectQuizToStart._id
    );
    setIndexOfQuizSelected(quizIndexFound);
  }, []);

  useEffect(() => {
    if (isQuizEnded) {
      quizQuestions.forEach((quizQuestion) => {
        quizQuestion.answeredResult = -1;
      });
      saveDataIntoDB();

      console.log("quiz has ended...");
    }
  }, [isQuizEnded]);

  function selectChoiceFunction(choiceIndexClicked) {
    // update the selected Choice variable state
    setSelectedChoice(choiceIndexClicked);

    const currentAllQuizzes = [...allQuizzes];

    currentAllQuizzes[indexOfQuizSelected].quizQuestions[
      currentQuestionIndex
    ].answeredResult = choiceIndexClicked;

    setAllQuizzes(currentAllQuizzes);
  }

  function moveToTheNextQuestion() {
    // check that did we  selecte an answer by using the answerResult property if it's still equal to -1
    if (allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].answeredResult === -1) {
      toast.error("please select an answer");
      return;
    }

    // update the total Attemptes: 
    allQuizzes[indexOfQuizSelected].quizQuestions[
      currentQuestionIndex
    ].statistics.totalAttempts += 1;

    // if the answer is incorrect
    if (
      allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
        .answeredResult !==
      allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
        .correctAnswer
    ) {
      // updating the incorrect attempts
      allQuizzes[indexOfQuizSelected].quizQuestions[
        currentQuestionIndex
      ].statistics.incorrectAttempts += 1;
      toast.error("incorrect answer");

      // if the answer is incorrect, go to the next question only && if we are not at the last question
      if(currentQuestionIndex !== quizQuestions.length - 1){
        setTimeout(()=>{
          setCurrentQuestionIndex((current)=> current + 1);
          setSelectedChoice(null);
        }, 1200)
      }else{
        // is we select the wrong choice and we are at the end of the question end the quiz
         setTimer(0);
         clearInterval(interval);
         setIsQuizEnded(true);
      }

      return;
    }



// update the correct attempts
    allQuizzes[indexOfQuizSelected].quizQuestions[
      currentQuestionIndex
    ].statistics.currentAttempts += 1;
    setScore((prevState) => prevState + 1);
    toast.success('Awesome !');


    // This will stop the timer and end the quiz when currentQuestionIndex is the last and only if we select the correct otherwse the timer is still running 
    if (
      currentQuestionIndex === quizQuestions.length - 1 &&
      allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
        .answeredResult === allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].correctAnswer
    ) {
      setTimer(0);
      clearInterval(interval);
      setIsQuizEnded(true);
      return;
    }

    // increment the currentQuestionIndex by 1 to go to the next quetsion
    setTimeout(()=>{
      setCurrentQuestionIndex((current) => current + 1);
      // initializing the choice after going to the next questiion 
    setSelectedChoice(null);
    }, 2000);
  }

  return (
    <div className="poppins relative rounded-sm m-9  w-9/12">


      <Toaster toastOptions={{
        className: '',
        duration: 1500,
        style: {
          padding: '12px',
        },
      }} />
  

    {
      !isQuizEnded && (
        <>
          <div className="flex justify-center items-center gap-2">
        <div className="bg-green-700 flex justify-center items-center  rounded-md w-11 h-11">
          {currentQuestionIndex + 1}
        </div>
        <p>{quizQuestions[currentQuestionIndex]?.mainQuestion} ???</p>
      </div>
      <div className="mt-7 flex flex-col gap-2">
        {quizQuestions[currentQuestionIndex]?.choices.map(
          (choice, indexChoice) => (
            <div
              className={`p-3 ml-11 w-10/12 border border-green-700 rounded-md hover:bg-green-700 hover:text-white transition-all select-none ${
                selectedChoice === indexChoice ? "bg-green-700" : "bg-white"
              }`}
              key={indexChoice}
              onClick={() => {
                selectChoiceFunction(indexChoice);
              }}
            >
              {choice}
            </div>
          )
        )}
      </div>
      <div className="flex justify-end mt-7">
        <button
          disabled={isQuizEnded ? true : false}
          className={`p-2 px-5 text-[15px] text-white bg-green-700 rounded-md  mr-[70px] ${
            isQuizEnded ? "opacity-60" : "opacity-100"
          }`}
          onClick={() => {
            moveToTheNextQuestion();
          }}
        >
          submit
        </button>
      </div>
        </>
      )
    }

      {isQuizEnded && (
    <ScoreComponent className="absolute top-5 left-5"
        quizStartParentProps={{
            setIsQuizEnded,
            setIndexOfQuizSelected,
            setCurrentQuestionIndex,
            setSelectedChoice,
            setScore,
            score,
        }}
    />
)}

    </div>
  );
}

function ScoreComponent({ quizStartParentProps }) {
  const { quizToStartObject, allQuizzes } = useGlobalContextProvider();
  const { selectQuizToStart } = quizToStartObject;
  const numberOfQuestions = selectQuizToStart.quizQuestions.length;
  const router = useRouter();
  const {
    setIsQuizEnded,
    setIndexOfQuizSelected,
    setCurrentQuestionIndex,
    setSelectedChoice,
    setScore,
    score
  } = quizStartParentProps;

  function emojiIconScore() {
    const emojiFaces = [
      "confused-emoji.png",
      "happy-emoji.png",
      "very-happy-emoji.png",
    ];
    const result = (score / selectQuizToStart.quizQuestions.length) * 100;

    if (result < 25) {
      return emojiFaces[0];
    }

    if (result == 50) {
      return emojiFaces[1];
    }
    return emojiFaces[2];
  }
  console.log(emojiIconScore());

  function tryAgainFunction() {
    setIsQuizEnded(false);
    const newQuizIndex = allQuizzes.findIndex(
      (quiz) => quiz.id === selectQuizToStart.id
    );
    setIndexOfQuizSelected(newQuizIndex);
    setCurrentQuestionIndex(0);
    setSelectedChoice(null);
    setScore(0);
    console.log(selectQuizToStart);
  }

  return (
    <div className="flex  items-center justify-center rounded-md top-[100px] border border-gray-700 ">
      <div className="flex gap-4 items-center justify-center flex-col">
        {/* <Image  src={`/${emojiIconScore()}`} alt="" width={100} height={100} /> */}
        <h1 className="w-48 h-48">😁</h1>
        <div className="flex gap-1 flex-col">
          <div className="font-bold text-2xl">Your Score</div>
          <div className="text-[22px] text-center">
            {score}/{numberOfQuestions}
          </div>
        </div>
        <button
          onClick={() => tryAgainFunction()}
          className="p-2 bg-green-700 rounded-md text-white px-6"
        >
          Try Again
        </button>

        <div className="w-full flex gap-2 flex-col mt-3">
          <div className="flex gap-1 items-center justify-center">
            {/* <Image src={"/correct-answer.png"} alt="" width={20} height={20} /> */}
            <span className="text-[14px]">Correct Answers: {score}</span>
          </div>
          <div className="flex gap-1 items-center justify-center">
            {/* <Image src={"/incorrect-answer.png"} alt=""  width={20} height={20} /> */}
            <span className="text-[14px]">
              Incorrect Answers: {selectQuizToStart?.quizQuestions.length - score}
            </span>
          </div>
        </div>
        <span onClick={()=>{
          router.push('/');
        }} className="text-green-700 select-none cursor-pointer text-sm mt-8">
      Select Another Quiz
        </span>
      </div>
    </div>
  );
}
