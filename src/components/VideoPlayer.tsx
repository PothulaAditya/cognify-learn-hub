import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  videoTitle: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  isOpen,
  onClose,
  videoId,
  videoTitle,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full bg-card border-border/50 backdrop-blur-sm">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold line-clamp-2 pr-8">
              {videoTitle}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-black/20">
          {videoId && (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>
        
        <div className="text-sm text-muted-foreground mt-2">
          <p>Video from YouTube • Educational content related to your textbook</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};