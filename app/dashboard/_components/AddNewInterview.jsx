"use client"
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Ghost, LoaderCircle, Briefcase, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { chatSession } from '@/utils/GeminiAIModel'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import moment from 'moment';

function AddNewInterview() {
    const [openDialog,setOpenDialog]=useState(false)
    const [jobPosition,setJobPosition] = useState()
    const [jobDescription,setJobDescription] = useState()
    const [jobExperience,setJobExperience] = useState()
    const [jobCompany,setJobCompany] = useState()
    const [jobSalary,setJobSalary] = useState()
    const Router = useRouter();

    //for loading
    const [loading,setLoading] = useState(false)

    //for db storage
    const [jsonMockResponse,setJsonResponse] = useState([]);

    const onSubmitClick = async(e) => {
      setLoading(true)
      e.preventDefault()
      console.log(jobPosition,jobDescription,jobExperience,jobCompany,jobSalary)

      const inputGeminiPrompt = "Job Position: "+jobPosition+", Job Description: "+jobDescription+", Years of Experience: "+jobExperience+", Target Company: "+jobCompany+", Target Salary(in Rs.): "+jobSalary+" \nDepending on the information generate 5 questions and answers for an interview in JSON Format.Give Question and answer as field in JSON."

      const outputGeminiPrompt = await chatSession.sendMessage(inputGeminiPrompt);

      const mockJSONResponse = (outputGeminiPrompt.response.text()).replace('```json','').replace('```','')

      console.log(JSON.parse(mockJSONResponse))
      setJsonResponse(mockJSONResponse)
      if(mockJSONResponse){
        const dbResp = await db.insert(MockInterview)
        .values({
            mockId:uuidv4(),
            jobCompany:jobCompany,
            jobDesc:jobDescription,
            jobExperience:jobExperience,
            jobPosition:jobPosition,
            jsonMockResp:mockJSONResponse,
            createdBy:"from authentication",
            createdAt:moment().format('DD-MM-yyyy')
        }).returning({mockId:MockInterview.mockId})

        console.log("Inserted id",dbResp);
        if(dbResp)
        {
            setOpenDialog(false)
            Router.push('/dashboard/interview/'+dbResp[0]?.mockId)
        }

      }
      else{
        console.log("Error in simulating interview")
      }

      setLoading(false)
      if(dbResp) setOpenDialog(false)
    }

  return (
    <div>
        <div className='group relative bg-gradient-to-br from-purple-50 to-purple-100/70 p-8 border border-purple-200/50 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-200/30 cursor-pointer transition-all duration-300 backdrop-blur-sm'
        onClick={()=>setOpenDialog(true)}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-purple-700/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex flex-col items-center space-y-3">
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                    <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className='font-semibold text-lg text-center text-purple-700 group-hover:text-purple-800 transition-colors duration-300'>
                    Start Mock Interview
                </h2>
                <p className="text-sm text-purple-600/80 text-center">Practice with AI-generated questions</p>
            </div>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="bg-white/95 backdrop-blur-xl border-purple-200/50 w-full max-w-2xl rounded-2xl shadow-2xl">
                <DialogHeader className="space-y-3 pb-6">
                    <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-600 bg-clip-text text-transparent">
                        Tell us about your Interview
                    </DialogTitle>
                    <DialogDescription>
                        <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"></div>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmitClick} className="space-y-6">
                    <div className="space-y-5">
                        <h3 className='font-semibold text-xl text-purple-700 flex items-center gap-2'>
                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                            Job Details
                        </h3>
                        
                        <div className='space-y-2'>
                            <label className='font-medium text-purple-700 text-sm'>Job Role *</label>
                            <Input 
                                placeholder="e.g., Full Stack Developer, Data Scientist" 
                                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-11 text-purple-700 placeholder:text-black" 
                                required 
                                onChange={(e)=>setJobPosition(e.target.value)}
                            />
                        </div>

                        <div className='space-y-2'>
                            <label className='font-medium text-purple-700 text-sm'>Tech Stack & Skills *</label>
                            <Textarea 
                                placeholder="e.g., React, Next.js, Node.js, MongoDB, TypeScript..." 
                                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl min-h-[100px] text-purple-700 placeholder:text-black resize-none" 
                                required 
                                onChange={(e)=>setJobDescription(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className='space-y-2'>
                                <label className='font-medium text-purple-700 text-sm'>Years of Experience *</label>
                                <Select required onValueChange={(e)=>setJobExperience(e)}>
                                    <SelectTrigger className="border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-11">
                                        <SelectValue placeholder="Select experience..." />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-purple-200">
                                        <SelectItem value="0" className="rounded-lg">Fresh Graduate</SelectItem>
                                        <SelectItem value="0-1" className="rounded-lg">0-1 years</SelectItem>
                                        <SelectItem value="1-2" className="rounded-lg">1-2 years</SelectItem>
                                        <SelectItem value="2-3" className="rounded-lg">2-3 years</SelectItem>
                                        <SelectItem value="3-4" className="rounded-lg">3-4 years</SelectItem>
                                        <SelectItem value="4-5" className="rounded-lg">4-5 years</SelectItem>
                                        <SelectItem value="5+" className="rounded-lg">5+ years</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className='space-y-2'>
                                <label className='font-medium text-purple-700 text-sm'>Target Company *</label>
                                <Select required onValueChange={(value)=>setJobCompany(value)}>
                                    <SelectTrigger className="border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-11">
                                        <SelectValue placeholder="Select company..." />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-purple-200">
                                        <SelectItem value="Meta" className="rounded-lg">Meta</SelectItem>
                                        <SelectItem value="Apple" className="rounded-lg">Apple</SelectItem>
                                        <SelectItem value="Amazon" className="rounded-lg">Amazon</SelectItem>
                                        <SelectItem value="Netflix" className="rounded-lg">Netflix</SelectItem>
                                        <SelectItem value="Google" className="rounded-lg">Google</SelectItem>
                                        <SelectItem value="Other" className="rounded-lg">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <label className='font-medium text-purple-700 text-sm'>Expected Salary (per annum) *</label>
                            <Input 
                                placeholder="e.g., 500000, 1200000" 
                                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-11 text-purple-700 placeholder:text-black" 
                                type="number" 
                                required
                                onChange={(e)=>setJobSalary(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-purple-50/50 rounded-xl border border-purple-200/50">
                        <Checkbox 
                            className='mt-0.5 border-purple-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600' 
                            id="terms1"
                        />
                        <div className="space-y-1">
                            <label
                                htmlFor="terms1"
                                className="text-sm font-medium text-purple-700 cursor-pointer leading-relaxed"
                            >
                                I agree to the terms and conditions
                            </label>
                            <p className="text-xs text-purple-600/70">
                                By proceeding, you accept our privacy policy and terms of service.
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-4 justify-end pt-4'>
                        <Button 
                            className='bg-white hover:bg-gray-50 text-purple-700 border border-purple-200 hover:border-purple-300 rounded-xl px-6 py-2.5 font-medium transition-all duration-200' 
                            type="button" 
                            onClick={()=>setOpenDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            className='bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl px-6 py-2.5 font-medium shadow-lg shadow-purple-600/25 hover:shadow-purple-700/30 transition-all duration-200 disabled:opacity-70' 
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <LoaderCircle className='w-4 h-4 animate-spin'/>
                                    <span>Preparing Interview...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Plus className='w-4 h-4'/>
                                    <span>Start Interview</span>
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddNewInterview