"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Home() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center background_color">
      <div>
        <h1 className="text-2xl font-semibold mb-6 p-5 text-center text-gray-800 font_lato">How can we help you?</h1>
        <div className="w-min">
          <div className="flex justify-center gap-4 mb-8 font_lato">
            <label className={`flex p-4 items-center justify-center w-48 h-32 bg-white rounded-xl shadow-md cursor-pointer hover:bg-gray-50 transition ${selectedOption === 'option1' ? 'ring-2 ring-gray-800' : ''}`}>
              <input
                type="radio"
                name="option"
                value="option1"
                checked={selectedOption === 'option1'}
                onChange={handleOptionChange}
                className="form-radio hidden"
              />
              <span className="text-gray-700">Need help at your <br className="hidden sm:inline" /> co-working space?</span>
            </label>
            <label className={`flex p-4 items-center justify-center w-48 h-32 bg-white rounded-xl shadow-md cursor-pointer hover:bg-gray-50 transition ${selectedOption === 'option2' ? 'ring-2 ring-gray-800' : ''}`}>
              <input
                type="radio"
                name="option"
                value="option2"
                checked={selectedOption === 'option2'}
                onChange={handleOptionChange}
                className="form-radio hidden"
              />
              <span className="text-gray-700">Need help with <br /> your business?</span>
            </label>
          </div>
          {
            selectedOption === '' ? (
              <Button disabled
                className="w-full"
              >
                Next
              </Button>
            ) : (
              <Link href={selectedOption === 'option1' ? '/form-options/help' : '/form-options/connect'}>
                <Button
                  className="w-full"
                >
                  Next
                </Button>
              </Link>
            )
          }
        </div>
      </div>
    </div>
  );
}
