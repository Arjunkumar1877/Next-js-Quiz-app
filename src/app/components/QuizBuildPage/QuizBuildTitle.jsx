import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

import React from 'react'

export default function QuizBuildTitle(props) {
  return (
    <div className='p-3 flex justify-between border-green-700 rounded-md'>
  <div className="flex gap-2">
    <div className="flex gap-2 items-center">
      <div className="bg-green-700 px-4 py-1 rounded-md text-white">1</div>
      <span className="font-bold">Quiz Name: </span>
    </div>
    <input type="text" className="outline-none border-b-2 pt-1 w-[300px] text=[13px]" placeholder='Enter the Name of the quiz...' />
  </div>
  <FontAwesomeIcon icon={faCode} height={40} width={40} className='text-white p-2 rounded-md bg-green-700 cursor-pointer' />
 
    </div>
  )
}
