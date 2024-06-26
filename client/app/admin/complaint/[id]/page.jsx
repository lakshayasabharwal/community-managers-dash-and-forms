"use client"

const CompanyView = () => {

    return (
        <div className="min-h-screen background_color p-6 font_lato">
            <div className="container mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-sm overflow-scroll hide_scrollbar">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Company Name</h1>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Customer Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                        <div><span className="font-semibold">Inquirer name:</span></div>
                        <div><span className="font-semibold">Inquirer's contact:</span></div>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Company Detail</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><span className="font-semibold">IA Hub:</span></div>
                        <div><span className="font-semibold">Email ID:</span></div>
                        <div><span className="font-semibold">Contact No:</span></div>
                        <div><span className="font-semibold">Website URL:</span></div>
                        <div><span className="font-semibold">Query:</span></div>
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