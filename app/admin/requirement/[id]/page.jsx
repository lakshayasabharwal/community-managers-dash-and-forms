"use client"

const CompanyView = () => {




    return (
        <div className="min-h-screen background_color p-6 font_lato">
            <div className="container mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-sm overflow-scroll hide_scrollbar">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Company Name</h1>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Customer Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><span className="font-semibold">IA Hub:</span></div>
                        <div><span className="font-semibold">Email ID:</span></div>
                        <div><span className="font-semibold">Contact No:</span></div>
                        <div><span className="font-semibold">Website URL:</span></div>
                        <div><span className="font-semibold">Service Category:</span></div>
                        <div><span className="font-semibold">Sub Category:</span></div>
                        <div><span className="font-semibold">Query:</span></div>
                        <div><span className="font-semibold">Budget:</span></div>
                        <div><span className="font-semibold">Expected Delivery:</span></div>
                        <div><span className="font-semibold">Special Requirements:</span></div>
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
                            {companies.map((company, index) => (
                                <tr key={company.id} className="text-center">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{company.name}</td>
                                    <td className="py-2 px-4">{company.iaHub}</td>
                                    <td className="py-2 px-4">{company.email}</td>
                                    <td className="py-2 px-4">{company.phone}</td>
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