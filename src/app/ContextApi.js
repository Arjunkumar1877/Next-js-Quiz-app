"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { quizzesData } from "./QuizzesData";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

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
  const [openIconBox, setOpenIconBox] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState({ faIcon: faQuestion });
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [threeDotsPositions, setThreeDotsPositions] = useState({ x: 0, y: 0});
  const [selectedQuiz, setSelectedQuiz] = useState(null);


    // console.log(selectQuizToStart)

  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);


  useEffect(()=>{
    const fetchAllQuizes = async ()=>{
      try {
        const res = await fetch('http://localhost:3000/api/quizzes', {
          cache: 'no-cache',
        });

        if(!res.ok){
          toast.error("Something went wrong...");
          throw new Error('fetching failed...');
        }

        const quizzesData = await res.json();
        setAllQuizzes(quizzesData.quizzes);
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchAllQuizes();
  }, [])

  useEffect(()=>{
  const fetchUser = async()=>{
    try {
      const res = await fetch('http://localhost:3000/api/user', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: 'quizUser',
          isLogged: false,
          experience: 0
        })
      });

      if(!res.ok){
        toast.error('Something went wrong...');
        throw new Error('fetching failed...');
      }

      const userData = await res.json();
      console.log(userData);

      if(userData.message === 'User already exists'){
        setUser(userData.user);
      }else{
        setUser(userData.user);
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  fetchUser();
  },[])

  console.log(allQuizzes)

  // useEffect(() => {
  //   setAllQuizzes(quizzesData);
  // }, []);

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

