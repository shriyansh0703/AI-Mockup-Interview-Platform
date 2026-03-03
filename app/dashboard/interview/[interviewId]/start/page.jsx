"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import Logo from '@/app/_components/Logo';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button';

function StartInterview({params}) {
    const router = useRouter();
    const [activeQuestionIndex,setActiveQuestionIndex]= useState(0);
    const [interviewData,setInterviewData] = useState();
    const [mockIntvQues,setMockIntvQues] = useState();

    useEffect(() => {
        GetInterviewDetails();
    },[]);

    const GetInterviewDetails = async() => {
        const res = await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
        const mockResponseJSON  = JSON.parse(res[0].jsonMockResp);
        setInterviewData(res[0]);
        setMockIntvQues(mockResponseJSON);
        console.log(mockResponseJSON)
        console.log("Passing interviewData:", interviewData);
      }

  return (
    <div>
       <div className="relative">
        <div className="flex justify-between items-center p-1 ">
          <Logo />
          </div>
          <div className='flex justify-end gap-6 mr-10'>
       {activeQuestionIndex> 0  && 
       <Button className='bg-purple-700 hover:bg-purple-900' onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>} 
        {activeQuestionIndex!=mockIntvQues?.length-1 && 
        <Button className='bg-purple-700 hover:bg-purple-900'  onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question </Button>}
        {activeQuestionIndex==mockIntvQues?.length-1 && 
        <Button className='bg-white border border-red-700 text-red-700 hover:bg-red-200' onClick={() => router.push('/overallfeedback')} >End Interview</Button>}
      </div>
     
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Questions */}
        <QuestionSection 
        mockIntvQues={mockIntvQues}
        activeQuestionIndex={activeQuestionIndex}
        interviewData={interviewData}
        />
        <RecordAnswerSection 
          mockIntvQues={mockIntvQues}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      </div>
    </div>
  )
}

export default StartInterview