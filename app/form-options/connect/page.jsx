"use client"

import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"


import DatePicker from "@components/datePicker";
import Dropdown from "@components/dropdown";

const hubs = [
  {
    value: "Gurgaon",
    label: "Gurgaon",
  },
  {
    value: "Noida",
    label: "Noida",
  },
  {
    value: "Ahmdebad",
    label: "Ahemdabad",
  },
]

function ConnectForm() {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const handleSwitchChange = () => {
    setShowAdditionalInfo((prevState) => !prevState);
  };

  return (
    <>

      <div className="flex sm:justify-center py-10 min-h-screen flex-col sm:flex-row background_color">

        <div className="flex justify-around w-screen bg-white flex-col items-center sm:items-start sm:flex-row md:mx-32 lg:mx-48 rounded-3xl shadow-lg">

          <div className="sm:pl-5 md:pt-5 sm:pt-5 rounded-3xl w-full sm:max-w-80 text-center sm:text-left">
            <Image src="/assets/IAlogo.png" height={80} width={110} className="object-contain hidden sm:inline" alt="logo" />
            <h1 className="text-2xl font-semibold pt-4 font_lato">What is your requirement?</h1>
            <p className="text-gray-400 mt-3">In line with your particular needs, we will pair you with a relevant startup within 24 hours.</p>
          </div>

          <form className="bg-white px-8 pt-6 pb-8 lg:rounded-r-lg lg:rounded-l-none w-96 rounded-3xl">
            <p className="text-black font-semibold text-xl pb-4 font_lato">Service Information</p>

            <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
              <Label htmlFor="hub">IA Hub</Label>
              <Dropdown params={hubs} label="Select Hub" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
              <Label htmlFor="domain">Domain</Label>
              <Dropdown params={hubs} label="Select Domain" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
              <Label htmlFor="subdomain">Sub-domain</Label>
              <Dropdown params={hubs} label="Select sub-domain" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
              <Label htmlFor="message">Enter Your Query</Label>
              <Textarea placeholder="Type your query here" className="resize-none hide_scrollbar" id="message" required />
            </div>

            <div className="flex my-5 justify-between items-center">
              <p className="text-black font-semibold text-xl pr-4 font_lato">Additional Information</p>
              <Switch checked={showAdditionalInfo} onCheckedChange={handleSwitchChange} />
            </div>

            {showAdditionalInfo && (
              <>
                <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                  <Label htmlFor="delivery">Expected Delivery</Label>
                  <DatePicker />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                  <Label htmlFor="budget">Budget</Label>
                  <Input type="number" id="budget" placeholder="₹" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                  <Label htmlFor="message">Enter your special requirements</Label>
                  <Textarea placeholder="Special requirements" className="resize-none hide_scrollbar" id="message" />
                </div>
              </>
            )}

            <div className="text-right">
              <Button type="submit">Submit</Button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}

export default ConnectForm