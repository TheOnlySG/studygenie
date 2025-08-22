import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  UserGroupIcon,
  PlusIcon,
  ClockIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

interface StudyGroupsPageProps {
  onNavigate: (view: string) => void;
}

export function StudyGroupsPage({ onNavigate }: StudyGroupsPageProps) {
  const [activeTab, setActiveTab] = useState<'my-groups' | 'discover'>('my-groups');

  const myGroups = [
    {
      id: 1,
      name: 'CS Fundamentals',
      subject: 'Computer Science',
      members: 12,
      nextSession: 'Today, 3:00 PM',
      isActive: true,
      description: 'Weekly study group focusing on data structures and algorithms',
      avatars: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
      ]
    },
    {
      id: 2,
      name: 'Calculus Study Group',
      subject: 'Mathematics',
      members: 8,
      nextSession: 'Tomorrow, 2:00 PM',
      isActive: false,
      description: 'Working through calculus problems and concepts together',
      avatars: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Eve',
      ]
    },
    {
      id: 3,
      name: 'Physics Problem Solving',
      subject: 'Physics',
      members: 6,
      nextSession: 'Friday, 4:00 PM',
      isActive: false,
      description: 'Collaborative problem solving for physics coursework',
      avatars: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Henry',
      ]
    },
  ];

  const discoverGroups = [
    {
      id: 4,
      name: 'Advanced Algorithms',
      subject: 'Computer Science',
      members: 15,
      description: 'Deep dive into complex algorithms and optimization',
      tags: ['Advanced', 'Algorithms', 'Competitive Programming'],
      schedule: 'Tuesdays & Thursdays, 6:00 PM',
    },
    {
      id: 5,
      name: 'Linear Algebra Masters',
      subject: 'Mathematics',
      members: 10,
      description: 'Master linear algebra concepts and applications',
      tags: ['Mathematics', 'Linear Algebra', 'Proofs'],
      schedule: 'Wednesdays, 7:00 PM',
    },
    {
      id: 6,
      name: 'Quantum Physics Study',
      subject: 'Physics',
      members: 7,
      description: 'Exploring the fascinating world of quantum mechanics',
      tags: ['Advanced', 'Quantum', 'Theory'],
      schedule: 'Saturdays, 2:00 PM',
    },
  ];

  const upcomingSessions = [
    {
      group: 'CS Fundamentals',
      time: 'Today, 3:00 PM',
      topic: 'Binary Search Trees',
      type: 'Study Session',
    },
    {
      group: 'Calculus Study Group',
      time: 'Tomorrow, 2:00 PM',
      topic: 'Integration Techniques',
      type: 'Problem Solving',
    },
    {
      group: 'Physics Problem Solving',
      time: 'Friday, 4:00 PM',
      topic: 'Electromagnetic Fields',
      type: 'Q&A Session',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-medium">Study Groups</h1>
        <p className="text-muted-foreground">
          Join collaborative study sessions and learn together
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'my-groups' ? 'default' : 'outline'}
          onClick={() => setActiveTab('my-groups')}
        >
          My Groups
        </Button>
        <Button
          variant={activeTab === 'discover' ? 'default' : 'outline'}
          onClick={() => setActiveTab('discover')}
        >
          Discover Groups
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'my-groups' ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Study Groups</CardTitle>
                    <CardDescription>Groups you've joined</CardDescription>
                  </div>
                  <Button size="sm">
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Create Group
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {myGroups.map((group) => (
                  <div
                    key={group.id}
                    className="border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{group.name}</h3>
                          {group.isActive && (
                            <Badge variant="default" className="text-xs bg-green-500">
                              Live
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {group.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <UserGroupIcon className="h-4 w-4" />
                            {group.members} members
                          </span>
                          <span className="flex items-center gap-1">
                            <ClockIcon className="h-4 w-4" />
                            {group.nextSession}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {group.subject}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {group.avatars.map((avatar, index) => (
                              <Avatar key={index} className="h-6 w-6 border-2 border-background">
                                <AvatarImage src={avatar} />
                                <AvatarFallback className="text-xs">
                                  {String.fromCharCode(65 + index)}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {group.members > 3 && (
                              <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs text-muted-foreground">
                                +{group.members - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                        <Button size="sm" disabled={!group.isActive}>
                          <VideoCameraIcon className="h-4 w-4 mr-1" />
                          {group.isActive ? 'Join' : 'Schedule'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Discover Study Groups</CardTitle>
                <CardDescription>Find groups that match your interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {discoverGroups.map((group) => (
                  <div
                    key={group.id}
                    className="border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{group.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {group.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <UserGroupIcon className="h-4 w-4" />
                            {group.members} members
                          </span>
                          <span className="flex items-center gap-1">
                            <ClockIcon className="h-4 w-4" />
                            {group.schedule}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {group.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Join Group
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingSessions.map((session, index) => (
                <div
                  key={index}
                  className="p-3 border border-border rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{session.group}</h4>
                    <Badge variant="outline" className="text-xs">
                      {session.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {session.topic}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session.time}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <PlusIcon className="mr-2 h-4 w-4" />
                Create Study Group
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <UserGroupIcon className="mr-2 h-4 w-4" />
                Browse All Groups
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AcademicCapIcon className="mr-2 h-4 w-4" />
                Study Buddy Finder
              </Button>
            </CardContent>
          </Card>

          {/* Study Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Your Study Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Groups Joined</span>
                <span className="font-medium">{myGroups.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Sessions This Week</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Study Hours</span>
                <span className="font-medium">23h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Helped Others</span>
                <span className="font-medium">12 times</span>
              </div>
            </CardContent>
          </Card>

          {/* Study Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Study Group Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <p className="font-medium mb-1">💡 Be Prepared</p>
                <p className="text-muted-foreground text-xs">
                  Review materials before each session to make the most of group time.
                </p>
              </div>
              <div className="text-sm">
                <p className="font-medium mb-1">🤝 Stay Engaged</p>
                <p className="text-muted-foreground text-xs">
                  Ask questions and contribute to discussions actively.
                </p>
              </div>
              <div className="text-sm">
                <p className="font-medium mb-1">📅 Be Consistent</p>
                <p className="text-muted-foreground text-xs">
                  Regular attendance helps build strong study relationships.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}