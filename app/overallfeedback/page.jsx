"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import StarRating from '@/components/ui/StarRating';

function OverallFeedback() {
    const [rating, setRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');

    const router = useRouter();

    const handleSubmit = () => {
        console.log('Rating:', rating);
        console.log('Feedback:', feedbackText);
        router.replace('/dashboard');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div>
                <h2 className="text-3xl font-extrabold text-green-600 text-center md:text-left">Interview Completed!!</h2>
                <h3 className="text-xl font-semibold mt-4 text-center md:text-left text-gray-800">We'd love your feedback!</h3>

                <div className="mt-6">
                    <label className="block text-gray-700 font-medium text-lg mb-2">How would you rate your interview experience?</label>
                    <StarRating value={rating} onChange={(val) => setRating(val)} />
                </div>

                <div className="mt-6">
                    <label className="block text-gray-700 font-medium text-lg mb-2">Share your thoughts</label>
                    <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Your feedback helps us improve..."
                        className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        rows={5}
                    />
                </div>

                <div className="mt-8">
                    <Button onClick={handleSubmit} className="bg-purple-700 hover:bg-purple-800 transition-colors duration-200">
                        Submit Feedback
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <img
                    src="/Feedback-cuate.png"
                    alt="Feedback Illustration"
                    className="w-150 h-auto mt-10"
                />
            </div>
        </div>
    );
}

export default OverallFeedback;