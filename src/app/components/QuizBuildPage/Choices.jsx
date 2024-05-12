
"use client";
import React, {
  createRef,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { faXmark, prefix } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

export default function Choices({
    singleQuestion,
    questionIndex,
    quizQuestions,
    setQuizQuestions,
    onChangeChoice,
    prefixes
  }) {
    const { choices } = singleQuestion;
    const alphabets = ["A", "B", "C", "D"];
    const positions = ["First", "Second", "Third", "Fourth"];
  
    // console.log(singleQuestion);
  
    function addANewChoice() {
      const quizQuestionsCopy = [...quizQuestions];
      // chechi if all the previous choices are not empty..
      const lastChoicesPosition =
        quizQuestionsCopy[questionIndex].choices.length;
  
        for(let i = lastChoicesPosition - 1; i >= 0; i--){
          const eachInput = quizQuestionsCopy[questionIndex].choices[i].substring(2);
          if(eachInput.trim(' ').length === 0){
            return toast.error(`Please ensure that all previous choices are filled out !`)
          }
        }
  
      if (lastChoicesPosition < 4) {
        const newChoice = `${alphabets[lastChoicesPosition]}. `;
        quizQuestionsCopy[questionIndex].choices.push(newChoice);
        setQuizQuestions(quizQuestionsCopy);
      }
    }
  
    function deleteChoiceFunction(choiceIndex) {
      const quizQuestionCopy = [...quizQuestions];
      quizQuestionCopy[questionIndex].choices.splice(choiceIndex, 1);
      setQuizQuestions(quizQuestionCopy);
    }
  
    function handleChoiceChangeInput(text, choiceIndex, questionIndex) {
      onChangeChoice(text, choiceIndex, questionIndex);
    }
    return (
      <div className=" flex gap-[39px] items-center mt-3">
        <div className="text-[15px]">Choices</div>
        <div className="border border-gray-300 rounded-md p-2 w-full">
          {choices.map((singleChoice, choiceIndex) => (
            <div
              className="flex gap-2 items-center mt-3 relative"
              key={choiceIndex}
            >
              <span>{alphabets[choiceIndex]}:</span>
              <input
                type="text"
                value={singleChoice.substring(prefixes[choiceIndex].length + 2)}
                onChange={(e) => {
                  handleChoiceChangeInput(
                    e.target.value,
                    choiceIndex,
                    questionIndex
                  );
                }}
                className="border text-[13px] border-gray-300 p-2 w-full rounded-md outline-none pr-10"
                placeholder={`Add Your ${positions[choiceIndex]} Choice`}
              />
              {choiceIndex >= 2 && (
                <FontAwesomeIcon
                  onClick={() => {
                    deleteChoiceFunction(choiceIndex);
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
                addANewChoice();
              }}
              className="p-3 bg-green-700 rounded-md text-white w-[210px] text-[13px]"
            >
              Add a New Choice
            </button>
          </div>
        </div>
      </div>
    );
  }