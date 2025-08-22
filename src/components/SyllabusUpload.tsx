import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { ArrowLeft, Upload, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';

interface ParsedSyllabus {
  subject: string;
  units: ParsedUnit[];
}

interface ParsedUnit {
  name: string;
  topics: string[];
}

export function SyllabusUpload({ onBack }: { onBack: () => void }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [progress, setProgress] = useState(0);
  const [parsedSyllabus, setParsedSyllabus] = useState<ParsedSyllabus | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file.type === 'text/plain') {
        setUploadedFile(file);
      }
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const simulateProcessing = async () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Step 1: File parsing
    setProcessingStep('Parsing syllabus document...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProgress(25);

    // Step 2: Content extraction
    setProcessingStep('Extracting subjects and topics...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProgress(50);

    // Step 3: AI processing
    setProcessingStep('Organizing content with AI...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProgress(75);

    // Step 4: Generating notes
    setProcessingStep('Generating study notes...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProgress(100);

    // Mock parsed result
    setParsedSyllabus({
      subject: 'Computer Science Advanced Topics',
      units: [
        {
          name: 'Data Structures and Algorithms',
          topics: ['Binary Trees', 'Hash Tables', 'Graph Algorithms', 'Dynamic Programming']
        },
        {
          name: 'Database Systems',
          topics: ['SQL Fundamentals', 'Normalization', 'Indexing', 'Transaction Management']
        },
        {
          name: 'Software Engineering',
          topics: ['Design Patterns', 'Testing Strategies', 'Agile Methodologies', 'Code Quality']
        }
      ]
    });

    setIsProcessing(false);
  };

  const handleSubmit = () => {
    if (uploadedFile || textInput.trim()) {
      simulateProcessing();
    }
  };

  const handleSaveSyllabus = () => {
    // In a real app, this would save to Firebase
    console.log('Saving syllabus:', parsedSyllabus);
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
          <h1 className="text-2xl mb-2">Upload Syllabus</h1>
          <p className="text-muted-foreground">
            Upload your syllabus document or paste the content to generate personalized study materials.
          </p>
        </div>

        {!isProcessing && !parsedSyllabus && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Document</CardTitle>
                <CardDescription>
                  Support for PDF, DOCX, and text files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg mb-2">
                    {uploadedFile ? uploadedFile.name : 'Drop your syllabus here'}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse files
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
                
                {uploadedFile && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center">
                    <FileText className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm text-green-700">{uploadedFile.name}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Text Input */}
            <Card>
              <CardHeader>
                <CardTitle>Paste Content</CardTitle>
                <CardDescription>
                  Copy and paste your syllabus content directly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject Name</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Computer Science, Mathematics"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Syllabus Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Paste your syllabus content here..."
                      className="mt-1 min-h-[200px]"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <Card>
            <CardContent className="p-8 text-center">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600 mb-4" />
              <h3 className="text-lg mb-2">Processing Your Syllabus</h3>
              <p className="text-muted-foreground mb-6">{processingStep}</p>
              <Progress value={progress} className="w-full max-w-md mx-auto" />
              <p className="text-sm text-muted-foreground mt-2">{progress}% complete</p>
            </CardContent>
          </Card>
        )}

        {/* Parsed Result */}
        {parsedSyllabus && !isProcessing && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <CheckCircle className="mr-2 h-5 w-5" />
                Syllabus Processed Successfully
              </CardTitle>
              <CardDescription>
                Review the extracted content and confirm to save
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg mb-2">Subject: {parsedSyllabus.subject}</h3>
                  <Badge>{parsedSyllabus.units.length} units identified</Badge>
                </div>

                <div className="space-y-4">
                  {parsedSyllabus.units.map((unit, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Unit {index + 1}: {unit.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {unit.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="outline">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleSaveSyllabus} className="flex-1">
                    Save Syllabus & Generate Notes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setParsedSyllabus(null);
                      setUploadedFile(null);
                      setTextInput('');
                    }}
                  >
                    Start Over
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        {!isProcessing && !parsedSyllabus && (uploadedFile || textInput.trim()) && (
          <div className="mt-8 text-center">
            <Button onClick={handleSubmit} size="lg">
              <Upload className="mr-2 h-4 w-4" />
              Process Syllabus
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}