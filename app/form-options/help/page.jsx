"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useState } from "react"


function HelpForm() {

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        contact: '',
        complaint: ''
    });

    //company of the user will be provided through their login credentials
    const [userCompany, setUserCompany] = useState("Company A");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(!process.env.API_DOMAIN){
        //      throw new Error('incorrect domain')
        // }

        const timestamp = new Date().toISOString();

        try {
            const response = await axios.post(`http://localhost:3001/complaints`, {
                company: userCompany,
                complaint: formData.complaint,
                inquirerName: formData.name,
                inquirerContact: formData.contact,
                isHandled: false,
                timestamp: timestamp
            });
            console.log(response.data);
            setFormData({
                name: '',
                company: '',
                contact: '',
                complaint: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <>
            <div className="flex sm:justify-center py-10 min-h-screen flex-col sm:flex-row background_color">

                <div className="flex justify-around w-screen bg-white flex-col items-center sm:items-start sm:flex-row md:mx-32 lg:mx-48 rounded-3xl shadow-lg">

                    <div className="sm:pl-5 md:pt-5 sm:pt-5 rounded-3xl w-full sm:max-w-80 text-center sm:text-left">
                        <Image src="/assets/IAlogo.png" height={80} width={110} className="object-contain hidden sm:inline" alt="logo" />
                        <h1 className="text-2xl font-semibold pt-4 font_lato">How can we help you?</h1>
                        <p className="text-gray-400 mt-3">Based on the information you provided, we will work on resolving your issue promptly.</p>
                    </div>

                    <form className="bg-white px-8 pt-6 pb-8 lg:rounded-r-lg lg:rounded-l-none w-96 rounded-3xl" onSubmit={handleSubmit}>
                        <p className="text-black font-semibold text-xl pb-4 font_lato">Query Information</p>

                        <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" placeholder="Name" name="name" onChange={handleChange} value={formData.name} required />
                        </div>



                        <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                            <Label htmlFor="company">Company</Label>
                            <Input type="text" id="company" placeholder="Company" name="company" required value={formData.company} onChange={handleChange} />
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                            <Label htmlFor="contact">Contact No.</Label>
                            <Input type="number" id="contact" placeholder="Contact" name="contact" required value={formData.contact} onChange={handleChange} />
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                            <Label htmlFor="complaint">Enter Your Query</Label>
                            <Textarea placeholder="Type your query here" className="resize-none hide_scrollbar" value={formData.complaint} name="complaint" id="complaint" required onChange={handleChange} />
                        </div>

                        <div className="text-right">
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default HelpForm