"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyView = ({ params }) => {
  const [companyData, setCompanyData] = useState(null);
  const [companyDatamore, setCompanyDatamore] = useState(null);
  const [suggestedCompanies, setSuggestedCompanies] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const requirementId = decodeURIComponent(params.id);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/requirements'); 
        const company = response.data.find(item => item.id === requirementId);
        setCompanyData(company);

        if (company) {
          setCompanyName(company.company);
          const companiesResponse = await axios.get('http://localhost:3001/companies');
          const similarCompanies = companiesResponse.data.filter(item => item.domain === company.domain && item.subdomain === company.subdomain && item.name !== company.company);
          setSuggestedCompanies(similarCompanies);
        }

      } catch (error) {
        console.error("There was an error fetching the company data!", error);
      }
    };

    fetchCompanyData();
  }, [requirementId]);

  useEffect(() => {
    if (companyName) {
      const fetchCompanyDatamore = async () => {
        try {
          const response = await axios.get('http://localhost:3001/companies'); 
          const companyd = response.data.find(item => item.name === companyName);
          setCompanyDatamore(companyd);
        } catch (error) {
          console.error("There was an error fetching the company data!", error);
        }
      };

      fetchCompanyDatamore();
    }
  }, [companyName]);

  return (
    <div className="min-h-screen background_color p-6 font_lato">
      <div className="container mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm overflow-scroll hide_scrollbar">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">{companyData?.company}</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><span className="font-semibold">IA Hub:</span> {companyData?.hub}</div>
            <div><span className="font-semibold">Email ID:</span> {companyDatamore?.email}</div>
            <div><span className="font-semibold">Contact No:</span> {companyDatamore?.contact}</div>
            <div><span className="font-semibold">Website URL:</span> {companyDatamore?.url}</div>
            <div><span className="font-semibold">Service Category:</span> {companyData?.domain}</div>
            <div><span className="font-semibold">Sub Category:</span> {companyData?.subdomain}</div>
            <div><span className="font-semibold">Query:</span> {companyData?.requirement}</div>
            <div><span className="font-semibold">Budget:</span> {companyData?.budget}</div>
            <div><span className="font-semibold">Expected Delivery:</span> {companyData?.delivery}</div>
            <div><span className="font-semibold">Special Requirements:</span> {companyData?.specialRequirement}</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm mt-6 overflow-scroll hide_scrollbar">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Suggested Companies</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 text-center">S.No</th>
                <th className="py-2 px-4 text-center">Company Name</th>
                <th className="py-2 px-4 text-center">IA Hub</th>
                <th className="py-2 px-4 text-center">Email ID</th>
                <th className="py-2 px-4 text-center">Phone No</th>
              </tr>
            </thead>
            <tbody>
              {suggestedCompanies.map((company, index) => (
                <tr key={company.name}>
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4 text-center">{company.name}</td>
                  <td className="py-2 px-4 text-center">{company.hub}</td>
                  <td className="py-2 px-4 text-center">{company.email}</td>
                  <td className="py-2 px-4 text-center">{company.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyView;