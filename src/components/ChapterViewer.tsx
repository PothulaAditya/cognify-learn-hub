import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Play, Eye, ThumbsUp, MessageCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Video {
  title: string;
  url: string;
  videoId: string;
  views: string;
  likes: string;
  comments: string;
}

interface Chapter {
  title: string;
  videos: Video[];
}

interface ChapterViewerProps {
  chapters: Chapter[];
  onVideoClick: (videoId: string, title: string) => void;
}

export const ChapterViewer: React.FC<ChapterViewerProps> = ({ chapters, onVideoClick }) => {
  const [openChapters, setOpenChapters] = useState<Set<number>>(new Set([0]));

  const toggleChapter = (index: number) => {
    setOpenChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  if (chapters.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="p-4 rounded-full bg-muted/20 mx-auto w-fit">
              <Play className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">No chapters available</h3>
              <p className="text-muted-foreground">
                Upload a PDF file to extract chapters and find related videos
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Learning Content</h2>
        <Badge variant="secondary" className="text-sm">
          {chapters.length} Chapters
        </Badge>
      </div>
      
      <div className="space-y-4">
        {chapters.map((chapter, chapterIndex) => (
          <Card key={chapterIndex} className="bg-card/80 backdrop-blur-sm overflow-hidden">
            <Collapsible open={openChapters.has(chapterIndex)}>
              <CollapsibleTrigger asChild>
                <CardHeader 
                  className="cursor-pointer hover:bg-muted/20 transition-colors p-4"
                  onClick={() => toggleChapter(chapterIndex)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {openChapters.has(chapterIndex) ? (
                        <ChevronDown className="h-5 w-5 text-primary" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                      <CardTitle className="text-lg">{chapter.title}</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {chapter.videos.length} videos
                    </Badge>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="p-0">
                  <div className="space-y-2 p-4 pt-0">
                    {chapter.videos.map((video, videoIndex) => (
                      <Card key={videoIndex} className="bg-muted/10 hover:bg-muted/20 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium mb-2 line-clamp-2">{video.title}</h4>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{video.views}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <ThumbsUp className="h-3 w-3" />
                                  <span>{video.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageCircle className="h-3 w-3" />
                                  <span>{video.comments}</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              onClick={() => onVideoClick(video.videoId, video.title)}
                              className="ml-4 bg-gradient-primary hover:opacity-90 transition-opacity"
                              size="sm"
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Watch
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};