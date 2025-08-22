import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import {
  Cog6ToothIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

export function Settings() {
  const [firebaseConfig, setFirebaseConfig] = useState({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  });
  
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFirebaseConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to secure storage
    localStorage.setItem('firebase-config', JSON.stringify(firebaseConfig));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const loadSavedConfig = () => {
    const saved = localStorage.getItem('firebase-config');
    if (saved) {
      setFirebaseConfig(JSON.parse(saved));
    }
  };

  React.useEffect(() => {
    loadSavedConfig();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-medium">Settings</h1>
        <p className="text-muted-foreground">
          Configure your StudyGenie application settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyIcon className="h-5 w-5" />
            Firebase Configuration
          </CardTitle>
          <CardDescription>
            Configure Firebase settings for authentication, storage, and database functionality.
            These keys will be used to connect your app to Firebase services.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="AIzaSyD..."
                  value={firebaseConfig.apiKey}
                  onChange={(e) => handleInputChange('apiKey', e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <EyeSlashIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="authDomain">Auth Domain</Label>
              <Input
                id="authDomain"
                placeholder="your-project.firebaseapp.com"
                value={firebaseConfig.authDomain}
                onChange={(e) => handleInputChange('authDomain', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectId">Project ID</Label>
              <Input
                id="projectId"
                placeholder="your-project-id"
                value={firebaseConfig.projectId}
                onChange={(e) => handleInputChange('projectId', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storageBucket">Storage Bucket</Label>
              <Input
                id="storageBucket"
                placeholder="your-project.appspot.com"
                value={firebaseConfig.storageBucket}
                onChange={(e) => handleInputChange('storageBucket', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="messagingSenderId">Messaging Sender ID</Label>
              <Input
                id="messagingSenderId"
                placeholder="123456789"
                value={firebaseConfig.messagingSenderId}
                onChange={(e) => handleInputChange('messagingSenderId', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="appId">App ID</Label>
              <Input
                id="appId"
                placeholder="1:123456789:web:abc123def456"
                value={firebaseConfig.appId}
                onChange={(e) => handleInputChange('appId', e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Configuration Status</p>
              <p className="text-sm text-muted-foreground">
                {Object.values(firebaseConfig).some(value => value.trim() !== '') 
                  ? 'Some configuration values are set'
                  : 'No configuration values set'
                }
              </p>
            </div>
            <Button onClick={handleSave} className="flex items-center gap-2">
              {isSaved && <CheckCircleIcon className="h-4 w-4" />}
              {isSaved ? 'Saved!' : 'Save Configuration'}
            </Button>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-sm">How to get Firebase configuration:</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Go to the Firebase Console (console.firebase.google.com)</li>
              <li>Select your project or create a new one</li>
              <li>Click on "Project Settings" (gear icon)</li>
              <li>Scroll down to "Your apps" section</li>
              <li>Click on the web app or add a new web app</li>
              <li>Copy the configuration values from the Firebase SDK snippet</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cog6ToothIcon className="h-5 w-5" />
            Application Settings
          </CardTitle>
          <CardDescription>
            General application preferences and settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
            </div>
            <Button variant="outline" disabled>
              Light Mode (Coming Soon)
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Notifications</p>
              <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
            </div>
            <Button variant="outline" disabled>
              Configure (Coming Soon)
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Data Export</p>
              <p className="text-sm text-muted-foreground">Export your study data</p>
            </div>
            <Button variant="outline" disabled>
              Export (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}