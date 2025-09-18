import React, { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ChapterViewer } from "@/components/ChapterViewer";
import { VideoPlayer } from "@/components/VideoPlayer";
import WebhookIntegration from "@/components/WebhookIntegration";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockChapters = [
  {
    title: "Introduction to Artificial Intelligence",
    videos: [
      {
        title: "AI Basics Explained - Complete Guide for Beginners",
        url: "https://www.youtube.com/watch?v=abcd1234",
        videoId: "JMUxmLyrhSk",
        views: "105k views",
        likes: "4.3k likes",
        comments: "250 comments",
      },
      {
        title: "Artificial Intelligence in 10 Minutes",
        url: "https://www.youtube.com/watch?v=xyz5678",
        videoId: "OXQV8kXDvAg",
        views: "89k views",
        likes: "4.1k likes",
        comments: "310 comments",
      },
    ],
  },
  {
    title: "Machine Learning Fundamentals",
    videos: [
      {
        title: "Machine Learning Explained - Complete Course",
        url: "https://www.youtube.com/watch?v=ml567",
        videoId: "ukzFI9rgwfU",
        views: "200k views",
        likes: "9k likes",
        comments: "500 comments",
      },
      {
        title: "Neural Networks from Scratch",
        url: "https://www.youtube.com/watch?v=nn789",
        videoId: "aircAruvnKk",
        views: "1.2M views",
        likes: "42k likes",
        comments: "1.2k comments",
      },
    ],
  },
];

const Index = () => {
  const [chapters, setChapters] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    videoId: string;
    title: string;
  } | null>(null);

  const handleVideoClick = (videoId: string, title: string) => {
    setSelectedVideo({ videoId, title });
  };

  const simulateProcessing = () => {
    setIsProcessing(true);
    toast({
      title: "Processing PDF",
      description: "Extracting chapters and finding related videos...",
    });

    // Simulate API call
    setTimeout(() => {
      setChapters(mockChapters);
      setIsProcessing(false);
      toast({
        title: "Processing complete",
        description: "Found chapters and related educational videos!",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  📘 Cognify
                </h1>
                <p className="text-sm text-muted-foreground">
                  Adaptive Learning Agent
                </p>
              </div>
            </div>

            {chapters.length > 0 && (
              <Button
                onClick={simulateProcessing}
                disabled={isProcessing}
                variant="outline"
                className="hidden sm:flex"
              >
                {isProcessing ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4 mr-2" />
                )}
                {isProcessing ? "Processing..." : "Process New PDF"}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          {chapters.length === 0 && (
            <div className="text-center space-y-6 py-12">
              <div className="space-y-4">
                <div className="inline-flex p-4 rounded-full bg-gradient-primary/10">
                  <BookOpen className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-4xl font-bold tracking-tight">
                  Transform Your Learning Experience
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Upload your PDF textbooks and discover curated educational videos 
                  that complement each chapter. Learn smarter, not harder.
                </p>
              </div>
            </div>
          )}

          {/* File Upload Section */}
          <section>
            <FileUpload />
            
            {/* Demo Button */}
            {chapters.length === 0 && (
              <div className="text-center mt-8">
                <Button
                  onClick={simulateProcessing}
                  disabled={isProcessing}
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      Processing PDF...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Try Demo with Sample Content
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  See how Cognify works with sample educational content
                </p>
              </div>
            )}
          </section>

          {/* Webhook Integration Section */}
          <section>
            <WebhookIntegration />
          </section>

          {/* Chapter Viewer Section */}
          {(chapters.length > 0 || isProcessing) && (
            <section>
              {isProcessing ? (
                <div className="text-center py-16 space-y-4">
                  <div className="animate-pulse-soft">
                    <div className="p-6 rounded-full bg-primary/10 mx-auto w-fit">
                      <RefreshCw className="h-12 w-12 text-primary animate-spin" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Processing Your PDF</h3>
                    <p className="text-muted-foreground">
                      Extracting chapters and finding the best educational videos...
                    </p>
                  </div>
                </div>
              ) : (
                <ChapterViewer
                  chapters={chapters}
                  onVideoClick={handleVideoClick}
                />
              )}
            </section>
          )}
        </div>
      </main>

      {/* Video Player Modal */}
      <VideoPlayer
        isOpen={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
        videoId={selectedVideo?.videoId || ""}
        videoTitle={selectedVideo?.title || ""}
      />
    </div>
  );
};

export default Index;