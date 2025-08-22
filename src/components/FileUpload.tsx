import React, { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import {
  CloudArrowUpIcon,
  DocumentIcon,
  ClipboardDocumentIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { storage } from "../firebaseConfig"; // ✅ make sure this path is correct
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface FileUploadProps {
  onUploadComplete?: (downloadUrl: string) => void;
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

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
      validateFile(file);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateFile(e.target.files[0]);
    }
  };

  const validateFile = (file: File) => {
    if (
      file.type === "application/pdf" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "text/plain"
    ) {
      setUploadedFile(file);
    } else {
      alert("Please upload a PDF, DOCX, or TXT file");
    }
  };

  const uploadFile = async () => {
    if (!uploadedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    const storageRef = ref(storage, `uploads/${uploadedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed", error);
        setIsUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadUrl(url);
        setIsUploading(false);
        onUploadComplete?.(url);
      }
    );
  };

  const copyToClipboard = async () => {
    if (downloadUrl) {
      try {
        await navigator.clipboard.writeText(downloadUrl);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setIsUploading(false);
    setUploadProgress(0);
    setDownloadUrl(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudArrowUpIcon className="h-5 w-5" />
          Upload Notes/PDFs
        </CardTitle>
        <CardDescription>
          Upload your study materials, notes, or syllabus documents
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!downloadUrl ? (
          <>
            {/* Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground hover:bg-muted/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <CloudArrowUpIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <DocumentIcon className="h-5 w-5" />
                    <span className="font-medium">{uploadedFile.name}</span>
                  </div>
                ) : (
                  <>
                    <p className="text-lg font-medium">Drop your files here</p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse files
                    </p>
                  </>
                )}
              </div>
              <Input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
              />
              {!uploadedFile && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  disabled={isUploading}
                >
                  Choose File
                </Button>
              )}
            </div>

            {/* File Type Info */}
            <div className="text-sm text-muted-foreground text-center">
              Supported formats: PDF, DOCX, TXT (Max size: 10MB)
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {/* Upload Button */}
            {uploadedFile && !isUploading && (
              <div className="flex gap-2">
                <Button onClick={uploadFile} className="flex-1">
                  <CloudArrowUpIcon className="mr-2 h-4 w-4" />
                  Upload File
                </Button>
                <Button variant="outline" onClick={resetUpload}>
                  Cancel
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Upload Complete */
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <CheckCircleIcon className="h-12 w-12 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Upload Complete!</h3>
              <p className="text-sm text-muted-foreground">
                Your file has been uploaded successfully
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">Download URL:</p>
              <div className="flex items-center gap-2">
                <Input value={downloadUrl} readOnly className="text-sm" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="shrink-0"
                >
                  <ClipboardDocumentIcon className="h-4 w-4 mr-1" />
                  Copy Link
                </Button>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={resetUpload}
              className="w-full"
            >
              Upload Another File
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
           