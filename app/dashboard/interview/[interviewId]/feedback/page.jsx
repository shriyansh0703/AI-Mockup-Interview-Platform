"use client"
import React, { useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
  

function Feedback() {
    const[feedbackList,setFeedbackList]=useState([]);
    const router = useRouter();
  return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold text-green-500'>Congratulations!!</h2>
        <h2 className='font-bold text-2xl'>Here is your Interview Result</h2>
        <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>5</strong></h2>
        <h2>Find below interview questions with correct ans, Your answer and feedback for improvement</h2>
        <Collapsible className='mt-7'>
        <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full'>
        question will show up
        <ChevronsUpDownIcon/>
        </CollapsibleTrigger>
        <CollapsibleContent>
        <div className='flex flex-col gap-2'>
            <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong></h2>
            <h2 className='p-2 border rounded-lg bg-purple-50 text-sm text-purple-900'><strong>Your Answer:</strong></h2>
            <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer:</strong></h2>
            <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'><strong>Feedback:</strong></h2>
        </div>
        </CollapsibleContent>
        </Collapsible>
        <Button onClick={()=>router.replace('/dashboard')} className='bg-purple-700 mt-5'>Go Home</Button>

    </div>
  )
}

export default Feedback