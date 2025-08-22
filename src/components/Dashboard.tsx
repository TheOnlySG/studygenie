import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Upload, BookOpen, Brain, Target, TrendingUp, FileText, Users, Calendar } from 'lucide-react';
import { SyllabusUpload } from './SyllabusUpload';
import { NotesView } from './NotesView';
import { QuizView } from './QuizView';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function Dashboard() {
  const { user, logout } = useAuth();
  const { subjects, userProgress, loading } = useData();
  const [currentView, setCurrentView] = useState<'dashboard' | 'upload' | 'notes' | 'quiz'>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

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

  const totalProgress = subjects.length > 0 ? Math.round(
    subjects.reduce((acc, subject) => acc + subject.progress, 0) / subjects.length
  ) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (currentView === 'upload') {
    return <SyllabusUpload onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'notes' && selectedTopic) {
    return (
      <NotesView 
        topic={selectedTopic} 
        onBack={() => setCurrentView('dashboard')} 
      />
    );
  }

  if (currentView === 'quiz') {
    return <QuizView onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-semibold">StudyGenie</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{user?.name}</span>
              <Button variant="ghost" onClick={logout} size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-muted-foreground">Track your learning progress and master new concepts.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Subjects</p>
                  <p className="text-2xl">{subjects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                  <p className="text-2xl">{totalProgress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Weak Areas</p>
                  <p className="text-2xl">{getWeakTopics().length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Study Streak</p>
                  <p className="text-2xl">{userProgress.streakDays} days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Syllabus */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload New Syllabus
                </CardTitle>
                <CardDescription>
                  Add a new syllabus to generate personalized study materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setCurrentView('upload')} className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Syllabus (PDF, DOCX, or Text)
                </Button>
              </CardContent>
            </Card>

            {/* Subjects */}
            <Card>
              <CardHeader>
                <CardTitle>Your Subjects</CardTitle>
                <CardDescription>Track progress across all your study subjects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{subject.name}</h3>
                      <Badge variant="secondary">
                        {subject.completedTopics}/{subject.totalTopics} topics
                      </Badge>
                    </div>
                    <Progress value={subject.progress} className="mb-3" />
                    <div className="flex flex-wrap gap-2">
                      {subject.units.map((unit) => (
                        <div key={unit.id} className="text-xs">
                          {unit.topics.map((topic) => (
                            <Badge
                              key={topic.id}
                              variant={topic.completed ? "default" : "outline"}
                              className={`mr-1 mb-1 cursor-pointer ${
                                topic.weakArea ? 'border-red-500 text-red-700' : ''
                              }`}
                              onClick={() => {
                                setSelectedTopic(topic);
                                setCurrentView('notes');
                              }}
                            >
                              {topic.name}
                            </Badge>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {subjects.length === 0 && (
                  <div className="text-center py-8">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg mb-2">No subjects yet</h3>
                    <p className="text-muted-foreground mb-4">Upload your first syllabus to get started!</p>
                    <Button onClick={() => setCurrentView('upload')}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Syllabus
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weak Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <Target className="mr-2 h-5 w-5" />
                  Focus Areas
                </CardTitle>
                <CardDescription>Topics that need more attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getWeakTopics().map((topic) => (
                    <div
                      key={topic.id}
                      className="p-2 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100"
                      onClick={() => {
                        setSelectedTopic(topic);
                        setCurrentView('notes');
                      }}
                    >
                      <p className="text-sm">{topic.name}</p>
                    </div>
                  ))}
                  {getWeakTopics().length === 0 && (
                    <p className="text-sm text-muted-foreground">No weak areas identified yet!</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setCurrentView('quiz')}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Take a Quiz
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Review Notes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Study Groups
                </Button>
              </CardContent>
            </Card>

            {/* User Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Completed Topics</span>
                  <span className="text-sm font-medium">{userProgress.completedTopics}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Quizzes Taken</span>
                  <span className="text-sm font-medium">{userProgress.quizzesTaken}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Average Score</span>
                  <span className="text-sm font-medium">{userProgress.averageScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Study Time</span>
                  <span className="text-sm font-medium">{Math.round(userProgress.totalStudyTime / 3600)}h</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}