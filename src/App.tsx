import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { AuthenticationForm } from './components/AuthenticationForm';
import { Navbar } from './components/Navbar';
import { NewDashboard } from './components/NewDashboard';
import { QuizPage } from './components/QuizPage';
import { NotesPage } from './components/NotesPage';
import { StudyGroupsPage } from './components/StudyGroupsPage';
import { ProfilePage } from './components/ProfilePage';
import { Settings } from './components/Settings';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthenticationForm />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <NewDashboard onNavigate={setCurrentView} />;
      case 'quiz':
        return <QuizPage onNavigate={setCurrentView} />;
      case 'notes':
        return <NotesPage onNavigate={setCurrentView} />;
      case 'groups':
        return <StudyGroupsPage onNavigate={setCurrentView} />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <Settings />;
      default:
        return <NewDashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <main className="pt-0">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}