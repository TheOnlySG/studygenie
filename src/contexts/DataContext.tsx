import React, { createContext, useContext, useState, useEffect } from 'react';

interface Topic {
  id: string;
  name: string;
  completed: boolean;
  hasNotes: boolean;
  weakArea: boolean;
  notesContent?: NotesContent;
}

interface Unit {
  id: string;
  name: string;
  topics: Topic[];
}

interface Subject {
  id: string;
  name: string;
  units: Unit[];
  progress: number;
  totalTopics: number;
  completedTopics: number;
  uploadDate: Date;
}

interface NotesContent {
  overview: string;
  keyPoints: string[];
  examples: string[];
  practiceQuestions: string[];
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isAdaptive?: boolean; // Generated based on wrong answers
}

interface UserProgress {
  totalStudyTime: number;
  streakDays: number;
  completedTopics: number;
  quizzesTaken: number;
  averageScore: number;
  weakTopics: string[];
}

interface DataContextType {
  subjects: Subject[];
  userProgress: UserProgress;
  addSubject: (subject: Subject) => void;
  updateTopicCompletion: (topicId: string, completed: boolean) => void;
  markTopicAsWeak: (topicId: string) => void;
  generateAdaptiveQuestions: (weakTopics: string[]) => QuizQuestion[];
  updateUserProgress: (quizResult: any) => void;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

// Mock data for demonstration
const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Computer Science',
    uploadDate: new Date('2024-01-15'),
    progress: 65,
    totalTopics: 24,
    completedTopics: 16,
    units: [
      {
        id: '1-1',
        name: 'Data Structures',
        topics: [
          {
            id: '1-1-1',
            name: 'Arrays and Linked Lists',
            completed: true,
            hasNotes: true,
            weakArea: false
          },
          {
            id: '1-1-2',
            name: 'Stacks and Queues',
            completed: true,
            hasNotes: true,
            weakArea: true
          },
          {
            id: '1-1-3',
            name: 'Trees and Graphs',
            completed: false,
            hasNotes: false,
            weakArea: false
          },
          {
            id: '1-1-4',
            name: 'Hash Tables',
            completed: true,
            hasNotes: true,
            weakArea: false
          }
        ]
      },
      {
        id: '1-2',
        name: 'Algorithms',
        topics: [
          {
            id: '1-2-1',
            name: 'Sorting Algorithms',
            completed: true,
            hasNotes: true,
            weakArea: false
          },
          {
            id: '1-2-2',
            name: 'Graph Algorithms',
            completed: false,
            hasNotes: false,
            weakArea: true
          },
          {
            id: '1-2-3',
            name: 'Dynamic Programming',
            completed: false,
            hasNotes: false,
            weakArea: true
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Mathematics',
    uploadDate: new Date('2024-01-20'),
    progress: 40,
    totalTopics: 18,
    completedTopics: 7,
    units: [
      {
        id: '2-1',
        name: 'Calculus',
        topics: [
          {
            id: '2-1-1',
            name: 'Derivatives',
            completed: true,
            hasNotes: true,
            weakArea: false
          },
          {
            id: '2-1-2',
            name: 'Integrals',
            completed: false,
            hasNotes: false,
            weakArea: true
          },
          {
            id: '2-1-3',
            name: 'Limits',
            completed: true,
            hasNotes: true,
            weakArea: false
          }
        ]
      },
      {
        id: '2-2',
        name: 'Linear Algebra',
        topics: [
          {
            id: '2-2-1',
            name: 'Matrices',
            completed: false,
            hasNotes: false,
            weakArea: false
          },
          {
            id: '2-2-2',
            name: 'Vector Spaces',
            completed: false,
            hasNotes: false,
            weakArea: true
          }
        ]
      }
    ]
  }
];

const mockUserProgress: UserProgress = {
  totalStudyTime: 3600, // in seconds
  streakDays: 7,
  completedTopics: 23,
  quizzesTaken: 15,
  averageScore: 78,
  weakTopics: ['Stacks and Queues', 'Graph Algorithms', 'Dynamic Programming', 'Integrals', 'Vector Spaces']
};

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>(mockUserProgress);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from Firebase
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubjects(mockSubjects);
      setLoading(false);
    };

    loadData();
  }, []);

  const addSubject = (subject: Subject) => {
    setSubjects(prev => [...prev, subject]);
  };

  const updateTopicCompletion = (topicId: string, completed: boolean) => {
    setSubjects(prev => prev.map(subject => ({
      ...subject,
      units: subject.units.map(unit => ({
        ...unit,
        topics: unit.topics.map(topic =>
          topic.id === topicId ? { ...topic, completed } : topic
        )
      }))
    })));

    // Update user progress
    setUserProgress(prev => ({
      ...prev,
      completedTopics: completed 
        ? prev.completedTopics + 1 
        : Math.max(0, prev.completedTopics - 1)
    }));
  };

  const markTopicAsWeak = (topicId: string) => {
    setSubjects(prev => prev.map(subject => ({
      ...subject,
      units: subject.units.map(unit => ({
        ...unit,
        topics: unit.topics.map(topic =>
          topic.id === topicId ? { ...topic, weakArea: true } : topic
        )
      }))
    })));
  };

  const generateAdaptiveQuestions = (weakTopics: string[]): QuizQuestion[] => {
    // Mock adaptive question generation based on weak topics
    const adaptiveQuestions: QuizQuestion[] = [];
    
    weakTopics.forEach(topic => {
      // Generate 2-3 questions per weak topic
      for (let i = 0; i < 2; i++) {
        adaptiveQuestions.push({
          id: `adaptive-${topic}-${i}`,
          question: `[Adaptive] Advanced question about ${topic} to strengthen your understanding`,
          options: [
            'Option A - focusing on core concepts',
            'Option B - addressing common misconceptions',
            'Option C - practical application',
            'Option D - theoretical foundation'
          ],
          correctAnswer: Math.floor(Math.random() * 4),
          explanation: `This adaptive question was generated to help you master ${topic}. Focus on understanding the underlying principles.`,
          topic,
          difficulty: 'medium',
          isAdaptive: true
        });
      }
    });

    return adaptiveQuestions;
  };

  const updateUserProgress = (quizResult: any) => {
    setUserProgress(prev => ({
      ...prev,
      quizzesTaken: prev.quizzesTaken + 1,
      averageScore: Math.round(
        (prev.averageScore * (prev.quizzesTaken - 1) + quizResult.score) / prev.quizzesTaken
      ),
      weakTopics: [...new Set([...prev.weakTopics, ...quizResult.weakTopics])]
    }));

    // Mark topics as weak based on quiz results
    quizResult.weakTopics.forEach((topicName: string) => {
      // Find topic by name and mark as weak
      setSubjects(prev => prev.map(subject => ({
        ...subject,
        units: subject.units.map(unit => ({
          ...unit,
          topics: unit.topics.map(topic =>
            topic.name.toLowerCase().includes(topicName.toLowerCase()) 
              ? { ...topic, weakArea: true } 
              : topic
          )
        }))
      })));
    });
  };

  const value = {
    subjects,
    userProgress,
    addSubject,
    updateTopicCompletion,
    markTopicAsWeak,
    generateAdaptiveQuestions,
    updateUserProgress,
    loading
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}