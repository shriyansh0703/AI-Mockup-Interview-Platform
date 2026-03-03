"use client"
import { Button } from '@/components/ui/button';
import React from 'react';
import Logo from '../_components/Logo';
import { useRouter } from "next/navigation";

function Premium() {
    const router = useRouter();
  return (
    <div className="h-screen overflow-hidden">
      <div className="h-20 flex justify-between items-center shadow-md bg-white px-6 z-10">
        <Logo />
      </div>
    
      <div className='bg-white p-5'>
        <div className="text-center text-3xl font-bold text-purple-700 my-2">Our Plans</div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 h-screen overflow-hidden bg-gray-100 p-10">
        
        <div className="p-12 bg-white rounded-3xl border mb-50 border-white text-center w-full md:w-1/3">
          <div className="text-2xl font-semibold text-gray-700 mb-2">₹0 / month</div>
          <h2 className="text-4xl font-bold text-purple-700 mb-6">Free Plan</h2>
          <ul className="text-lg text-gray-700 space-y-4 mb-8">
            <li>✔ Basic Interview Preparation</li>
            <li>✔ Limited AI Feedback</li>
            <li>✔ Access to General Questions</li>
            <li>✔ Standard Video Quality</li>
          </ul>
          <Button className="bg-gray-400 text-white px-8 py-4 rounded-lg cursor-not-allowed" disabled>
            Current Plan
          </Button>
        </div>
        
        <img src="/Personal goals-pana.png" alt="Premium Plan Illustration" className="mb-50 w-1/3 hidden md:block" />
        
        <div className="p-12 bg-purple-600 text-white shadow-xl mb-50 rounded-3xl border border-purple-700 text-center w-full md:w-1/3">
          <div className="text-2xl font-semibold text-white mb-2">₹499 / month</div>
          <h2 className="text-4xl font-bold mb-6">Premium Plan</h2>
          <ul className="text-lg space-y-4 mb-8">
            <li>⭐ Advanced AI Feedback</li>
            <li>⭐ Personalized Interview Questions</li>
            <li>⭐ High-Quality Video Recording</li>
            <li>⭐ Priority Customer Support</li>
          </ul>
          <Button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-200">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Premium;
