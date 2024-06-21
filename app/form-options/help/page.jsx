import Image from "next/image"

function HelpForm() {
  return (
    <>
        <>
            <div className="flex justify-center  bg-gradient-to-tr from-gray-100 via-gray-200 to-gray-300 py-10 min-h-screen flex-col sm:flex-row">

                <div className="bg-red-900 text-white text-center p-6 relative lg:rounded-l-lg lg:rounded-r-none shadow-lg">
                    <Image src="/assets/IAlogo.png" height={200} width={200} className="mx-auto sm:h-16 md:h-24 lg:h-40 inline" alt="logo" />
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-4">How can we help you?</h1>
                </div>

                <form className="bg-white shadow-lg px-8 pt-6 pb-8 max-w-4xl w-full lg:rounded-r-lg lg:rounded-l-none">
                    <p className="text-red-700 font-bold text-xl pb-4">Query Information</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <label className="text-left font-semibold col-span-1 self-center" htmlFor="name">Name :</label>
                        <input type="text" id="name" className="col-span-2 bg-gray-100 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-red-700" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <label className="text-left col-span-1 self-center font-semibold" htmlFor="company">Company :</label>
                        <input type="text" id="company" className="col-span-2 bg-gray-100 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-red-700" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <label className="text-left col-span-1 self-center font-semibold" htmlFor="contact">Contact No :</label>
                        <input type="text" id="contact" className="col-span-2 bg-gray-100 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-red-700" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <label className="text-left col-span-1 self-start font-semibold" htmlFor="complaint">Enter your query :</label>
                        <textarea id="complaint" className="col-span-2 bg-gray-100 border border-gray-300 rounded px-4 py-2 resize-none h-32 focus:outline-none focus:border-red-700"></textarea>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="bg-red-700 text-white font-bold py-2 px-8 rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50">Submit</button>
                    </div>
                </form>
            </div>
        </>
    </>
  )
}

export default HelpForm