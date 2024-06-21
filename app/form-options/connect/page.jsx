"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



function ConnectForm() {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  return (
    <>

      <div className="flex sm:justify-center py-10 min-h-screen flex-col sm:flex-row background_color">

        <div className="flex justify-around w-screen bg-white flex-col items-center sm:items-start sm:flex-row md:mx-32 lg:mx-48 rounded-3xl shadow-lg">

          <div className="bg-white text-black text-left pl-5 md:pt-5 sm:pt-5 rounded-3xl">
            <Image src="/assets/IAlogo.png" height={80} width={110} className="object-contain hidden sm:inline" alt="logo" />
            <h1 className="text-2xl font-semibold pt-4 font_lato">What is your requirement?</h1>
          </div>

          <form className="bg-white px-8 pt-6 pb-8 lg:rounded-r-lg lg:rounded-l-none w-96 rounded-3xl">
            <p className="text-black font-semibold text-xl pb-4 font_lato">Service Information</p>

            <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
              <Label htmlFor="email">IA Hub</Label>
              <Input type="text" id="hub" placeholder="IA Hub" required />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
              <Label htmlFor="email">Domain</Label>
              <Input type="text" id="domain" placeholder="Domain" required />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
              <Label htmlFor="email">Sub-domain</Label>
              <Input type="text" id="subdomain" placeholder="Sub-domain" required />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
              <Label htmlFor="message">Enter Your Query</Label>
              <Textarea placeholder="Type your query here" className="resize-none hide_scrollbar" id="message" required />
            </div>

            <p className="text-black font-semibold text-xl pb-4 font_lato mt-8">Additional Information</p>
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
                <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                  <Label htmlFor="email">Expected Delivery</Label>
                  <Input type="date" id="delivery" placeholder="Domain" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                  <Label htmlFor="budget">Budget</Label>
                  <Input type="number" id="budget" placeholder="Budget" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                  <Label htmlFor="message">Enter your special requirements</Label>
                  <Textarea placeholder="Special requirements" className="resize-none hide_scrollbar" id="message" required />
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