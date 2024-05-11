const { default: useGlobalContextProvider } = require("@/app/ContextApi");
const { useState, useEffect } = require("react");



export function QuizStartQuestions() {
    const { quizToStartObject, allQuizzes, setAllQuizzes } = useGlobalContextProvider();
    const { selectQuizToStart } = quizToStartObject;
    const { quizQuestions } = selectQuizToStart;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [indexOfQuizSelected, setIndexOfQuizSelected] = useState(null);
    const [isQuizEnded, setIsQuizEnded] = useState(false);
    // const [allQuizzes, setAllQusses]


    useEffect(()=>{
        const quizIndexFound = allQuizzes.findIndex(
            (quiz)=> quiz.id === selectQuizToStart.id,
        );
       setIndexOfQuizSelected(quizIndexFound);

    }, []);

    useEffect(()=>{
        if(isQuizEnded){
            quizQuestions.forEach((quizQuestion)=>{
                quizQuestion.answeredResult = -1;
            });

            console.log("quiz has ended...");
        }
    }, [isQuizEnded]);

    function selectChoiceFunction(choiceIndexClicked){
        setSelectedChoice(choiceIndexClicked);

        const currentAllQuizzes = [ ...allQuizzes];

        currentAllQuizzes[indexOfQuizSelected].quizQuestions[
            currentQuestionIndex
        ].answeredResult = choiceIndexClicked;

        setAllQuizzes(currentAllQuizzes);
    }

    function moveToTheNextQuestion(){
        if(allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].answeredResult === -1){
            console.log('please select an answer');
            return;
        }

        if(allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].answeredResult !== allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex].correctAnswer){
            console.log('incorrect answer');
            return;
        }

        if(currentQuestionIndex === quizQuestions.length - 1){
            setIsQuizEnded(true);
            return;
        }

        setCurrentQuestionIndex((current) => current+1);
        setSelectedChoice(null);
    }
    return (
      <div className="poppins rounded-sm m-9  w-9/12">
        <div className="flex justify-center items-center gap-2">
          <div className="bg-green-700 flex justify-center items-center  rounded-md w-11 h-11">
          { currentQuestionIndex + 1}
          </div>
          <p>
            { quizQuestions[currentQuestionIndex].mainQuestion } ?
          </p>
        </div>
  
        <div className="mt-7 flex flex-col gap-2">
         {
            quizQuestions[currentQuestionIndex].choices.map((choice, indexChoice)=> (
                <div className={`p-3 ml-11 w-10/12 border border-green-700 rounded-md hover:bg-green-700 hover:text-white transition-all select-none ${selectedChoice === indexChoice ? 'bg-green-700' : 'bg-white'}`} key={indexChoice} onClick={()=> {
                    selectChoiceFunction(indexChoice)
                }}>
                {choice}
              </div>
             
            ))
         }

        </div>
  
        <div className="flex justify-end mt-7">
          <button className="p-2 px-5 text-[15px] text-white bg-green-700 rounded-md bg-gree mt-[700]" onClick={()=>{
            moveToTheNextQuestion()
          }}>
            submit
          </button>
        </div>
      </div>
    );
  }