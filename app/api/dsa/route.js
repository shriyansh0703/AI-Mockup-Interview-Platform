import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

export async function POST(request) {
  try {
    const { action, data } = await request.json();

    if (action === 'generateQuestions') {
      // Check if we have API key
      if (!apiKey) {
        // Fallback to predefined questions if no API key
        const fallbackQuestions = getFallbackQuestions();
        return NextResponse.json({ success: true, questions: fallbackQuestions, source: 'fallback' });
      }

      try {
        const prompt = `Generate 5 random DSA (Data Structures and Algorithms) questions with varying difficulty levels (easy, medium, hard). 
        For each question, provide:
        1. Problem statement
        2. Example input/output
        3. Expected time complexity
        4. Expected space complexity
        
        Format the response as a JSON array with this structure:
        [
          {
            "id": 1,
            "title": "Question title",
            "problem": "Problem description",
            "example": {
              "input": "Example input",
              "output": "Expected output"
            },
            "difficulty": "easy/medium/hard",
            "expectedTimeComplexity": "O(n)",
            "expectedSpaceComplexity": "O(1)"
          }
        ]
        
        Make sure the questions cover different DSA concepts like arrays, strings, linked lists, trees, graphs, dynamic programming, etc.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Extract JSON from the response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const questions = JSON.parse(jsonMatch[0]);
          return NextResponse.json({ success: true, questions, source: 'ai' });
        } else {
          throw new Error('Failed to parse questions from AI response');
        }
      } catch (aiError) {
        console.log('AI generation failed, using fallback questions:', aiError.message);
        // If AI fails, use fallback questions
        const fallbackQuestions = getFallbackQuestions();
        return NextResponse.json({ 
          success: true, 
          questions: fallbackQuestions, 
          source: 'fallback',
          warning: 'Using predefined questions due to AI service limits'
        });
      }
    }

    if (action === 'evaluateAnswer') {
      const { question, userAnswer, userTimeComplexity, userSpaceComplexity } = data;
      
      // Check if we have API key
      if (!apiKey) {
        // Fallback evaluation without AI
        const evaluation = getFallbackEvaluation(question, userAnswer, userTimeComplexity, userSpaceComplexity);
        return NextResponse.json({ success: true, evaluation, source: 'fallback' });
      }

      try {
        const prompt = `Evaluate this DSA solution:

Question: ${question.problem}
User's Answer: ${userAnswer}
User's Time Complexity: ${userTimeComplexity}
User's Space Complexity: ${userSpaceComplexity}

Expected Time Complexity: ${question.expectedTimeComplexity}
Expected Space Complexity: ${question.expectedSpaceComplexity}

Please evaluate and provide:
1. Correctness score (0-100)
2. Time complexity analysis (correct/incorrect with explanation)
3. Space complexity analysis (correct/incorrect with explanation)
4. Overall feedback and suggestions for improvement

Format as JSON:
{
  "correctnessScore": 85,
  "timeComplexityCorrect": true,
  "timeComplexityFeedback": "Your time complexity is correct because...",
  "spaceComplexityCorrect": false,
  "spaceComplexityFeedback": "Your space complexity is incorrect because...",
  "overallFeedback": "Overall feedback here",
  "suggestions": ["Suggestion 1", "Suggestion 2"]
}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Extract JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const evaluation = JSON.parse(jsonMatch[0]);
          return NextResponse.json({ success: true, evaluation, source: 'ai' });
        } else {
          throw new Error('Failed to parse evaluation from AI response');
        }
      } catch (aiError) {
        console.log('AI evaluation failed, using fallback evaluation:', aiError.message);
        // If AI fails, use fallback evaluation
        const evaluation = getFallbackEvaluation(question, userAnswer, userTimeComplexity, userSpaceComplexity);
        return NextResponse.json({ 
          success: true, 
          evaluation, 
          source: 'fallback',
          warning: 'Using basic evaluation due to AI service limits'
        });
      }
    }

    return NextResponse.json({ success: false, error: 'Invalid action' });
  } catch (error) {
    console.error('DSA API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Fallback questions when AI is not available
function getFallbackQuestions() {
  return [
    {
      id: 1,
      title: "Two Sum",
      problem: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      example: {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]"
      },
      difficulty: "easy",
      expectedTimeComplexity: "O(n)",
      expectedSpaceComplexity: "O(n)"
    },
    {
      id: 2,
      title: "Valid Parentheses",
      problem: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.",
      example: {
        input: "s = '()[]{}'",
        output: "true"
      },
      difficulty: "easy",
      expectedTimeComplexity: "O(n)",
      expectedSpaceComplexity: "O(n)"
    },
    {
      id: 3,
      title: "Maximum Subarray",
      problem: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      example: {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6"
      },
      difficulty: "medium",
      expectedTimeComplexity: "O(n)",
      expectedSpaceComplexity: "O(1)"
    },
    {
      id: 4,
      title: "Binary Tree Inorder Traversal",
      problem: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
      example: {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]"
      },
      difficulty: "medium",
      expectedTimeComplexity: "O(n)",
      expectedSpaceComplexity: "O(n)"
    },
    {
      id: 5,
      title: "Longest Palindromic Substring",
      problem: "Given a string s, return the longest palindromic substring in s.",
      example: {
        input: "s = 'babad'",
        output: "'bab' or 'aba'"
      },
      difficulty: "medium",
      expectedTimeComplexity: "O(n²)",
      expectedSpaceComplexity: "O(1)"
    }
  ];
}

// Fallback evaluation when AI is not available
function getFallbackEvaluation(question, userAnswer, userTimeComplexity, userSpaceComplexity) {
  // Basic evaluation logic
  let correctnessScore = 50; // Base score
  let timeComplexityCorrect = false;
  let spaceComplexityCorrect = false;
  
  // Simple time complexity check
  if (userTimeComplexity && userTimeComplexity.toLowerCase().includes(question.expectedTimeComplexity.toLowerCase())) {
    timeComplexityCorrect = true;
    correctnessScore += 25;
  }
  
  // Simple space complexity check
  if (userSpaceComplexity && userSpaceComplexity.toLowerCase().includes(question.expectedSpaceComplexity.toLowerCase())) {
    spaceComplexityCorrect = true;
    correctnessScore += 25;
  }
  
  // Check if user provided an answer
  if (userAnswer && userAnswer.trim().length > 10) {
    correctnessScore += 10;
  }
  
  // Cap score at 100
  correctnessScore = Math.min(correctnessScore, 100);
  
  return {
    correctnessScore,
    timeComplexityCorrect,
    timeComplexityFeedback: timeComplexityCorrect 
      ? "Your time complexity analysis appears correct!" 
      : `Expected: ${question.expectedTimeComplexity}. Consider analyzing your algorithm's loops and operations.`,
    spaceComplexityCorrect,
    spaceComplexityFeedback: spaceComplexityCorrect 
      ? "Your space complexity analysis appears correct!" 
      : `Expected: ${question.expectedSpaceComplexity}. Consider analyzing your algorithm's memory usage.`,
    overallFeedback: "This is a basic evaluation. For detailed AI feedback, ensure your Gemini API key is configured and within usage limits.",
    suggestions: [
      "Double-check your time complexity analysis",
      "Verify your space complexity reasoning",
      "Consider edge cases in your solution",
      "Practice similar problems to improve"
    ]
  };
}
