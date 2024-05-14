'use client'
import React from 'react'
import useGlobalContextProvider from '../ContextApi';
import { useRouter } from 'next/navigation';

export default function Navbar(props) {
const { userObject } = useGlobalContextProvider();
  const { user, setUser } = userObject;
  const router = useRouter();

  async function changeTheLoginState(){
    console.log(user);
    const userCopy = { ...user };
    userCopy.isLogged = !userCopy.isLogged;
    console.log(userCopy);

    try {
      const res = await fetch(`http://localhost:3000/api/user?id=${userCopy._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updateUser: userCopy })
      })

      if(!res.ok){
        toast.error('Something wend wrong...');
        throw new Error('fetching failed...');
      }

      setUser(userCopy);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
  <nav className="bg-gray-50">
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Quiz App</h1>
  
        </div>
  
        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">

{
  user?.isLogged && (
    <div className="flex gap-2">
      <span>Welcome: {user.name}</span>
    </div>
  )
}

         {
          user && user?.isLogged === false ? (

            <button
            onClick={()=>  {router.push('/login')}}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-green-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring"
            type="button"
          >
          Login
          </button>
          ):(
            <button
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-green-200 bg-green-700 px-5 py-3 text-white transition hover:text-gray-700 focus:outline-none focus:ring"
            type="button"
         onClick={()=>{ 
         setUser((prev)=> ({...prev, isLogged: false}));
    localStorage.removeItem('user');
         
         }} >
          Logout
          </button>
          )
         }
  
        </div>
      </div>
    </div>
  </nav>
  )
}
