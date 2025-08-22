import React from 'react';
import { useData } from '../contexts/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { FileUpload } from './FileUpload';
import {
  AcademicCapIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ClockIcon,
  TrophyIcon,
  FireIcon,
  BookOpenIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface NewDashboardProps {
  onNavigate: (view: string) => void;
}

export function NewDashboard({ onNavigate }: NewDashboardProps) {
  const { subjects, userProgress, loading } = useData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalProgress = subjects.length > 0 ? Math.round(
    subjects.reduce((acc, subject) => acc + subject.progress, 0) / subjects.length
  ) : 0;

  const getWeakTopics = () => {
    const weakTopics: any[] = [];
    subjects.forEach(subject => {
      subject.units.forEach(unit => {
        unit.topics.forEach(topic => {
          if (topic.weakArea) {
            weakTopics.push(topic);
          }
        });
      });
    });
    return weakTopics;
  };

  const quickActions = [
    {
      title: 'Take a Quiz',
      description: 'Test your knowledge with adaptive questions',
      icon: AcademicCapIcon,
      action: () => onNavigate('quiz'),
      color: 'bg-blue-500',
    },
    {
      title: 'Review Notes',
      description: 'Study your personalized notes',
      icon: DocumentTextIcon,
      action: () => onNavigate('notes'),
      color: 'bg-green-500',
    },
    {
      title: 'Study Groups',
      description: 'Join collaborative study sessions',
      icon: UserGroupIcon,
      action: () => onNavigate('groups'),
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-medium">Welcome back!</h1>
        <p className="text-muted-foreground">
          Ready to continue your learning journey?
        </p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpenIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed Topics</p>
                <p className="text-2xl font-medium">{userProgress.completedTopics}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <AcademicCapIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quizzes Taken</p>
                <p className="text-2xl font-medium">{userProgress.quizzesTaken}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrophyIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-medium">{userProgress.averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Study Time</p>
                <p className="text-2xl font-medium">{Math.round(userProgress.totalStudyTime / 3600)}h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* File Upload */}
          <FileUpload />

          {/* Subjects */}
          <Card>
            <CardHeader>
              <CardTitle>Your Subjects</CardTitle>
              <CardDescription>Track progress across all your study subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <div key={subject.id} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{subject.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {subject.completedTopics}/{subject.totalTopics} topics
                      </Badge>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                    <div className="flex flex-wrap gap-2">
                      {subject.units.map((unit) => (
                        unit.topics.map((topic) => (
                          <div key={topic.id} className="group relative">
                            <Badge
                              variant="outline"
                              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                                topic.completed 
                                  ? 'bg-black text-white border-black hover:bg-gray-800' 
                                  : topic.weakArea
                                    ? 'bg-red-500 text-white border-red-500 hover:bg-red-600'
                                    : 'text-red-500 border-red-500 hover:bg-red-50'
                              }`}
                              onClick={() => console.log('Navigate to topic:', topic.name)}
                            >
                              {topic.name}
                            </Badge>
                            {/* Hover Actions */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
                              <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                {topic.completed ? 'Review Notes' : 'Take Quiz'}
                              </div>
                            </div>
                          </div>
                        ))
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <BookOpenIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No subjects yet</h3>
                  <p className="text-muted-foreground mb-4">Upload your first study material to get started!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Jump into your studies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full h-auto p-4 justify-start transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                    onClick={action.action}
                  >
                    <div className={`p-2 rounded-lg mr-3 ${action.color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
                      <Icon className={`h-5 w-5 ${action.color.replace('bg-', 'text-').replace('-500', '-600')}`} />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Focus Areas */}
          {getWeakTopics().length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <FireIcon className="h-5 w-5" />
                  Focus Areas
                </CardTitle>
                <CardDescription>Topics that need more attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getWeakTopics().slice(0, 5).map((topic) => (
                    <div
                      key={topic.id}
                      className="p-3 bg-red-50 border border-red-200 rounded-lg cursor-pointer transition-all duration-200 hover:bg-red-100 hover:shadow-sm"
                      onClick={() => console.log('Navigate to weak topic:', topic.name)}
                    >
                      <p className="text-sm font-medium text-red-800">{topic.name}</p>
                    </div>
                  ))}
                  {getWeakTopics().length === 0 && (
                    <p className="text-sm text-muted-foreground">Great job! No weak areas identified.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Study Streak */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FireIcon className="h-5 w-5 text-orange-500" />
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-medium text-orange-500 mb-2">
                  {userProgress.streakDays}
                </div>
                <p className="text-sm text-muted-foreground">days in a row</p>
                <div className="mt-4 flex justify-center">
                  <div className="flex gap-1">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < userProgress.streakDays 
                            ? 'bg-orange-500' 
                            : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overall Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBarIcon className="h-5 w-5" />
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Completion Rate</span>
                  <span className="font-medium">{totalProgress}%</span>
                </div>
                <Progress value={totalProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Keep going! You're making great progress.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}