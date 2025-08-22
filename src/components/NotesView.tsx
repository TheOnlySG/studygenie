import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ArrowLeft, BookOpen, Brain, CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import { Separator } from './ui/separator';

interface Topic {
  id: string;
  name: string;
  completed: boolean;
  hasNotes: boolean;
  weakArea: boolean;
}

interface NotesContent {
  overview: string;
  keyPoints: string[];
  examples: string[];
  practiceQuestions: string[];
}

export function NotesView({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  const [notes, setNotes] = useState<NotesContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateNotes = async () => {
    setIsGenerating(true);
    setProgress(0);

    // Simulate AI note generation
    const steps = [
      'Analyzing topic content...',
      'Generating conceptual overview...',
      'Creating key points...',
      'Adding practical examples...',
      'Preparing practice questions...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress((i + 1) * 20);
    }

    // Mock generated notes
    const mockNotes: NotesContent = {
      overview: `${topic.name} is a fundamental concept in computer science that deals with organizing and storing data efficiently. Understanding this topic is crucial for developing efficient algorithms and solving complex computational problems. The key is to grasp not just the implementation details, but the underlying principles that govern when and why to use different approaches.`,
      keyPoints: [
        `Definition: ${topic.name} refers to the systematic organization of data to enable efficient access and modification`,
        'Time Complexity: Understanding the performance characteristics in different scenarios',
        'Space Complexity: Memory usage considerations and trade-offs',
        'Real-world Applications: Where and how this concept is applied in practice',
        'Common Pitfalls: Mistakes to avoid when implementing or using this concept'
      ],
      examples: [
        `Basic Implementation: A simple example showing how ${topic.name} works in practice`,
        'Optimization Techniques: Methods to improve performance and efficiency',
        'Edge Cases: Special scenarios that require careful consideration',
        'Integration: How this concept works with other data structures and algorithms'
      ],
      practiceQuestions: [
        `Explain the core principles behind ${topic.name} and why it's important`,
        'Compare and contrast different approaches to implementing this concept',
        'Analyze the time and space complexity of various operations',
        'Design a solution using this concept for a real-world problem'
      ]
    };

    setNotes(mockNotes);
    setIsGenerating(false);
  };

  useEffect(() => {
    if (topic.hasNotes) {
      // If notes already exist, load them immediately
      generateNotes();
    }
  }, [topic]);

  const handleMarkComplete = () => {
    // In a real app, this would update the topic completion status
    console.log('Marking topic as complete:', topic.id);
    onBack();
  };

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
              <h1 className="text-2xl mb-2">{topic.name}</h1>
              <div className="flex items-center gap-2">
                {topic.completed && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
                {topic.weakArea && (
                  <Badge variant="destructive">
                    Needs Focus
                  </Badge>
                )}
                {!topic.hasNotes && (
                  <Badge variant="outline">
                    No Notes Yet
                  </Badge>
                )}
              </div>
            </div>
            
            {!isGenerating && notes && (
              <Button onClick={handleMarkComplete} className="ml-4">
                {topic.completed ? 'Review Complete' : 'Mark as Complete'}
              </Button>
            )}
          </div>
        </div>

        {/* Generate Notes Button */}
        {!notes && !isGenerating && (
          <Card>
            <CardContent className="p-8 text-center">
              <Brain className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg mb-2">Generate Study Notes</h3>
              <p className="text-muted-foreground mb-6">
                Let AI create personalized study notes for this topic based on conceptual learning principles.
              </p>
              <Button onClick={generateNotes} size="lg">
                <Brain className="mr-2 h-4 w-4" />
                Generate Notes with AI
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Generating State */}
        {isGenerating && (
          <Card>
            <CardContent className="p-8 text-center">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600 mb-4" />
              <h3 className="text-lg mb-2">Generating Personalized Notes</h3>
              <p className="text-muted-foreground mb-6">
                Creating conceptual study materials tailored to your learning style...
              </p>
              <Progress value={progress} className="w-full max-w-md mx-auto" />
              <p className="text-sm text-muted-foreground mt-2">{progress}% complete</p>
            </CardContent>
          </Card>
        )}

        {/* Generated Notes */}
        {notes && !isGenerating && (
          <div className="space-y-6">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Conceptual Overview
                </CardTitle>
                <CardDescription>
                  Understanding the fundamental concepts and principles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">{notes.overview}</p>
              </CardContent>
            </Card>

            {/* Key Points */}
            <Card>
              <CardHeader>
                <CardTitle>Key Learning Points</CardTitle>
                <CardDescription>
                  Essential concepts you need to master
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {notes.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                        {index + 1}
                      </div>
                      <p>{point}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Examples */}
            <Card>
              <CardHeader>
                <CardTitle>Practical Examples</CardTitle>
                <CardDescription>
                  Real-world applications and implementations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notes.examples.map((example, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <p>{example}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Practice Questions */}
            <Card>
              <CardHeader>
                <CardTitle>Practice Questions</CardTitle>
                <CardDescription>
                  Test your understanding with these conceptual questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notes.practiceQuestions.map((question, index) => (
                    <div key={index} className="p-4 border-l-4 border-blue-500 bg-blue-50">
                      <p>{question}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button onClick={() => generateNotes()} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate Notes
              </Button>
              <Button onClick={handleMarkComplete} className="flex-1">
                {topic.completed ? 'Mark as Reviewed' : 'Mark as Complete'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}