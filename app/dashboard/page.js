"use client"
import React, { useEffect, useState } from 'react'
import AddNewInterview from './_components/AddNewInterview'
import Logo from '../_components/Logo'
import { Button } from '@/components/ui/button'
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import DSAPractice from './_components/DSAPractice'
import Image from 'next/image';


function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showDSAPractice, setShowDSAPractice] = useState(false);

  useEffect(() => {
    const ensureAuthenticated = async () => {
      if (!supabase) {
        console.error("Supabase client not initialized. Please check environment variables.");
        return;
      }
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        router.replace("/");
      }
      setLoading(false);
    };
    ensureAuthenticated();
  }, [router]);

  const handleSignOut = async () => {
    if (!supabase) {
      console.error("Supabase client not initialized. Please check environment variables.");
      return;
    }
    await supabase.auth.signOut();
    router.replace("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="bg-white/80 backdrop-blur-lg border-b border-purple-100 shadow-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 ml-8 scale-310">
                  <Image 
                    src="/Blue_Modern_Technology_and_Software_Company_Logo-removebg-preview.png"  
                    alt="AI Mock Interview Logo" 
                    width={50} 
                    height={50} 
                  />
                </div>
            <div className="flex items-center gap-3">
              {showDSAPractice && (
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 py-1.5 px-3"
                  onClick={() => setShowDSAPractice(false)}
                >
                  Back to Dashboard
                </Button>
              )}
              <Button
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 py-1.5 px-4"
                onClick={() => router.push('/premium')}
              >
                Premium
              </Button>
              <Button
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 py-1.5 px-3"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-purple-700 font-medium">Loading...</span>
            </div>
          </div>
        ) : showDSAPractice ? (
          <DSAPractice />
        ) : (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Welcome to your{' '}
                <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Enhance your interview skills with AI-powered mock interviews and strengthen your coding abilities with DSA practice
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-purple-100 hover:border-purple-200">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-purple-800/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Mock Interview</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Practice with AI-powered mock interviews tailored to your target role. Get instant feedback and improve your performance.
                  </p>
                  <div className="space-y-4">
                    <AddNewInterview />
                  </div>
                </div>
              </div>

              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-purple-100 hover:border-purple-200">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-purple-800/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
                    Sharpen your coding skills with comprehensive Data Structures and Algorithms practice sessions and challenges.
                  </h3>
                  <Button
                    onClick={() => setShowDSAPractice(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                  >
                    Start DSA Practice
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-purple-100 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">AI-Powered</h4>
                  <p className="text-gray-600 text-sm">Advanced AI technology for realistic interview simulation</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Instant Feedback</h4>
                  <p className="text-gray-600 text-sm">Get immediate insights to improve your performance</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Track Progress</h4>
                  <p className="text-gray-600 text-sm">Monitor your improvement over time</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default page