'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import useGlobalContextProvider from '../ContextApi'

export default function Login() {

  const { userObject } = useGlobalContextProvider();
  const { user, setUser } = userObject;
  const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        isLogged: "false",
        experience: 0,
    })

    const handleSubmit = async(e)=>{
      e.preventDefault();

      try {
          
          const res = await fetch('http://localhost:3000/api/auth', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({formData: formData})
          })
          const data = await res.json()
             console.log(data)
          if(data.message !== 'Invalid credential'){
            router.push('/');
            toast.success("User signed up succesfully");
            setUser(data.user)
          }else{
            setError(data.message)
          }

      } catch (error) {
          console.log(error.message)
      }

      console.log(formData)
  }

  useEffect(()=>{
    if(user?.isLogged === true){
      router.push('/')
    }
  }, [])

    const handleChange = (e)=>{
        setFormData((prev)=> ({
            ...prev, [e.target.id]: e.target.value
        }))
    }

console.log(formData);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <Toaster />
  <div className="max-w-md w-full space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Log in to your account
      </h2>
    </div>
    <form className="mt-8 space-y-6"  onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input onChange={handleChange} id="email" name="email" type="email"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
        </div>
        <div className='pt-5'>
          <label htmlFor="password" className="sr-only">Password</label>
          <input onChange={handleChange} id="password" name="password" type="password"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Password" />
        </div>
      </div>

   
      <div>
        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M3 8a5 5 0 1110 0H3zm12 2a7 7 0 10-14 0h14zM9 6a1 1 0 00-2 0v2a1 1 0 102 0V6z" clipRule="evenodd" />
            </svg>
          </span>
          Log in
        </button>
      </div>
    </form>
    <div className="text-sm text-center">
      <p className="text-gray-600">Don't have an account?</p>
      <Link href="/signup" className="font-medium text-green-600 hover:text-green-500">Sign up here</Link>
    </div>
  </div>
</div>

  )
}
