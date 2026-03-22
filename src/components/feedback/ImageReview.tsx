
"use client";

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Asset, FeedbackLog } from '@/lib/types';
import { MessageSquare, MapPin } from 'lucide-react';

interface ImageReviewProps {
  asset: Asset;
  onAddFeedback: (feedback: Omit<FeedbackLog, 'id' | 'timestamp'>) => void;
}

export function ImageReview({ asset, onAddFeedback }: ImageReviewProps) {
  const [pins, setPins] = useState<{ x: number; y: number }[]>([]);
  const [comment, setComment] = useState("");
  const [activePin, setActivePin] = useState<{ x: number; y: number } | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (e: React.MouseEvent) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setActivePin({ x, y });
  };

  const handleAddComment = () => {
    if (!comment || !activePin) return;
    onAddFeedback({
      author: 'Client',
      comment,
      ...activePin
    });
    setComment("");
    setActivePin(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-4">
        <div 
          ref={imageContainerRef}
          className="relative rounded-xl overflow-hidden bg-muted aspect-auto min-h-[400px] cursor-crosshair shadow-2xl group border"
          onClick={handleImageClick}
        >
          <img 
            src={asset.url} 
            alt={asset.name} 
            className="w-full h-auto block select-none"
            draggable={false}
          />
          
          {/* Active Placement Pin */}
          {activePin && (
            <div 
              className="absolute w-6 h-6 -ml-3 -mt-3 bg-accent border-2 border-white rounded-full flex items-center justify-center shadow-lg animate-bounce"
              style={{ left: `${activePin.x}%`, top: `${activePin.y}%` }}
            >
              <MapPin className="h-3 w-3 text-white" />
            </div>
          )}

          {/* Existing Feedback Pins */}
          {asset.feedback.map((log) => log.x !== undefined && (
            <div 
              key={log.id}
              className="absolute group/pin"
              style={{ left: `${log.x}%`, top: `${log.y}%` }}
            >
              <div className="w-5 h-5 -ml-2.5 -mt-2.5 bg-primary border-2 border-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-125 transition-transform" />
              <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded shadow-lg border text-[10px] font-bold whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity z-10">
                {log.author}: {log.comment.substring(0, 20)}...
              </div>
            </div>
          ))}

          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow text-xs font-semibold text-primary">
            Click anywhere on the image to leave feedback
          </div>
        </div>

        <Card className={`border-none shadow-md transition-all ${activePin ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
          <CardContent className="pt-6 flex gap-3">
            <Input 
              placeholder="Describe your feedback here..." 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddComment} className="bg-primary hover:bg-primary/90">
              Save Pin
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 flex flex-col h-[500px]">
        <h3 className="text-lg font-headline font-semibold mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Feedback Logs
        </h3>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {asset.feedback.map((log) => (
            <div key={log.id} className="p-3 bg-white rounded-lg border hover:border-accent transition-all shadow-sm">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-xs text-primary">{log.author}</span>
                <span className="text-[10px] text-muted-foreground">{log.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{log.comment}</p>
            </div>
          ))}
          {asset.feedback.length === 0 && (
            <div className="text-center py-10 text-muted-foreground text-sm italic">
              No pins dropped yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
