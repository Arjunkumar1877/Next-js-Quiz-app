'use client';


import { createContext, useContext, useEffect, useState } from "react";
import { quizzesData } from "./QuizzesData";

export const  GlobalContext = createContext();

export function ContextProvider({ children }) {
    const [allQuizzes, setAllQuizzes] = useState(['my quiz']);
    const [selectQuizToStart, setSelectQuizToStart] = useState(null);

    console.log(selectQuizToStart)
    useEffect(()=>{
 setAllQuizzes(quizzesData)
    }, [])

    return <GlobalContext.Provider value={{allQuizzes, setAllQuizzes, quizToStartObject: { selectQuizToStart, setSelectQuizToStart }}}>
        {children}
    </GlobalContext.Provider>   
}


export default function useGlobalContextProvider(){
    return useContext(GlobalContext);
}

