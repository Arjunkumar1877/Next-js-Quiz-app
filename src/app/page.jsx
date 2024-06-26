"use client"
import Image from "next/image";
import QuizzesArea from "./components/QuizzesArea";
import Navbar from "./components/Navbar";
import useGlobalContextProvider from "./ContextApi";
import { useEffect } from "react";

export default function Home() {
  const { quizToStartObject } = useGlobalContextProvider();
  const { setSelectQuizToStart, userObject } = quizToStartObject;
  // const { user, setUser } = userObject;

  useEffect(()=>{
  setSelectQuizToStart(null);
  }, []);
  return (
  <div>
   <header>
    <Navbar />
   </header>
 <QuizzesArea />
  </div>
  
  );
}
