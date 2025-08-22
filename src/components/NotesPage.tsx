import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  StarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface NotesPageProps {
  onNavigate: (view: string) => void;
}

export function NotesPage({ onNavigate }: NotesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = ['all', 'Computer Science', 'Mathematics', 'Physics'];
  
  const notes = [
    {
      id: 1,
      title: 'Binary Search Trees',
      subject: 'Computer Science',
      lastModified: '2 hours ago',
      starred: true,
      preview: 'A binary search tree is a hierarchical data structure that maintains sorted data...',
      topics: ['Data Structures', 'Trees'],
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Calculus Fundamentals',
      subject: 'Mathematics',
      lastModified: 'Yesterday',
      starred: false,
      preview: 'Calculus is the mathematical study of continuous change...',
      topics: ['Derivatives', 'Limits'],
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'Hash Tables & Hash Functions',
      subject: 'Computer Science',
      lastModified: '3 days ago',
      starred: true,
      preview: 'Hash tables provide O(1) average time complexity for search operations...',
      topics: ['Data Structures', 'Algorithms'],
      readTime: '6 min read',
    },
    {
      id: 4,
      title: 'Linear Algebra Basics',
      subject: 'Mathematics',
      lastModified: '1 week ago',
      starred: false,
      preview: 'Linear algebra is the branch of mathematics concerning vector spaces...',
      topics: ['Matrices', 'Vectors'],
      readTime: '10 min read',
    },
    {
      id: 5,
      title: 'Sorting Algorithms',
      subject: 'Computer Science',
      lastModified: '1 week ago',
      starred: false,
      preview: 'Sorting algorithms are fundamental to computer science...',
      topics: ['Algorithms', 'Complexity'],
      readTime: '7 min read',
    },
  ];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const starredNotes = notes.filter(note => note.starred);
  const recentNotes = notes.slice(0, 3);

  const toggleStar = (noteId: number) => {
    console.log('Toggle star for note:', noteId);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-medium">Study Notes</h1>
        <p className="text-muted-foreground">
          Review and organize your personalized study materials
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes, topics, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {subjects.map((subject) => (
                <Button
                  key={subject}
                  variant={selectedSubject === subject ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubject(subject)}
                  className="whitespace-nowrap"
                >
                  {subject === 'all' ? 'All Subjects' : subject}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Notes */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {searchQuery || selectedSubject !== 'all' 
                  ? `Search Results (${filteredNotes.length})`
                  : 'All Notes'
                }
              </CardTitle>
              <CardDescription>
                {searchQuery || selectedSubject !== 'all' 
                  ? 'Notes matching your search criteria'
                  : 'Your complete collection of study notes'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="border border-border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                    onClick={() => console.log('Open note:', note.title)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{note.title}</h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStar(note.id);
                            }}
                            className="text-muted-foreground hover:text-yellow-500 transition-colors"
                          >
                            {note.starred ? (
                              <StarIconSolid className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <StarIcon className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {note.preview}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {note.topics.map((topic, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <ClockIcon className="h-3 w-3" />
                            {note.readTime}
                          </span>
                          <span>{note.subject}</span>
                          <span>Updated {note.lastModified}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No notes found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? 'Try adjusting your search terms'
                      : 'Upload some study materials to generate notes!'
                    }
                  </p>
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
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                onClick={() => onNavigate('dashboard')}
              >
                <DocumentTextIcon className="mr-2 h-4 w-4" />
                Upload New Material
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => console.log('Create new note')}
              >
                <BookOpenIcon className="mr-2 h-4 w-4" />
                Create Manual Note
              </Button>
            </CardContent>
          </Card>

          {/* Starred Notes */}
          {starredNotes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StarIconSolid className="h-5 w-5 text-yellow-500" />
                  Starred Notes
                </CardTitle>
                <CardDescription>Your favorite study materials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {starredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 border border-border rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted/50"
                    onClick={() => console.log('Open starred note:', note.title)}
                  >
                    <h4 className="font-medium text-sm mb-1">{note.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {note.subject}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {note.lastModified}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Recent Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                Recently Updated
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-3 border border-border rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted/50"
                  onClick={() => console.log('Open recent note:', note.title)}
                >
                  <h4 className="font-medium text-sm mb-1">{note.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {note.subject} • {note.readTime}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {note.lastModified}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notes Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Notes Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Notes</span>
                <span className="font-medium">{notes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Starred</span>
                <span className="font-medium">{starredNotes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Subjects</span>
                <span className="font-medium">{subjects.length - 1}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="font-medium">3 updated</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}