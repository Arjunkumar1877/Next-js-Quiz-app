'use client'

import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import useGlobalContextProvider from '../ContextApi';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function DropDown(props) {

    const { dropDownToggleObject, threeDotsPositionsObject, selectedQuizObject, allQuizzes, setAllQuizzes } = useGlobalContextProvider();
    const { threeDotsPositions } = threeDotsPositionsObject;
    const { dropDownToggle, setDropDownToggle } = dropDownToggleObject;
    const { selectedQuiz, setSelectedQuiz } = selectedQuizObject;
    const [isDialogOpened, setIsDialogOpened] = useState(false);
    const dropDownRef = useRef(null);
    const router = useRouter();

    const menuItems = [
        { name: 'Modify', icon: faPencil},
        { name: 'Delete', icon: faTrash},
    ];

    console.log(allQuizzes)

    useEffect(()=>{
        function handleOutsideClick(event){
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                if(!isDialogOpened){
                    setSelectedQuiz(null);
                }
                setDropDownToggle(false);
            }
        }

        document.addEventListener('click', handleOutsideClick);
        return ()=>{
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [dropDownToggle])

    function deleteTheQuiz(){
        const updateAllQuizzes = allQuizzes.filter((quiz)=> {
            if(quiz.id !== selectedQuiz.id){
                return quiz;
            }
        })

        setAllQuizzes(updateAllQuizzes);
        toast.success('The quiz has been deleted sucessfully.');
        setIsDialogOpened(false);
        setSelectedQuiz(null);
    }

    function handleClickedItem(menuItem){

        if(menuItem.name === 'Modify'){
            router.push('/quiz-build');
        }
        
        if(menuItem.name === 'Delete'){
            console.log("delete clicked")
            setIsDialogOpened(true);

            toast((t)=> (
                <div className="flex flex-col gap-4">
                    <div>
                        Do you really want to delete ({ selectedQuiz.quizTitle }) Quiz ?
                    </div>
                    <div className="w-full flex gap-3 justify-center">
                        <button onClick={()=> {
                            deleteTheQuiz()
                            toast.dismiss(t.id);
                        }} className="bg-green-700 text-white p-1 w-[100px] rounded-md">
                            Yes 
                        </button>
                        <button className="bg-white text-green-700 p-1 w-[100px] border border-green-700 rounded-md hover:text-white hover:bg-green-700" onClick={()=> {
                            toast.dismiss(t.id);
                            setIsDialogOpened(false);
                            setSelectedQuiz(null)
                        }}>No</button>
                    </div>
                </div>
            ), {
                duration: '10000',
                id: 'deleteQuiz'
            })

        }
    }

  return (
    <div style={{left: threeDotsPositions.x, top: threeDotsPositions.y}} ref={dropDownRef} className={`p-4 w-32 fixed z-50 shadow-md flex rounded-lg flex-col gap-3 bg-white poppins poppins-light text-[13px] ${dropDownToggle ? 'visible' : 'invisible'}`}>
        <Toaster />
        {
            menuItems.map((menuItem, index)=>(
                <div onClick={()=> handleClickedItem(menuItem)} key={index} className="flex gap-2 items-center border text-green-700 border-gray-200 rounded-md select-none cursor-pointer hover:text-white hover:bg-green-700">
                    <FontAwesomeIcon className='size-4' icon={menuItem.icon} />
                    <div className="">{menuItem.name}</div>
                </div>
            ))
       }
    </div>
  )
}
