'use client';


import { createContext, useContext, useEffect, useState } from "react";
import { quizzesData } from "./QuizzesData";

export const  GlobalContext = createContext();

export function ContextProvider({ children }) {
    const [allQuizzes, setAllQuizzes] = useState(['my quiz']);
    useEffect(()=>{
 setAllQuizzes(quizzesData)
    }, [])

    return <GlobalContext.Provider value={{allQuizzes, setAllQuizzes}}>
        {children}
    </GlobalContext.Provider>   
}


export default function useGlobalContextProvider(){
    return useContext(GlobalContext);
}

