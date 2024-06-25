"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import axios from 'axios';

import DatePicker from "@components/datePicker";
import Dropdown from "@components/dropdown";

function ConnectForm() {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [hubs, setHubs] = useState([]);
  const [domains, setDomains] = useState([]);
  const [subdomains, setSubdomains] = useState([]);
  const [allDomains, setAllDomains] = useState([]);
  const [formData, setFormData] = useState({
    hub: '',
    domain: '',
    subdomain: '',
    requirement: '',
    delivery: '',
    budget: '',
    specialRequirements: '',
  });

  //company of the user will be provided through their login credentials
  const [userCompany, setUserCompany] = useState("Company A");

  useEffect(() => {
    const fetchHubs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/hubs');
        const hubsData = response.data.map(hub => ({
          label: hub.location,
          value: hub.location.toLowerCase()
        }));
        setHubs(hubsData);
      } catch (error) {
        console.error('Error fetching hubs:', error);
      }
    };

    const fetchDomains = async () => {
      try {
        const response = await axios.get('http://localhost:3001/domains');
        const domainsData = response.data.map(domain => ({
          label: domain.name,
          value: domain.name.toLowerCase()
        }));
        setDomains(domainsData);
        setAllDomains(response.data);
      } catch (error) {
        console.error('Error fetching domains:', error);
      }
    };

    fetchHubs();
    fetchDomains();
  }, []);

  const handleSwitchChange = () => {
    setShowAdditionalInfo((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDropdownChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (name.toLowerCase() === "domain") {
      const selectedDomain = allDomains.find(domain => domain.name.toLowerCase() === value.toLowerCase());
      const subdomainsData = selectedDomain ? selectedDomain.subdomains.map(subdomain => ({
        label: subdomain.name,
        value: subdomain.name.toLowerCase()
      })) : [];
      setSubdomains(subdomainsData);
    }
  };

  const handleDateChange = (name, date) => {
    console.log('date change');
    setFormData((prevState) => ({ ...prevState, [name]: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timestamp = new Date().toISOString();

    if(formData.hub === '' || formData.domain === '' || formData.subdomain === ''){
      alert('required fields not filled')
      return;
    }
    try {
      const response = await axios.post(`http://localhost:3001/requirements`, {
        hub: formData.hub,
        domain: formData.domain,
        subdomain: formData.subdomain,
        requirement: formData.requirement,
        delivery: formData.delivery,
        budget: formData.budget,
        specialRequirements: formData.specialRequirements,
        timestamp: timestamp,
        isHandled: false,
        company: userCompany
      });
      console.log(response.data);
      setFormData({
        hub: '',
        domain: '',
        subdomain: '',
        requirement: '',
        delivery: '',
        budget: '',
        specialRequirements: '',
      });

      window.location.reload();         //to reset form

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex sm:justify-center py-10 min-h-screen flex-col sm:flex-row background_color">
      <div className="flex justify-around w-screen bg-white flex-col items-center sm:items-start sm:flex-row md:mx-32 lg:mx-48 rounded-3xl shadow-lg">
        <div className="sm:pl-5 md:pt-5 sm:pt-5 rounded-3xl w-full sm:max-w-80 text-center sm:text-left">
          <Image src="/assets/IAlogo.png" height={80} width={110} className="object-contain hidden sm:inline" alt="logo" />
          <h1 className="text-2xl font-semibold pt-4 font_lato">What is your requirement?</h1>
          <p className="text-gray-400 mt-3">In line with your particular needs, we will pair you with a relevant startup within 24 hours.</p>
        </div>
        <form className="bg-white px-8 pt-6 pb-8 lg:rounded-r-lg lg:rounded-l-none w-96 rounded-3xl" onSubmit={handleSubmit}>
          <p className="text-black font-semibold text-xl pb-4 font_lato">Service Information</p>

          <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
            <Label htmlFor="hub">IA Hub</Label>


            <Dropdown params={hubs} label="Select Hub" name="hub" handleDropdownChange={handleDropdownChange} required/>


          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
            <Label htmlFor="domain">Domain</Label>
            <Dropdown params={domains} name="domain" label="Select Domain" handleDropdownChange={handleDropdownChange} required/>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
            <Label htmlFor="subdomain">Sub-domain</Label>
            <Dropdown params={subdomains} label="Select Sub-domain" name="subdomain" handleDropdownChange={handleDropdownChange} required/>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
            <Label htmlFor="requirement">Enter Your Query</Label>
            <Textarea placeholder="Type your query here" className="resize-none hide_scrollbar" id="requirement" name="requirement" value={formData.requirement} onChange={handleChange} required />
          </div>

          <div className="flex my-5 justify-between items-center">
            <p className="text-black font-semibold text-xl pr-4 font_lato">Additional Information</p>
            <Switch checked={showAdditionalInfo} onCheckedChange={handleSwitchChange} />
          </div>

          {showAdditionalInfo && (
            <>
              <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                <Label htmlFor="delivery">Expected Delivery</Label>
                <DatePicker name="delivery" handleDateChange={handleDateChange} />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                <Label htmlFor="budget">Budget</Label>
                <Input type="number" id="budget" placeholder="₹" onChange={handleChange} name="budget" value={formData.budget} />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5 py-5">
                <Label htmlFor="specialRequirements">Enter your special requirements</Label>
                <Textarea placeholder="Special requirements" className="resize-none hide_scrollbar" id="specialRequirements" name="specialRequirements" value={formData.specialRequirements} onChange={handleChange} />
              </div>
            </>
          )}

          <div className="text-right">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConnectForm;
