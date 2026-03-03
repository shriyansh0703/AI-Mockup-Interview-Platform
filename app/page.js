"use client";

import { Button } from "@/components/ui/button";
import Logo from "./_components/Logo";
import { useRouter } from "next/navigation";
import Footer from "./_components/Footer";
import { supabase } from "@/utils/supabaseClient";
import { useEffect } from "react";
import Typewriter from "typewriter-effect";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      if (!supabase) return;
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        router.replace("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  const handleGoogleSignIn = async () => {
    if (!supabase) {
      console.error("Supabase client not initialized. Please check environment variables.");
      return;
    }
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams: {
          prompt: "select_account",
        },
      },
    });
    if (error) {
      console.error(error);
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-white relative overflow-hidden">
       <header className="relative z-10 px-6 py-6 -mt-20">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
              onClick={() => router.push('/premium')}
            >
              Go Premium
            </Button>
          </div>
        </nav>
      </header>
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <main className="relative -mt-20 z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center space-y-8 mb-16">
     <div className="ml-35">     
  <h1 className="text-4xl lg:text-7xl font-extrabold leading-tight flex items-center gap-2">
  <span className=" text-purple-600 bg-clip-text flex items-center">
    <Typewriter
      options={{
        strings: ["Ace DSA Round", "Ace Interviews"],
        autoStart: true,
        loop: true,
        delay: 70,
        deleteSpeed: 50,
      }}
    />
  </span>
  <span className="text-3xl lg:text-7xl text-slate-800 flex items-center">
    with DevDrill
  </span>
</h1>
</div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-xl text-slate-600 leading-relaxed">
              Revolutionize your interview preparation with our comprehensive platform that combines cutting-edge AI technology with proven learning methodologies. Whether you're a fresh graduate or an experienced professional looking to level up, we provide the tools and insights you need to succeed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGoogleSignIn}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Begin Your Journey - It's Free
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg rounded-xl transition-all duration-200"
              onClick={() => router.push('/learn-more')}
            >
              Explore Features
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                1
              </div>
              
              <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border-l-4 border-purple-500">
                <div className="bg-slate-800 px-6 py-4 border-b border-slate-700">
                  <div className="flex justify-between items-center">
                    <h3 className="text-purple-300 font-semibold">DSA Coding Round</h3>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                      In Progress
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-purple-400 text-sm mb-4">Problem: Two Sum</div>
                  <div className="font-mono text-sm space-y-2">
                    <div className="text-blue-300">function twoSum(nums, target) {`{`}</div>
                    <div className="text-gray-400 ml-6">const map = new Map();</div>
                    <div className="text-gray-400 ml-6">for (let i = 0; i &lt; nums.length; i++) {`{`}</div>
                    <div className="text-gray-400 ml-12 bg-purple-900/50 px-3 py-2 rounded border-l-2 border-purple-400">
                      // Type your solution here...
                    </div>
                    <div className="text-gray-400 ml-6">{`}`}</div>
                    <div className="text-blue-300">{`}`}</div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-700">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="flex items-center text-green-400 text-sm">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          Test Case 1: Passed
                        </div>
                        <div className="flex items-center text-green-400 text-sm">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          Test Case 2: Passed
                        </div>
                        <div className="flex items-center text-yellow-400 text-sm">
                          <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Running Test 3...
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-400 text-sm">Time: 04:32</div>
                        <div className="text-slate-400 text-sm">Attempts: 3</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                2
              </div>
              
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-l-4 border-indigo-500">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
                  <div className="flex justify-between items-center">
                    <h3 className="text-indigo-700 font-semibold">AI Mock Interview</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-600 text-sm font-medium">Recording</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-700 mb-2">AI Interviewer</div>
                      <div className="bg-gray-50 rounded-xl p-4 text-slate-700">
                        "How would you differentiate useState from useEffect and also tell the example usecase of each component?"
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-700 mb-2">You</div>
                      <div className="border-2 border-dashed border-indigo-200 rounded-xl p-4 bg-indigo-50/30 flex items-center space-x-3">
                        <svg className="w-6 h-6 text-indigo-600 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3z"/>
                          <path d="M19 10v1a7 7 0 01-14 0v-1"/>
                        </svg>
                        <span className="text-indigo-600 font-medium">Recording your response...</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 border border-emerald-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="font-semibold text-emerald-700">Real-time Analysis</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-slate-600">Communication: Clear</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-slate-600">Technical Knowledge</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span className="text-sm text-slate-600">Add More Examples</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-slate-600">Analyzing Confidence</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="mt-24 relative">
          <div className="relative z-10 text-center space-y-12 py-16 px-8">
            <div className="space-y-6">
             
              
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-slate-800 bg-clip-text text-transparent leading-tight">
                Trusted by Candidates at<br/>
                <span className="text-purple-600">World's Leading Tech Companies</span>
              </h2>
              
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Our comprehensive preparation methodology has empowered <span className="font-semibold text-purple-600">many</span> professionals to secure positions at prestigious technology companies. From algorithmic challenges to behavioral assessments, we cover every aspect of the modern tech interview process.
              </p>
            </div>
            </div>
            </div>

        <div className="space-y-8">
              <div className="flex justify-center items-center gap-12 lg:gap-20 flex-wrap py-8">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-110 border border-purple-100/50">
                    <img src="/meta-icon-new-facebook-2021-logo-png_seeklogo-424014.png" alt="Meta" width="70" height="70" className="transition-all duration-500" />
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-400/20 to-gray-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-110 border border-purple-100/50">
                    <img src="/432495.webp" alt="Apple" width="70" height="70" className="transition-all duration-500" />
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-110 border border-purple-100/50">
                    <img src="/Amazon-Logo-Transparent-PNG.png" alt="Amazon" width="70" height="70" className=" transition-all duration-500" />
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-110 border border-purple-100/50">
                    <img src="/netflix_PNG22.png" alt="Netflix" width="70" height="70" className="transition-all duration-500" />
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-110 border border-purple-100/50">
                    <img src="/google-logo-on-transparent-white-background-free-vector-removebg-preview.png" alt="Google" width="70" height="70" className=" transition-all duration-500" />
                  </div>
                </div>
              </div>
              
             
              </div>
      </main>

      <Footer />
    </div>
  );
}