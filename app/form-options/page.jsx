"use client"

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className=" p-6 rounded-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">How can we help you?</h1>
        <div className="flex justify-center gap-4 mb-6">
          <div
            className={`flex p-4 items-center justify-center w-48 h-32 bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 transition ${selectedOption === 'option1' ? 'ring-2 ring-red-800' : ''}`}
            onClick={() => setSelectedOption('option1')}
          >
            <input
              type="radio"
              name="option"
              value="option1"
              checked={selectedOption === 'option1'}
              onChange={handleOptionChange}
              className="form-radio h-5 w-5 text-red-800"
            />
            <span className="ml-2 text-gray-700">Need help at your co-working space?</span>
          </div>
          <div
            className={`flex p-4 items-center justify-center w-48 h-32 bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 transition ${selectedOption === 'option2' ? 'ring-2 ring-red-800' : ''}`}
            onClick={() => setSelectedOption('option2')}
          >
            <input
              type="radio"
              name="option"
              value="option2"
              checked={selectedOption === 'option2'}
              onChange={handleOptionChange}
              className="form-radio h-5 w-5 text-red-800"
            />
            <span className="ml-2 text-gray-700">Need help with your business?</span>
          </div>
        </div>
        {
          selectedOption === '' ? (
            <button disabled
              className="mt-6 w-full py-2 px-4 bg-red-900 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition"
            >
              Continue
            </button>
          ) : (
            <Link href={selectedOption === 'option1' ? '/form-options/help' : '/form-options/connect'}>
              <button
                className="mt-6 w-full py-2 px-4 bg-red-800 text-white font-semibold rounded-lg shadow-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition"
              >
                Continue
              </button>
            </Link>
          )
        }




      </div>
    </div>
  );
}
