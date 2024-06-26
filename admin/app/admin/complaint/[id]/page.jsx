"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyView = ({ params }) => {
    const [companyDatacomp, setCompanyDatacomp] = useState({});
    const [companyDatac, setCompanyDatac] = useState({});
    const complaintId = decodeURIComponent(params.id);
    const [companyName, setCompanyName] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3001/complaints')
            .then(response => {
                const complaint = response.data.find(compl => compl.id === complaintId);
                if (complaint) {
                    setCompanyName(complaint.company);
                    setCompanyDatacomp(complaint);
                }
            })
            .catch(error => {
                console.error("There was an error fetching the complaint data!", error);
            });
    }, [complaintId]);

    useEffect(() => {
        if (companyName) {
            axios.get('http://localhost:3001/companies')
                .then(response => {
                    const company1 = response.data.find(compa => compa.name === companyName);
                    setCompanyDatac(company1 || {});
                })
                .catch(error => {
                    console.error("There was an error fetching the company data!", error);
                });
        }
    }, [companyName]);

    return (
        <div className="min-h-screen background_color p-6 font_lato">
            <div className="container mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-sm overflow-scroll hide_scrollbar">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">{companyDatac.name}</h1>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Customer Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                        <div><span className="font-semibold">Inquirer name:</span> {companyDatacomp.inquirerName}</div>
                        <div><span className="font-semibold">Inquirer's contact:</span> {companyDatacomp.inquirerContact}</div>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Company Detail</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><span className="font-semibold">IA Hub:</span> {companyDatac.hub}</div>
                        <div><span className="font-semibold">Email ID:</span> {companyDatac.email}</div>
                        <div><span className="font-semibold">Contact No:</span> {companyDatac.contact}</div>
                        <div><span className="font-semibold">Website URL:</span> {companyDatac.url}</div>
                        <div><span className="font-semibold">Query:</span> {companyDatacomp.complaint}</div>
                    </div>
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