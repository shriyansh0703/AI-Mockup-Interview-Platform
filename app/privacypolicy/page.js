"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Logo from "@/app/_components/Logo";

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="h-screen overflow-hidden flex flex-col text-gray-800">
      
      <div className="h-20 flex justify-between items-center -md z-10">
        <Logo />
        <Button className="bg-purple-600 hover:bg-purple-700 mr-6 text-white px-4 py-2 rounded-lg" onClick={() => router.push('/')}>Back to Home</Button>
      </div>
      
      
      <div className="flex-grow container mx-auto px-6 py-12 flex">
        <div className="w-1/2 pr-8">
          <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-left">Privacy & Policy</h1>
          
            <h2 className="text-2xl font-bold text-purple-600 mb-4">1. Introduction</h2>
            <p>Welcome to our AI-powered mock interview platform. Your privacy is important to us, and this policy outlines how we collect, use, and protect your information.</p>
            
            <h2 className="text-2xl font-bold text-purple-600 mt-6 mb-4">2. Information We Collect</h2>
            <ul className="list-disc pl-6">
              <li>Personal details (name, email, etc.) provided during registration.</li>
              <li>Usage data such as interview responses and performance analytics.</li>
              <li>Cookies and tracking data for user experience improvements.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-purple-600 mt-6 mb-4">3. How We Use Your Information</h2>
            <p>We use your data to enhance your experience, provide insights, and improve our platform. We do not share your personal data with third parties without your consent.</p>
            
            <h2 className="text-2xl font-bold text-purple-600 mt-6 mb-4">4. Security Measures</h2>
            <p>We implement industry-standard security practices to keep your data safe from unauthorized access.</p>
            
            <h2 className="text-2xl font-bold text-purple-600 mt-6 mb-4">5. Your Rights</h2>
            <p>You have the right to access, update, or delete your data. Contact us if you wish to exercise these rights.</p>
        </div>

        <div className="w-1/2 flex justify-center items-center">
          <img 
            src="/Authentication-rafiki.png" 
            alt="Privacy Policy" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}
