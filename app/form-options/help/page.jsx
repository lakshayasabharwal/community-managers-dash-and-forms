import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


function HelpForm() {
    return (
        <>
            <div className="flex sm:justify-center py-10 min-h-screen flex-col sm:flex-row background_color">

                <div className="flex justify-around w-screen bg-white flex-col items-center sm:items-start sm:flex-row md:mx-32 lg:mx-48 rounded-3xl shadow-lg">

                    <div className="bg-white text-black text-left pl-5 md:pt-5 sm:pt-5 rounded-3xl">
                        <Image src="/assets/IAlogo.png" height={80} width={110} className="object-contain hidden sm:inline" alt="logo" />
                        <h1 className="text-2xl font-semibold pt-4 font_lato">How can we help you?</h1>
                    </div>

                    <form className="bg-white px-8 pt-6 pb-8 lg:rounded-r-lg lg:rounded-l-none w-96 rounded-3xl">
                        <p className="text-black font-semibold text-xl pb-4 font_lato">Query Information</p>

                        <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                            <Label htmlFor="email">Name</Label>
                            <Input type="text" id="name" placeholder="Name" required/>
                        </div>



                        <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                            <Label htmlFor="email">Company</Label>
                            <Input type="text" id="company" placeholder="Company" required/>
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                            <Label htmlFor="email">Contact No.</Label>
                            <Input type="number" id="contact" placeholder="+91" required/>
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                            <Label htmlFor="message">Enter Your Query</Label>
                            <Textarea placeholder="Type your query here" className="resize-none hide_scrollbar" id="message" required/>
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