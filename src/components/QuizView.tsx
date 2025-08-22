import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ArrowLeft, Brain, CheckCircle, XCircle, Trophy, RotateCcw, Target } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useData } from '../contexts/DataContext';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  weakTopics: string[];
  timeSpent: number;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'What is the time complexity of searching in a balanced binary search tree?',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
    correctAnswer: 1,
    explanation: 'In a balanced BST, the height is log n, so search operations take O(log n) time.',
    topic: 'Binary Trees',
    difficulty: 'medium'
  },
  {
    id: '2',
    question: 'Which data structure follows the LIFO (Last In, First Out) principle?',
    options: ['Queue', 'Stack', 'Array', 'Linked List'],
    correctAnswer: 1,
    explanation: 'A stack follows LIFO principle where the last element added is the first one removed.',
    topic: 'Stacks and Queues',
    difficulty: 'easy'
  },
  {
    id: '3',
    question: 'What is the main advantage of using hash tables?',
    options: ['Sorted data', 'Fast search operations', 'Memory efficiency', 'Simple implementation'],
    correctAnswer: 1,
    explanation: 'Hash tables provide O(1) average time complexity for search, insert, and delete operations.',
    topic: 'Hash Tables',
    difficulty: 'medium'
  },
  {
    id: '4',
    question: 'In database normalization, what does the First Normal Form (1NF) ensure?',
    options: ['No partial dependencies', 'Atomic values in each cell', 'No transitive dependencies', 'No redundant data'],
    correctAnswer: 1,
    explanation: '1NF ensures that each table cell contains only atomic (indivisible) values and each record is unique.',
    topic: 'Database Normalization',
    difficulty: 'hard'
  },
  {
    id: '5',
    question: 'Which sorting algorithm has the best average-case time complexity?',
    options: ['Bubble Sort', 'Merge Sort', 'Selection Sort', 'Insertion Sort'],
    correctAnswer: 1,
    explanation: 'Merge Sort has O(n log n) time complexity in all cases, making it one of the most efficient sorting algorithms.',
    topic: 'Sorting Algorithms',
    difficulty: 'medium'
  }
];

export function QuizView({ onBack }: { onBack: () => void }) {
  const { updateUserProgress, generateAdaptiveQuestions, userProgress } = useData();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [startTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [showExplanation, setShowExplanation] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);

  useEffect(() => {
    // Add adaptive questions based on user's weak topics
    const adaptiveQuestions = generateAdaptiveQuestions(userProgress.weakTopics.slice(0, 3));
    const allQuestions = [...mockQuestions, ...adaptiveQuestions];
    setQuestions(allQuestions.slice(0, 10)); // Limit to 10 questions for reasonable quiz length
  }, []);

  useEffect(() => {
    if (!showResult && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleFinishQuiz();
    }
  }, [timeLeft, showResult]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const handleFinishQuiz = () => {
    const correctAnswers = questions.filter(
      q => selectedAnswers[q.id] === q.correctAnswer
    ).length;
    
    const wrongAnswers = questions.filter(
      q => selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== q.correctAnswer
    );
    
    const weakTopics = [...new Set(wrongAnswers.map(q => q.topic))];
    
    const result: QuizResult = {
      score: Math.round((correctAnswers / questions.length) * 100),
      totalQuestions: questions.length,
      correctAnswers,
      weakTopics,
      timeSpent: Math.round((Date.now() - startTime) / 1000)
    };

    // Update user progress with quiz results
    updateUserProgress(result);

    setQuizResult(result);
    setShowResult(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
    setQuizResult(null);
    setTimeLeft(600);
    setShowExplanation(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResult && quizResult) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Button variant="ghost" onClick={onBack} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center text-2xl">
                <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
                Quiz Complete!
              </CardTitle>
              <CardDescription>
                Here's how you performed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score Overview */}
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {quizResult.score}%
                </div>
                <p className="text-muted-foreground">
                  {quizResult.correctAnswers} out of {quizResult.totalQuestions} questions correct
                </p>
              </div>

              {/* Progress Ring */}
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - quizResult.score / 100)}`}
                      className="text-blue-600"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-semibold">{quizResult.score}%</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="mx-auto h-8 w-8 text-green-600 mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      {quizResult.correctAnswers}
                    </div>
                    <p className="text-sm text-muted-foreground">Correct</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <XCircle className="mx-auto h-8 w-8 text-red-600 mb-2" />
                    <div className="text-2xl font-bold text-red-600">
                      {quizResult.totalQuestions - quizResult.correctAnswers}
                    </div>
                    <p className="text-sm text-muted-foreground">Incorrect</p>
                  </CardContent>
                </Card>
              </div>

              {/* Weak Topics */}
              {quizResult.weakTopics.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-600">
                      <Target className="mr-2 h-5 w-5" />
                      Areas for Improvement
                    </CardTitle>
                    <CardDescription>
                      Focus on these topics to improve your understanding
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {quizResult.weakTopics.map((topic, index) => (
                        <Badge key={index} variant="destructive">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Performance Badge */}
              <div className="text-center">
                {quizResult.score >= 90 && (
                  <Badge className="bg-green-100 text-green-800 text-lg py-2 px-4">
                    🎉 Excellent Performance!
                  </Badge>
                )}
                {quizResult.score >= 70 && quizResult.score < 90 && (
                  <Badge className="bg-blue-100 text-blue-800 text-lg py-2 px-4">
                    👍 Good Job!
                  </Badge>
                )}
                {quizResult.score >= 50 && quizResult.score < 70 && (
                  <Badge className="bg-yellow-100 text-yellow-800 text-lg py-2 px-4">
                    📚 Keep Studying!
                  </Badge>
                )}
                {quizResult.score < 50 && (
                  <Badge className="bg-red-100 text-red-800 text-lg py-2 px-4">
                    💪 More Practice Needed
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button onClick={handleRestartQuiz} variant="outline" className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Quiz
                </Button>
                <Button onClick={onBack} className="flex-1">
                  Continue Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl mb-2">Adaptive Quiz</h1>
              <p className="text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Time Remaining</div>
              <div className={`text-lg font-mono ${timeLeft < 60 ? 'text-red-600' : ''}`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant={
                currentQuestion.difficulty === 'easy' ? 'default' :
                currentQuestion.difficulty === 'medium' ? 'secondary' : 'destructive'
              }>
                {currentQuestion.difficulty.toUpperCase()}
              </Badge>
              <Badge variant="outline">{currentQuestion.topic}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg mb-4">{currentQuestion.question}</h3>
              
              <RadioGroup
                value={selectedAnswers[currentQuestion.id]?.toString() || ''}
                onValueChange={(value) => handleAnswerSelect(parseInt(value))}
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`option-${index}`}
                      disabled={showExplanation}
                    />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className={`flex-1 cursor-pointer p-3 rounded-lg border transition-colors ${
                        selectedAnswers[currentQuestion.id] === index 
                          ? 'bg-blue-50 border-blue-500' 
                          : 'hover:bg-gray-50'
                      } ${
                        showExplanation 
                          ? index === currentQuestion.correctAnswer 
                            ? 'bg-green-50 border-green-500' 
                            : selectedAnswers[currentQuestion.id] === index && index !== currentQuestion.correctAnswer
                              ? 'bg-red-50 border-red-500'
                              : ''
                          : ''
                      }`}
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
                <p className="text-blue-800">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              
              <div className="flex gap-2">
                {selectedAnswers[currentQuestion.id] !== undefined && !showExplanation && (
                  <Button 
                    variant="outline"
                    onClick={() => setShowExplanation(true)}
                  >
                    Show Answer
                  </Button>
                )}
                
                <Button 
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestion.id] === undefined}
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}