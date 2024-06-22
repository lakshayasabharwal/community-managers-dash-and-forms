"use client"

import { useState } from "react";
 
const Cell = ({ isDone, companyLogo, companyName, timestamp }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md flex-col md:flex-row">
    <input type="checkbox" checked={isDone} className="form-checkbox h-5 w-5 text-blue-600"/>
    <div className="flex items-center space-x-4 justify-center sm:gap-36">
      <div>
        <p className="text-sm text-gray-500">{timestamp}</p>
      </div>
      <div className="flex gap-4 md:block">
        <img src={companyLogo} alt="Company Logo" className="h-10 w-10 rounded-full mx-auto" />
        <p className="font-semibold text-gray-800 flex justify-center items-center">{companyName}</p>
      </div>
      <div>
      <button className="px-4 py-2 bg-red-700 text-white rounded-lg shadow-md  hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
        View More
      </button>
    </div>
    </div>
    
    <div className="text-center">
      <span className="block text-lg font-bold text-gray-800">24:00</span>
      <span className="text-sm text-gray-500">SLA</span>
    </div>
  </div>
);

function CommunityManagerDashBoard() {
  const [responsesList, setResponsesList] = useState([
    { isDone: false, companyLogo: 'https://via.placeholder.com/40', companyName: 'Company Name', timestamp: 'Date & Time Stamp' },
  ]);
 
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 via-gray-200 to-gray-300 p-4 font_lato">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mb-4">
              All Responses (0)
            </button>
            <button className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mb-4">
              Unread (0)
            </button>
          </div>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mb-4">
            Filter By
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {responsesList.map((response, index) => (
            <Cell
              key={index}
              isDone={response.isDone}
              companyLogo={response.companyLogo}
              companyName={response.companyName}
              timestamp={response.timestamp}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommunityManagerDashBoard