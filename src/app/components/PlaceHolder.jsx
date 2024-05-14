import { useRouter } from 'next/navigation'
import React from 'react'

export default function PlaceHolder(props) {
  const router = useRouter();
  return (
    <div className='poppons flex-col gap-3 p-4 flex justify-center items-center'>
        {/* <Image src="./" alt="" width={130} height={130} /> */}
        <h2 className='text-2xl font-bold'>Quizzes await ! Make one</h2>
        <span>
           Click below to begin your journey here...
        </span>
        <button className="p-3 px-4 text-white text-[12px] bg-green-700 rounded-md" onClick={()=> router.push('/quiz-build')}>
                Create my first Quiz
            </button>
    </div>
  )
}
