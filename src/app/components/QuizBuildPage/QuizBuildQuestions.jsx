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
import Choices from "./Choices";


export default function QuizBuildQuestions({ focusProp, quizQuestions, setQuizQuestions }) {
  const prefixes = ["A", "B", "C", "D"];
  // const [quizQuestions, setQuizQuestions] = useState([
  //   {
  //     id: uuidv4(),
  //     mainQuestion: "",
  //     choices: prefixes.slice(0, 2).map((prefix) => prefix + ". "),
  //     correctAnswer: '',
  //   },
  // ]);

  const { focus, setFocusFirst } = focusProp;
  const endOfListRef = useRef(null);
  const textAreaRefs = useRef(quizQuestions.map(() => createRef()));

  // console.log(focus);
  // console.log(quizQuestions);

// Add a new question to the quizQuestions
  function addNewQuestion() {
    setFocusFirst(false);

    // Verifying the question field is empty or not ?
    const lastIndexQuizQuestions = quizQuestions.length - 1;
    if (
      quizQuestions[lastIndexQuizQuestions].mainQuestion.trim(" ").length === 0
    ) {
      toast.error(`The question ${lastIndexQuizQuestions + 1} is still empty`);
      textAreaRefs.current[lastIndexQuizQuestions].current.focus();
      return;
    }

    // This code check out if all the previous choices inputs are empty 
    for(const choice of quizQuestions[lastIndexQuizQuestions].choices){
      const singleChoice = choice.substring(2);
      if(singleChoice.trim(' ').length === 0){
        return toast.error(`Previous ensure that all previous choices are filled out !`);
      }
    }


    // This code checkes out if the correct answer input is empty 
    if(quizQuestions[lastIndexQuizQuestions].correctAnswer.length === 0){
      return toast.error(`Please ensure to fill out the correct answer!`)
    }


    // This code create a new question object and add it to the quiz questions array
    const newQuestion = {
      id: uuidv4(),
      mainQuestion: "",
      choices: prefixes.slice(0, 2).map((prefix) => prefix + " "),
      correctAnswer: ''
    };
    setQuizQuestions([...quizQuestions, newQuestion]);
    textAreaRefs.current = [...textAreaRefs.current, createRef()];
  }
  // console.log(textAreaRefs);

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

  function updateTheChoicesArray(text, choiceIndex, questionIndex) {
    console.log("text", text);
    console.log("choiceIndex", choiceIndex);
    console.log("questionIndex", questionIndex);

    const updatedQuestions = quizQuestions.map((question, i) => {
      if (questionIndex === i) {
        const updatedChoices = question.choices.map((choice, j) => {
          if (choiceIndex === j) {
            return prefixes[j] + ". " + text;
          } else {
            return choice;
          }
        });

        return { ...question, choices: updatedChoices };
      }

      return question;
    });

    setQuizQuestions(updatedQuestions);
  }

  function updateCorrectAnswer(text, questionIndex){
    const correctAnswerArray = ['A', 'B', 'C', 'D'];
    // console.log(correctAnswerArray.indexOf(text));
    const questionCopy = [ ...quizQuestions];
    questionCopy[questionIndex].correctAnswer = correctAnswerArray.indexOf(text)
    setQuizQuestions(questionCopy);
  }

  useLayoutEffect(() => {
    if (endOfListRef.current) {
      console.log(endOfListRef);
      setTimeout(() => {
        endOfListRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [quizQuestions.length]);

  // useEffect(() => {
  //   if (endOfListRef.current) {
  //     endOfListRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [quizQuestions]);

  // console.log(quizQuestions);

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
          // className: "",
          // duration: 1500,
          style: {
            fontSize: "13px"
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
            <Choices
              questionIndex={questionIndex} 
              singleQuestion={singleQuestion}
              onChangeChoice={(text, choiceIndex, questionIndex) => {
                updateTheChoicesArray(text, choiceIndex, questionIndex);
              }}
              quizQuestions={quizQuestions}
              setQuizQuestions={setQuizQuestions}
              value={singleQuestion.choices}
              prefixes={prefixes}
            />
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

<CorrectAnswer onChangeCorrectAnswer={(text)=>{
  updateCorrectAnswer(text, questionIndex)
}} singleQuestion={singleQuestion} />

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


function CorrectAnswer({onChangeCorrectAnswer, singleQuestion}){
  const [correctAnswerInput, setCorrectAnswerInput] = useState(singleQuestion.correctAnswer);

  const prefixes = ['A', 'B', 'C', 'D'];
  function handleOnChangeInput(text){
    const upperText = text.toUpperCase();
    for(const choice of singleQuestion.choices){
      const eachChoice = choice.substring(0, 1);

      if(eachChoice === upperText || upperText === ""){
        setCorrectAnswerInput(upperText);
        onChangeCorrectAnswer(upperText);
      }
    }
    // if(upperText === '' || ['A', 'B', 'C', 'D'].includes(upperText)){
    //     setCorrectAnswerInput(upperText);
    //     onChangeCorrectAnswer(upperText);
    // }
  }

  return (
    <div className="flex gap-1 items-center mt-3">
      <div className="text-[15px]">Correct Answer</div>
      <div className="border border-gray-200 rounded-md p-1 w-full">
        <input value={prefixes[correctAnswerInput]} maxLength={1} onChange={(e)=>{
          handleOnChangeInput(e.target.value);
        }} className="p-3 outline-none w-full text-[13px]" placeholder="Add the correct answer ..." />
      </div>
    </div>
  )
}


const SingleQuestion = forwardRef((props, ref) => {
  const { questionIndex, value, onChange } = props;

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <div className="flex gap-2 text-[15px] border-gray-300">
          <span>Question</span>
          <span>{questionIndex + 1}</span>
        </div>
        <textarea
          className="border border-gray-300 rounded-md p-3 ml-3 w-full h-[50px] resize-none text-[13px] outline-none"
          placeholder="Your Question Here..."
          ref={ref}
          value={value}
          onChange={onChange}
        ></textarea>
      </div>
    </div>
  );
});


