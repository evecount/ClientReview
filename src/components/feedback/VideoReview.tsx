
"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Asset, FeedbackLog } from '@/lib/types';
import { MessageSquare, Play, Pause, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface VideoReviewProps {
  asset: Asset;
  onAddFeedback: (feedback: Omit<FeedbackLog, 'id' | 'timestamp'>) => void;
}

export function VideoReview({ asset, onAddFeedback }: VideoReviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, []);

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleAddComment = () => {
    if (!comment) return;
    onAddFeedback({
      author: 'Client',
      comment,
      videoTime: currentTime
    });
    setComment("");
  };

  const seekTo = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-4">
        <div className="relative rounded-xl overflow-hidden bg-black aspect-video group shadow-2xl">
          <video 
            ref={videoRef}
            src={asset.url}
            className="w-full h-full"
            onClick={handleTogglePlay}
          />
          
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4 text-white">
              <Button size="icon" variant="ghost" className="hover:bg-white/20" onClick={handleTogglePlay}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <div className="flex-1 h-1.5 bg-white/30 rounded-full relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-accent rounded-full" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono">
                {Math.floor(currentTime)}s / {Math.floor(duration)}s
              </span>
            </div>
          </div>
        </div>

        <Card className="border-none shadow-md">
          <CardContent className="pt-6 flex gap-3">
            <Input 
              placeholder={`Add comment at ${Math.floor(currentTime)}s...`} 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddComment} className="bg-primary hover:bg-primary/90">
              Post Comment
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 flex flex-col h-[500px]">
        <h3 className="text-lg font-headline font-semibold mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Feedback Logs
        </h3>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-muted">
          {asset.feedback.map((log) => (
            <div 
              key={log.id} 
              className="p-3 bg-white rounded-lg border hover:border-accent cursor-pointer transition-all shadow-sm"
              onClick={() => log.videoTime !== undefined && seekTo(log.videoTime)}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-xs text-primary">{log.author}</span>
                <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full font-mono">
                  {Math.floor(log.videoTime || 0)}s
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{log.comment}</p>
            </div>
          ))}
          {asset.feedback.length === 0 && (
            <div className="text-center py-10 text-muted-foreground text-sm italic">
              No feedback yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
