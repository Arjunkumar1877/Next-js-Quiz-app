import React from 'react'

export default function Navbar(props) {
  return (
  <nav className="bg-gray-50">
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Quiz App</h1>
  
        </div>
  
        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
          <button
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-green-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring"
            type="button"
          >
          Login
          </button>
  
        </div>
      </div>
    </div>
  </nav>
  )
}
