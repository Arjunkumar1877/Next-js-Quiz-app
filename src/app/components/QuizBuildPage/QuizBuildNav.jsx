import Image from 'next/image'
import React from 'react'

export default function QuizBuildNav() {
  return (
    <div className='poppins my-12 flex justify-between items-center'>
      <div className="flex items-center">
        {/* <Image src={"/quiz-builder-icon.png"} alt='' height={50} width={50} /> */}
        <span className="text-2xl">
          Quiz <span className="text-green-700 font-bold">Builder</span>
        </span>
      </div>
      <button className="p-2 px-4 bg-green-700 rounded-md text-white">
        Save
      </button>
    </div>
  )
}
