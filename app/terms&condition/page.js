"use client";

import Logo from "@/app/_components/Logo";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function TermsAndConditions() {
    const router = useRouter();
    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-20 flex justify-between items-center  bg-white px-6 z-10">
                <Logo />
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg" onClick={() => router.push('/')}>
                    Back to Home
                </Button>
            </div>

            <div className="flex-grow flex flex-row items-center p-10 max-w-6xl mx-auto text-gray-700">
                {/* Left Content */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-purple-600 mb-6">Terms & Conditions</h2>
                    <p className="mb-4">
                        Welcome to AI Mock Interview Platform! By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please do not use our services.
                    </p>

                    <h3 className="text-xl font-semibold text-purple-600 mt-6">1. Use of Services</h3>
                    <p className="mb-4">You must be at least 18 years old to use our services. You agree to use our platform only for lawful purposes and in accordance with these terms.</p>

                    <h3 className="text-xl font-semibold text-purple-600 mt-6">2. Account Registration</h3>
                    <p className="mb-4">When creating an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.</p>

                    <h3 className="text-xl font-semibold text-purple-600 mt-6">3. Intellectual Property</h3>
                    <p className="mb-4">All content on this platform, including text, graphics, and software, is owned by AI Mock Interview Platform and is protected by copyright laws.</p>

                    <h3 className="text-xl font-semibold text-purple-600 mt-6">4. Limitation of Liability</h3>
                    <p className="mb-4">We do not guarantee the accuracy or effectiveness of the interview preparation materials. Use our services at your own risk.</p>

                    <h3 className="text-xl font-semibold text-purple-600 mt-6">5. Termination</h3>
                    <p className="mb-4">We reserve the right to terminate or suspend your account if you violate these terms.</p>

                    <h3 className="text-xl font-semibold text-purple-600 mt-6">6. Changes to Terms</h3>
                    <p className="mb-4">We may update these terms at any time. Continued use of our services constitutes acceptance of the revised terms.</p>
                </div>

                {/* Right Illustration */}
                <div className="flex-1 flex justify-center items-center">
                    <img src="/Reading list-rafiki.png" alt="Terms and Conditions Illustration" className="ml-30 mb-30" />
                </div>
            </div>
        </div>
    );
}
