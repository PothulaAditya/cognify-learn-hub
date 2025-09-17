import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  uploadDate: Date;
  progress: number;
  status: "uploading" | "completed" | "error";
}

interface FileUploadProps {
  onFilesProcessed?: (files: UploadedFile[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesProcessed }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      uploadDate: new Date(),
      progress: 0,
      status: "uploading" as const,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file) => {
      simulateUpload(file.id);
    });

    toast({
      title: "Upload started",
      description: `Uploading ${acceptedFiles.length} file(s)`,
    });
  }, []);

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId && file.status === "uploading") {
            const newProgress = file.progress + Math.random() * 20;
            if (newProgress >= 100) {
              clearInterval(interval);
              toast({
                title: "Upload completed",
                description: `${file.name} uploaded successfully`,
              });
              return { ...file, progress: 100, status: "completed" as const };
            }
            return { ...file, progress: newProgress };
          }
          return file;
        })
      );
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="border-2 border-dashed border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-lg p-8 text-center transition-all ${
              isDragActive
                ? "bg-primary/10 border-primary/50 scale-105"
                : "hover:bg-muted/50"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {isDragActive ? "Drop your PDFs here" : "Upload PDF Textbooks"}
                </h3>
                <p className="text-muted-foreground">
                  Drag & drop your PDF files here, or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports multiple PDF files
                </p>
              </div>
              <Button variant="outline" className="mt-4">
                Choose Files
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Uploaded Files</h3>
          <div className="grid gap-4">
            {uploadedFiles.map((file) => (
              <Card key={file.id} className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{formatFileSize(file.size)}</span>
                          <span>{file.uploadDate.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {file.status === "uploading" && (
                        <div className="w-24">
                          <Progress value={file.progress} className="h-2" />
                        </div>
                      )}
                      {file.status === "completed" && (
                        <div className="p-1 rounded-full bg-success/10">
                          <Check className="h-4 w-4 text-success" />
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};