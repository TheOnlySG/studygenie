import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
  AcademicCapIcon,
  ClockIcon,
  FireIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface QuizPageProps {
  onNavigate: (view: string) => void;
}

export function QuizPage({ onNavigate }: QuizPageProps) {
  const quizTypes = [
    {
      title: 'Quick Quiz',
      description: '5 random questions from your recent topics',
      duration: '5 min',
      difficulty: 'Mixed',
      icon: ClockIcon,
      color: 'bg-blue-500',
    },
    {
      title: 'Focus Quiz',
      description: 'Target your weak areas for improvement',
      duration: '10 min',
      difficulty: 'Adaptive',
      icon: FireIcon,
      color: 'bg-red-500',
    },
    {
      title: 'Comprehensive Quiz',
      description: 'Complete assessment across all subjects',
      duration: '20 min',
      difficulty: 'All Levels',
      icon: ChartBarIcon,
      color: 'bg-green-500',
    },
  ];

  const recentQuizzes = [
    {
      subject: 'Computer Science',
      score: 85,
      date: '2 hours ago',
      topics: ['Data Structures', 'Algorithms'],
    },
    {
      subject: 'Mathematics',
      score: 72,
      date: 'Yesterday',
      topics: ['Calculus', 'Linear Algebra'],
    },
    {
      subject: 'Physics',
      score: 91,
      date: '3 days ago',
      topics: ['Mechanics', 'Thermodynamics'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-medium">Quiz Center</h1>
        <p className="text-muted-foreground">
          Test your knowledge and track your progress
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Quiz Types */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Quiz Type</CardTitle>
              <CardDescription>
                Select the type of quiz that matches your study goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quizTypes.map((quiz, index) => {
                const Icon = quiz.icon;
                return (
                  <div
                    key={index}
                    className="border border-border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1 hover:border-primary"
                    onClick={() => console.log('Start quiz:', quiz.title)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${quiz.color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
                        <Icon className={`h-6 w-6 ${quiz.color.replace('bg-', 'text-').replace('-500', '-600')}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium mb-1">{quiz.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {quiz.description}
                            </p>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <ClockIcon className="h-4 w-4" />
                                {quiz.duration}
                              </span>
                              <span>{quiz.difficulty}</span>
                            </div>
                          </div>
                          <Button size="sm">Start Quiz</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Subject-Specific Quizzes */}
          <Card>
            <CardHeader>
              <CardTitle>Subject-Specific Quizzes</CardTitle>
              <CardDescription>
                Focus on specific subjects you're studying
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Computer Science</h3>
                      <p className="text-sm text-muted-foreground">24 topics available</p>
                    </div>
                    <Button variant="outline" size="sm">Take Quiz</Button>
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Mathematics</h3>
                      <p className="text-sm text-muted-foreground">18 topics available</p>
                    </div>
                    <Button variant="outline" size="sm">Take Quiz</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quiz Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AcademicCapIcon className="h-5 w-5" />
                Quiz Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Quizzes</span>
                <span className="font-medium">15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Average Score</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Best Score</span>
                <span className="font-medium">91%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="font-medium">3 quizzes</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Quizzes */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Quizzes</CardTitle>
              <CardDescription>Your quiz history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentQuizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="p-3 border border-border rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{quiz.subject}</h4>
                    <span className={`text-sm font-medium ${
                      quiz.score >= 80 ? 'text-green-600' : 
                      quiz.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {quiz.score}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {quiz.topics.join(', ')}
                  </p>
                  <p className="text-xs text-muted-foreground">{quiz.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Study Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FireIcon className="h-5 w-5 text-orange-500" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm font-medium text-orange-800">Focus on weak areas</p>
                <p className="text-xs text-orange-600 mt-1">
                  Review "Graph Algorithms" before your next quiz
                </p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Keep the streak!</p>
                <p className="text-xs text-blue-600 mt-1">
                  Take a quiz today to maintain your 7-day streak
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}