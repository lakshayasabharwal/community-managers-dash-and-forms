"use client"

import { useState } from 'react';
import Image from 'next/image';

function ConnectForm() {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  return (
    <>
      <div className="bg-gray-200 py-10 min-h-screen">
        <div className="max-w-2xl mx-auto mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-red-900 text-white text-center p-6 relative">
            <Image src="/assets/IAlogo.png" alt="IA Logo" width = {70} height={70} className="absolute top-4 left-4"/>
            <h1 className="text-3xl font-bold">Requirement Form</h1>
          </div>
          <form className="p-6">
            <div className="mb-8">
              <h2 className="text-red-900 text-lg font-bold mb-4">Service Information</h2>
              <label htmlFor="ia-hub" className="block font-semibold mb-2">IA Hub: <span className="text-red-600">*</span></label>
              <select id="ia-hub" name="ia-hub" className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100" required>
                <option value=""></option>
              </select>

              <label htmlFor="domain" className="block font-semibold mb-2">Domain: <span className="text-red-600">*</span></label>
              <select id="domain" name="domain" className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100" required>
                <option value=""></option>
              </select>

              <label htmlFor="sub-domain" className="block font-semibold mb-2">Sub-domain: <span className="text-red-600">*</span></label>
              <select id="sub-domain" name="sub-domain" className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100" required>
                <option value=""></option>
              </select>

              <label htmlFor="query" className="block font-semibold mb-2">Enter your query: <span className="text-red-600">*</span></label>
              <textarea id="query" name="query" className="w-full p-2 mb-4 border border-gray-300 rounded h-20 resize-none bg-gray-100" required style={{ overflow: 'hidden' }}></textarea>
            </div>

            <div className="mb-8">
              <h2 className="text-red-900 text-lg font-bold mb-4">Additional Information</h2>
              <div className='flex justify-center gap-10'>
                <div>
                <input type="radio" id="yes" name="additional-info" onClick={() => setShowAdditionalInfo(true)} />
                <label htmlFor="yes">Yes</label>
                </div>
                <div>
                <input type="radio" id="no" name="additional-info" onClick={() => setShowAdditionalInfo(false)} />
                <label htmlFor="no">No</label>
                </div>
              </div>
              {showAdditionalInfo && (
                <>
                  <label className="block font-semibold mb-2">Expected Delivery :</label>
                  <input type="date" name="expected-delivery" className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100"/>

                  <label className="block font-semibold mb-2">Budget :</label>
                  <input type="number" name="budget" className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100"/>

                  <label className="block font-semibold mb-2">Special Requirements :</label>
                  <textarea name="special-requirements" className="w-full p-2 mb-4 border border-gray-300 rounded h-20 resize-none bg-gray-100" style={{ overflow: 'hidden' }}></textarea>
                </>
              )}
            </div>
            <button type="submit" className="w-full bg-red-900 text-white py-3 rounded hover:bg-red-700">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ConnectForm