"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { quizzesData } from "./QuizzesData";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

export const GlobalContext = createContext();

export function ContextProvider({ children }) {
  const defaultUser = {
    id: 1,
    name: "quizUser",
    isLogged: false,
    experience: 0,
  };
  const [allQuizzes, setAllQuizzes] = useState(["my quiz"]);
  const [selectQuizToStart, setSelectQuizToStart] = useState(null);
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const saveUserData = localStorage.getItem("user");
      console.log(saveUserData + "🎉😜🤦‍♂️🤦‍♂️😢")
      return saveUserData ? JSON.parse(saveUserData) : defaultUser;
    } else {
      // Handle server-side rendering (optional)
      return defaultUser; 
    }
  });
  const [openIconBox, setOpenIconBox] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState({ faIcon: faQuestion });
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [threeDotsPositions, setThreeDotsPositions] = useState({ x: 0, y: 0});
  const [selectedQuiz, setSelectedQuiz] = useState(null);


    // console.log(selectQuizToStart)

  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    setAllQuizzes(quizzesData);
  }, []);

  useEffect(()=>{
    if(selectedQuiz){
      setSelectedIcon({ faIcon: selectedQuiz.icon })
    }else{
      setSelectedIcon({ faIcon: faQuestion })
    }
  }, [selectedQuiz])

  console.log(allQuizzes)
  return (
    <GlobalContext.Provider
      value={{
        allQuizzes,
        setAllQuizzes,
        quizToStartObject: { selectQuizToStart, setSelectQuizToStart },
        userObject: { user, setUser},
        openBoxToggle: {openIconBox, setOpenIconBox},
        selectedIconObject: { selectedIcon, setSelectedIcon },
        dropDownToggleObject: { dropDownToggle, setDropDownToggle },
        threeDotsPositionsObject: { threeDotsPositions, setThreeDotsPositions },
        selectedQuizObject: { selectedQuiz, setSelectedQuiz}
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default function useGlobalContextProvider() {
  return useContext(GlobalContext);
}

