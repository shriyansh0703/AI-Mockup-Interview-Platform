"use client"
import React, { use, useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import { UserAnswer } from '@/utils/schema';
import moment from 'moment';
import { db } from '@/utils/db';

function RecordAnswerSection({ mockIntvQues, activeQuestionIndex, interviewData }) {
  const [loading,setLoading]=useState(false);

  const [userResponse,setUserResponse] = useState("");

  // feedback and rating
  const [feedback,setFeedback] = useState("");
  const [rating,setRating] = useState(null);
  

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    if (results.length > 0) {
      const latest = results[results.length - 1];
      setUserResponse(latest?.transcript || "");
    }
  },[results])

  useEffect(() => {
    setUserResponse('');
    setFeedback('');
    setRating(null);
  }, [activeQuestionIndex]);


  const StartStopRecording=async()=>{
    if(isRecording){
      stopSpeechToText()
      toast("Recording Stopped, Click 'Evaluate Response' to get feedback")


    }
    else{
      setUserResponse("");
      setFeedback("");
      setRating(null);
      startSpeechToText();
    }

  } 
  const UpdateUserAnswer=async()=>{
    console.log(userResponse)
    console.log("mockIdRef:", interviewData?.mockId);
    setLoading(true)
    const feedbackPrompt = "Question:" + mockIntvQues[activeQuestionIndex]?.Question +
      "User Answer:" +userResponse+ "Depends on question and user response for given interview question"+
      "please give us rating for answer in numbers out of 10 and feedback at area of improvement in just 2-3 lines.";

      const result=await chatSession.sendMessage(feedbackPrompt);

      const aiResponse = await result.response.text();
      console.log("Raw AI Response:", aiResponse);

      // Extract rating
      const ratingMatch = aiResponse.match(/\*\*Rating:\*\*\s*(\d{1,2})\/10/i);
      const extractedRating = ratingMatch ? parseInt(ratingMatch[1]) : null;


        // Extract feedback
        const feedbackMatch = aiResponse.match(/Feedback.*?:\s*\n*([\s\S]*)/i);
        let extractedFeedback = feedbackMatch ? feedbackMatch[1].trim() : "No feedback found.";
        
        extractedFeedback = extractedFeedback.replace(/\*\*/g, '');

      setFeedback(extractedFeedback);
      setRating(extractedRating);
      setUserResponse('');
      setLoading(false);

  }

  return (
    <div className='flex items-center justify-center mb-20 flex-col'>
        <div className ="flex flex-col w-100 justify-center items-center bg-black rounded-lg p-5">
            <Image src={'/webcam-2.png'} width={200} height={200} className='absolute'/>
            <Webcam
            mirrored={true}
            style={{
                height:300,width:'100%',zIndex:10
            }}/>
        </div>
        <Button 
        disabled={loading}
        variant="outline" className="my-10 mt-5 mb-5 border border-purple-700 text-purple-700 hover:bg-purple-200"
          onClick={StartStopRecording}
        >
          {isRecording ?
          <h2 className='text-red-700 flex gap-2'>
            <Mic/> Stop Recording Response
          </h2>
        :
        "Record Response"}</Button>
       <Button className="bg-purple-700 hover:bg-purple-900" onClick={()=> {
        if(userResponse.length<6){
          toast.error("Please record a valid answer before evaluating.");
        }
        else{
          UpdateUserAnswer();
        }
       }

       }
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Evaluating you Answer...
            </span>
          ) : (
            "Evaluate Response"
          )}
        </Button>
       {feedback&&(
        <div className='mt-6 p-4 ml-10 bg-gray-100 rounded-lg shadow-md w-full max-w-xl text-left'>
            <h3 className='text-lg font-semibold mb-2'>Evaluation Results: </h3>
            <p className="mb-2"><strong>Rating:</strong> {rating} / 10</p>
            <p><strong>AI Feedback:</strong> {feedback}</p>
        </div>
       )
       }
    </div>
    
  )
}

export default RecordAnswerSection
