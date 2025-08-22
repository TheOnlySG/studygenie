import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  UserCircleIcon,
  AcademicCapIcon,
  TrophyIcon,
  FireIcon,
  ChartBarIcon,
  CameraIcon,
} from '@heroicons/react/24/outline';

export function ProfilePage() {
  const { user } = useAuth();
  const { userProgress, subjects } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate learner focused on computer science and mathematics.',
    institution: 'University of Technology',
    year: 'Junior',
    major: 'Computer Science',
  });

  const handleSave = () => {
    // In a real app, this would update the user profile
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const achievements = [
    {
      title: 'Quick Learner',
      description: 'Completed 20+ topics',
      icon: AcademicCapIcon,
      color: 'bg-blue-500',
      earned: true,
    },
    {
      title: 'Quiz Master',
      description: 'Scored 90%+ on 5 quizzes',
      icon: TrophyIcon,
      color: 'bg-yellow-500',
      earned: true,
    },
    {
      title: 'Study Streak',
      description: '7 day study streak',
      icon: FireIcon,
      color: 'bg-orange-500',
      earned: true,
    },
    {
      title: 'Consistent Performer',
      description: 'Maintain 80%+ average',
      icon: ChartBarIcon,
      color: 'bg-green-500',
      earned: false,
    },
  ];

  const studyGoals = [
    { goal: 'Complete Data Structures course', progress: 75, target: '100%' },
    { goal: 'Maintain 85% quiz average', progress: 78, target: '85%' },
    { goal: 'Study 30 minutes daily', progress: 80, target: '100%' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-medium">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and track your progress
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-xl">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                      onClick={() => console.log('Upload photo')}
                    >
                      <CameraIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{profileData.name}</h3>
                  <p className="text-sm text-muted-foreground">{profileData.email}</p>
                  <Badge variant="secondary" className="mt-1">
                    {profileData.year} • {profileData.major}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={profileData.institution}
                    onChange={(e) => setProfileData(prev => ({ ...prev, institution: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="major">Major</Label>
                  <Input
                    id="major"
                    value={profileData.major}
                    onChange={(e) => setProfileData(prev => ({ ...prev, major: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Study Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Study Goals</CardTitle>
              <CardDescription>Track your learning objectives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studyGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{goal.goal}</span>
                    <span className="text-sm text-muted-foreground">
                      {goal.progress}% / {goal.target}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="mt-4">
                Add New Goal
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your learning milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg transition-all duration-200 ${
                        achievement.earned
                          ? 'border-border bg-background'
                          : 'border-muted bg-muted/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          achievement.earned
                            ? achievement.color.replace('bg-', 'bg-').replace('-500', '-100')
                            : 'bg-muted'
                        }`}>
                          <Icon className={`h-5 w-5 ${
                            achievement.earned
                              ? achievement.color.replace('bg-', 'text-').replace('-500', '-600')
                              : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{achievement.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircleIcon className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="text-sm font-medium">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Subjects</span>
                <span className="text-sm font-medium">{subjects.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Completed Topics</span>
                <span className="text-sm font-medium">{userProgress.completedTopics}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Average Score</span>
                <span className="text-sm font-medium">{userProgress.averageScore}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Study Streak</span>
                <span className="text-sm font-medium">{userProgress.streakDays} days</span>
              </div>
            </CardContent>
          </Card>

          {/* Learning Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label className="text-sm">Preferred Study Time</Label>
                <div className="flex gap-2">
                  <Badge variant="default" className="text-xs">Morning</Badge>
                  <Badge variant="outline" className="text-xs">Afternoon</Badge>
                  <Badge variant="outline" className="text-xs">Evening</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Learning Style</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" className="text-xs">Visual</Badge>
                  <Badge variant="outline" className="text-xs">Auditory</Badge>
                  <Badge variant="default" className="text-xs">Kinesthetic</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Difficulty Preference</Label>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">Beginner</Badge>
                  <Badge variant="default" className="text-xs">Intermediate</Badge>
                  <Badge variant="outline" className="text-xs">Advanced</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Notification Settings
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Privacy Settings
              </Button>
              <Separator />
              <Button variant="destructive" size="sm" className="w-full">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}