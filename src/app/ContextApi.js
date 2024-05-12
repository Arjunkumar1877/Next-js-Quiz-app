"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { quizzesData } from "./QuizzesData";

export const GlobalContext = createContext();

export function ContextProvider({ children }) {
  const defaultUser = {
    id: 1,
    name: "quizUser",
    isLogged: true,
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
  
  

  // console.log(selectQuizToStart)

  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    setAllQuizzes(quizzesData);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        allQuizzes,
        setAllQuizzes,
        quizToStartObject: { selectQuizToStart, setSelectQuizToStart },
        userObject: { user, setUser}
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default function useGlobalContextProvider() {
  return useContext(GlobalContext);
}

