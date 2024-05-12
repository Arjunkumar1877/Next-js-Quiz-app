"use client";
import React, { createRef, forwardRef, useEffect, useRef, useState } from "react";
import { faCode, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

export default function QuizBuildQuestions({focusProp}) {
  const [quizQuestions, setQuizQuestions] = useState([
    { id: uuidv4(), mainQuestion: "" },
  ]);

  const { focus, setFocusFirst } = focusProp;
  const endOfListRef = useRef(null);
  const textAreaRefs = useRef(quizQuestions.map(() => createRef()));

  console.log(focus);
  function addNewQuestion() {
    setFocusFirst(false);
    const lastIndexQuizQuestions = quizQuestions.length - 1;
    if (
      quizQuestions[lastIndexQuizQuestions].mainQuestion.trim(" ").length === 0
    ) {
      toast.error("Question input is empty");
      return;
    }
    const newQuestion = { id: uuidv4(), mainQuestion: "" };
    setQuizQuestions([...quizQuestions, newQuestion]);
    textAreaRefs.current = [...textAreaRefs.current, createRef()];
  }
  console.log(textAreaRefs);

  function deleteQuestion(singleQuestion) {
    const quizQuestionCopy = [...quizQuestions];
    const filterQuestionToDelete = quizQuestionCopy.filter(
      (question) => singleQuestion.id !== question.id
    );

    // filter ot the corresponding ref
    const updatedRefs = textAreaRefs.current.filter((ref, index) => {
      return quizQuestions[index].id !== singleQuestion.id;
    });
    textAreaRefs.current = updatedRefs;
    setQuizQuestions(filterQuestionToDelete);
  }

  function handleInputChange(index, text) {
    const updatedQuestions = quizQuestions.map((question, i) => {
      if (index === i) {
        return { ...question, mainQuestion: text };
      }
      return question;
    });

    setQuizQuestions(updatedQuestions);
  }

  useEffect(() => {
    if (endOfListRef.current) {
      endOfListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [quizQuestions]);

  console.log(quizQuestions);

  useEffect(() => {
    // focus the last textArea if it exists
    const lastTextAreaIndex = quizQuestions.length - 1;
    if (lastTextAreaIndex >= 0) {
      const lastTextArea = textAreaRefs.current[lastTextAreaIndex].current;
      if (lastTextArea && focus) {
        lastTextArea.focus();
      }
    }
  }, [quizQuestions.length]);

  return (
    <div className="p-3 mt-6 flex justify-between border border-green-700 rounded-md">
      <Toaster
        toastOptions={{
          className: "",
          duration: 1500,
          style: {
            padding: "12px",
          },
        }}
      />
      <div className="flex gap-2 flex-col w-full">
        <div className="flex gap-2 items-center">
          <div className="bg-green-700 px-4 py-1 rounded-md text-white">2</div>
          <span className="font-bold">Quiz Questions : </span>
        </div>
        {quizQuestions.map((singleQuestion, questionIndex) => (
          <div
            className="border ml-5 p-6 mt-4 border-green-700 border-opacity-50 rounded-md flex flex-col justify-center relative"
            key={questionIndex}
            ref={
              quizQuestions.length - 1 === questionIndex ? endOfListRef : null
            }
          >
            <SingleQuestion
              questionIndex={questionIndex}
              ref={textAreaRefs.current[questionIndex]}
              value={singleQuestion.mainQuestion}
              onChange={(e) => {
                handleInputChange(questionIndex, e.target.value);
              }}
            />
            <Choices />
            {questionIndex !== 0 && (
              <FontAwesomeIcon
                onClick={() => {
                  deleteQuestion(singleQuestion);
                }}
                icon={faXmark}
                width={10}
                height={10}
                className="text-red-600 absolute top-2 right-3 cursor-pointer"
              />
            )}
          </div>
        ))}

        <div className="w-full flex justify-center mt-3">
          <button
            onClick={() => {
              addNewQuestion();
            }}
            className="p-3 bg-green-700 rounded-md text-white w-[210px] text-[13px]"
          >
            Add a New Question
          </button>
        </div>
      </div>
    </div>
  );
}


const SingleQuestion = forwardRef((props, ref) => {
  const { questionIndex, value, onChange } = props;

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <div className="flex gap-2 text-[15px] border-gray-200">
          <span>Question</span>
          <span>{questionIndex + 1}</span>
        </div>
        <textarea
          className="border border-gray-200 rounded-md p-3 ml-3 w-full h-[50px] resize-none text-[13px] outline-none"
          placeholder="Your Question Here..."
          ref={ref}
          value={value}
          onChange={onChange}
        ></textarea>
      </div>
    </div>
  );
});


function Choices(){
  return(
    <div className="border border-gray-300 flex gap-[39px] items-center mt-3">
      <div className="text-[15px]">Choices</div>
      <div className="border border-gray-200 rounded-md p-2 w-full">
        List Of Choices
      </div>
    </div>
  )
}