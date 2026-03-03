"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Code, Brain, Clock, Zap } from 'lucide-react';

const DSAPractice = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [userTimeComplexity, setUserTimeComplexity] = useState({});
  const [userSpaceComplexity, setUserSpaceComplexity] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [questionSource, setQuestionSource] = useState('');
  const [warning, setWarning] = useState('');
  const [savedAnswers, setSavedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  const generateQuestions = async () => {
   
    if (questions.length > 0) {
      const hasWork = Object.keys(userAnswers).length > 0 || 
                     Object.keys(savedAnswers).length > 0 || 
                     Object.keys(submittedAnswers).length > 0;
      
      if (hasWork) {
        const confirmed = window.confirm(
          'Generating new questions will clear all your current work (answers, evaluations, etc.). Are you sure you want to continue?'
        );
        if (!confirmed) {
          return;
        }
      }
    }
    
    setLoading(true);
    
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setUserTimeComplexity({});
    setUserSpaceComplexity({});
    setEvaluations({});
    setShowResults(false);
    setSavedAnswers({});
    setSubmittedAnswers({});
    setQuestionSource('');
    setWarning('');
    
    try {
      const response = await fetch('/api/dsa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generateQuestions',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setQuestions(data.questions);
        setQuestionSource(data.source || 'ai');
        setWarning(data.warning || '');
      } else {
        console.error('Failed to generate questions:', data.error);
     
        alert('Failed to generate questions. Please try again.');
      }
    } catch (error) {
      console.error('Error generating questions:', error);
     
      alert('Error generating questions. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const evaluateAnswer = async (questionId) => {
    const question = questions.find(q => q.id === questionId);
    const userAnswer = userAnswers[questionId];
    const timeComplexity = userTimeComplexity[questionId];
    const spaceComplexity = userSpaceComplexity[questionId];

    if (!userAnswer || !timeComplexity || !spaceComplexity) {
      alert('Please provide answer, time complexity, and space complexity');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/dsa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'evaluateAnswer',
          data: {
            question,
            userAnswer,
            userTimeComplexity: timeComplexity,
            userSpaceComplexity: spaceComplexity,
          },
        }),
      });

      const data = await response.json();
      if (data.success) {
        setEvaluations(prev => ({
          ...prev,
          [questionId]: data.evaluation,
        }));
        setWarning(data.warning || '');
      } else {
        console.error('Failed to evaluate answer:', data.error);
      }
    } catch (error) {
      console.error('Error evaluating answer:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const saveAnswer = (questionId) => {
    const answer = userAnswers[questionId];
    const timeComplexity = userTimeComplexity[questionId];
    const spaceComplexity = userSpaceComplexity[questionId];
    
    if (answer && timeComplexity && spaceComplexity) {
      setSavedAnswers(prev => ({
        ...prev,
        [questionId]: {
          answer,
          timeComplexity,
          spaceComplexity,
          timestamp: new Date().toLocaleString()
        }
      }));
      
      // Show success message
      alert('Answer saved successfully!');
    } else {
      alert('Please provide answer, time complexity, and space complexity before saving.');
    }
  };

  const submitAnswer = async (questionId) => {
    const question = questions.find(q => q.id === questionId);
    const userAnswer = userAnswers[questionId];
    const timeComplexity = userTimeComplexity[questionId];
    const spaceComplexity = userSpaceComplexity[questionId];

    if (!userAnswer || !timeComplexity || !spaceComplexity) {
      alert('Please provide answer, time complexity, and space complexity before submitting.');
      return;
    }

    // Mark as submitted
    setSubmittedAnswers(prev => ({
      ...prev,
      [questionId]: {
        answer: userAnswer,
        timeComplexity,
        spaceComplexity,
        timestamp: new Date().toLocaleString()
      }
    }));

    // Evaluate the answer
    await evaluateAnswer(questionId);
  };

  const submitAllAnswers = async () => {
    for (const question of questions) {
      if (!evaluations[question.id]) {
        await evaluateAnswer(question.id);
      }
    }
    setShowResults(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 min-h-screen">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-6 w-6 text-purple-600" />
            DSA Practice
          </CardTitle>
          <CardDescription>
            Practice Data Structures and Algorithms questions with AI-powered evaluation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Warning Banner for Fallback Mode */}
          {warning && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-yellow-800 text-sm font-medium">{warning}</span>
              </div>
            </div>
          )}
          
                     {questions.length === 0 ? (
             <div className="text-center py-8">
               <Brain className="h-16 w-16 text-purple-400 mx-auto mb-4" />
               <h3 className="text-lg font-semibold mb-2">
                 {loading ? 'Generating Questions...' : 'Ready to practice DSA?'}
               </h3>
               <p className="text-gray-600 mb-4">
                 {loading ? 'Please wait while we prepare fresh questions for you...' : 'Get 5 random DSA questions covering various concepts and difficulty levels'}
                 {questionSource === 'fallback' && !loading && (
                   <span className="block text-sm text-yellow-600 mt-2">
                     Currently using predefined questions due to API limits
                   </span>
                 )}
               </p>
               <Button 
                 onClick={generateQuestions} 
                 disabled={loading}
                 className="bg-purple-600 hover:bg-purple-700"
               >
                 {loading ? (
                   <>
                     <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                     Generating Questions...
                   </>
                 ) : (
                   '🚀 Generate Questions'
                 )}
               </Button>
             </div>
                     ) : (
             <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                             {/* Question Navigation */}
               <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                   {questions.map((_, index) => (
                     <Button
                       key={index}
                       variant={index === currentQuestionIndex ? "default" : "outline"}
                       size="sm"
                       onClick={() => setCurrentQuestionIndex(index)}
                       className={`min-w-[40px] ${index === currentQuestionIndex ? "bg-purple-600" : ""}`}
                     >
                       {index + 1}
                       {savedAnswers[questions[index]?.id] && (
                         <span className="ml-1 text-xs">💾</span>
                       )}
                       {submittedAnswers[questions[index]?.id] && (
                         <span className="ml-1 text-xs">✅</span>
                       )}
                     </Button>
                   ))}
                 </div>
                 <div className="flex gap-2">
                   <Button
                     variant="outline"
                     onClick={prevQuestion}
                     disabled={currentQuestionIndex === 0}
                     size="sm"
                   >
                     ← Previous
                   </Button>
                   <Button
                     variant="outline"
                     onClick={nextQuestion}
                     disabled={currentQuestionIndex === questions.length - 1}
                     size="sm"
                   >
                     Next →
                   </Button>
                 </div>
               </div>
               
               {/* Progress Summary */}
               <div className="bg-gray-50 p-3 rounded-lg">
                 <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
                   <span className="text-gray-600 text-center sm:text-left">
                     Progress: {Object.keys(savedAnswers).length}/{questions.length} saved, {Object.keys(submittedAnswers).length}/{questions.length} submitted
                   </span>
                   <div className="flex gap-2">
                     <span className="text-green-600">💾 Saved</span>
                     <span className="text-blue-600">✅ Submitted</span>
                   </div>
                 </div>
               </div>

              {/* Current Question */}
              {currentQuestion && (
                <Card>
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
                        <Badge className={`mt-2 ${getDifficultyColor(currentQuestion.difficulty)}`}>
                          {currentQuestion.difficulty}
                        </Badge>
                      </div>
                      <div className="text-left lg:text-right text-sm text-gray-600 min-w-[200px]">
                        <div className="flex items-center gap-1 mb-1">
                          <Clock className="h-4 w-4" />
                          Expected: {currentQuestion.expectedTimeComplexity}
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4" />
                          Expected: {currentQuestion.expectedSpaceComplexity}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Problem Statement:</h4>
                      <p className="text-gray-700">{currentQuestion.problem}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Example:</h4>
                      <div className="bg-gray-50 p-3 rounded">
                        <p><strong>Input:</strong> {currentQuestion.example.input}</p>
                        <p><strong>Output:</strong> {currentQuestion.example.output}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Your Solution:</h4>
                      <Textarea
                        placeholder="Write your solution here..."
                        value={userAnswers[currentQuestion.id] || ''}
                        onChange={(e) => setUserAnswers(prev => ({
                          ...prev,
                          [currentQuestion.id]: e.target.value
                        }))}
                        rows={6}
                        className="font-mono"
                      />
                    </div>

                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-medium mb-2">
                           Time Complexity:
                         </label>
                         <Input
                           placeholder="e.g., O(n), O(n²)"
                           value={userTimeComplexity[currentQuestion.id] || ''}
                           onChange={(e) => setUserTimeComplexity(prev => ({
                             ...prev,
                             [currentQuestion.id]: e.target.value
                           }))}
                         />
                       </div>
                       <div>
                         <label className="block text-sm font-medium mb-2">
                           Space Complexity:
                         </label>
                         <Input
                           placeholder="e.g., O(1), O(n)"
                           value={userSpaceComplexity[currentQuestion.id] || ''}
                           onChange={(e) => setUserSpaceComplexity(prev => ({
                             ...prev,
                             [currentQuestion.id]: e.target.value
                           }))}
                         />
                       </div>
                     </div>

                                         <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                       <div className="flex flex-col sm:flex-row gap-2 flex-1">
                         <Button
                           onClick={() => saveAnswer(currentQuestion.id)}
                           disabled={!userAnswers[currentQuestion.id] || !userTimeComplexity[currentQuestion.id] || !userSpaceComplexity[currentQuestion.id]}
                           variant="outline"
                           className="border-green-600 text-green-600 hover:bg-green-50"
                         >
                           💾 Save Answer
                         </Button>
                         
                         <Button
                           onClick={() => submitAnswer(currentQuestion.id)}
                           disabled={loading || !userAnswers[currentQuestion.id] || !userTimeComplexity[currentQuestion.id] || !userSpaceComplexity[currentQuestion.id]}
                           className="bg-purple-600 hover:bg-purple-700"
                         >
                           {loading ? (
                             <>
                               <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                               Evaluating...
                             </>
                           ) : (
                             'Submit & Evaluate'
                           )}
                         </Button>
                       </div>
                       
                       {/* Status Indicators */}
                       <div className="flex gap-2 flex-wrap">
                         {savedAnswers[currentQuestion.id] && (
                           <Badge className="bg-green-100 text-green-800 text-xs">
                             💾 Saved
                           </Badge>
                         )}
                         {submittedAnswers[currentQuestion.id] && (
                           <Badge className="bg-blue-100 text-blue-800 text-xs">
                             ✅ Submitted
                           </Badge>
                         )}
                       </div>
                     </div>

                    {/* Evaluation Result */}
                    {evaluations[currentQuestion.id] && (
                      <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                          <CardTitle className="text-lg">Evaluation Result</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">Score:</span>
                              <Badge className="bg-blue-600">
                                {evaluations[currentQuestion.id].correctnessScore}/100
                              </Badge>
                            </div>
                            
                            <div>
                              <span className="font-semibold">Time Complexity: </span>
                              <Badge className={evaluations[currentQuestion.id].timeComplexityCorrect ? "bg-green-600" : "bg-red-600"}>
                                {evaluations[currentQuestion.id].timeComplexityCorrect ? "Correct" : "Incorrect"}
                              </Badge>
                              <p className="text-sm text-gray-600 mt-1">
                                {evaluations[currentQuestion.id].timeComplexityFeedback}
                              </p>
                            </div>

                            <div>
                              <span className="font-semibold">Space Complexity: </span>
                              <Badge className={evaluations[currentQuestion.id].spaceComplexityCorrect ? "bg-green-600" : "bg-red-600"}>
                                {evaluations[currentQuestion.id].spaceComplexityCorrect ? "Correct" : "Incorrect"}
                              </Badge>
                              <p className="text-sm text-gray-600 mt-1">
                                {evaluations[currentQuestion.id].spaceComplexityFeedback}
                              </p>
                            </div>

                            <div>
                              <span className="font-semibold">Overall Feedback:</span>
                              <p className="text-sm text-gray-600 mt-1">
                                {evaluations[currentQuestion.id].overallFeedback}
                              </p>
                            </div>

                            {evaluations[currentQuestion.id].suggestions.length > 0 && (
                              <div>
                                <span className="font-semibold">Suggestions:</span>
                                <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                                  {evaluations[currentQuestion.id].suggestions.map((suggestion, index) => (
                                    <li key={index}>{suggestion}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              )}

                             {/* Final Submit Section */}
               {questions.length > 0 && (
                 <div className="text-center space-y-4">
                   <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                     <h3 className="text-lg font-semibold text-blue-800 mb-2">Final Submission</h3>
                     <p className="text-blue-600 text-sm mb-3">
                       Review all your answers before final submission. You can still edit answers until you submit.
                     </p>
                                           <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                          onClick={submitAllAnswers}
                          disabled={loading || Object.keys(evaluations).length === questions.length}
                          className="bg-green-600 hover:bg-green-700"
                          size="lg"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Processing All Answers...
                            </>
                          ) : (
                            '🚀 Submit All Answers'
                          )}
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={() => {
                            // Scroll to first unanswered question
                            const firstUnanswered = questions.findIndex(q => !evaluations[q.id]);
                            if (firstUnanswered !== -1) {
                              setCurrentQuestionIndex(firstUnanswered);
                            }
                          }}
                          disabled={Object.keys(evaluations).length === questions.length}
                          size="lg"
                        >
                          📝 Review Unanswered
                        </Button>
                      </div>
                   </div>
                   
                                       {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded text-center">
                        <div className="font-semibold text-gray-800 text-lg">{Object.keys(savedAnswers).length}</div>
                        <div className="text-gray-600">Saved</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded text-center">
                        <div className="font-semibold text-gray-800 text-lg">{Object.keys(submittedAnswers).length}</div>
                        <div className="text-gray-600">Submitted</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded text-center">
                        <div className="font-semibold text-gray-800 text-lg">{Object.keys(evaluations).length}</div>
                        <div className="text-gray-600">Evaluated</div>
                      </div>
                    </div>
                 </div>
               )}

                             {/* New Questions Button */}
               <div className="text-center space-y-3">
                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
                   <Button
                     variant="outline"
                     onClick={generateQuestions}
                     disabled={loading}
                     className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
                   >
                     {loading ? (
                       <>
                         <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                         Generating...
                       </>
                     ) : (
                       '🔄 Generate New Questions'
                     )}
                   </Button>
                   
                   <Button
                     variant="outline"
                     onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                   >
                     ⬆️ Scroll to Top
                   </Button>
                 </div>
               </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DSAPractice;
