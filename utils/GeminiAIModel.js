const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const fs = typeof window === "undefined" ? require("fs") : null;

  
  // Hardcoded Gemini API key for Vercel deployment
  const apiKey = "AIzaSyABE8zYB2G8QijFpqczfjPWFI0d24WejMQ";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
  };



    export const chatSession = model.startChat({
      generationConfig,
      
    });
  
    
  