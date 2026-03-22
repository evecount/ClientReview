'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Camera, RefreshCw, Sparkles, Loader2, StopCircle } from 'lucide-react';
import { labelSurroundings, LabelSurroundingsOutput } from '@/ai/flows/label-surroundings';
import { useToast } from '@/hooks/use-toast';

export function CameraLabeler() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<LabelSurroundingsOutput | null>(null);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current || isAnalyzing) return;

    setIsAnalyzing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUri = canvas.toDataURL('image/jpeg', 0.8);

      try {
        const response = await labelSurroundings({ photoDataUri: dataUri });
        setResults(response);
      } catch (error) {
        console.error("Analysis error:", error);
        toast({
          variant: 'destructive',
          title: 'AI Analysis Failed',
          description: 'Could not label surroundings at this time.',
        });
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoMode && hasCameraPermission) {
      interval = setInterval(() => {
        if (!isAnalyzing) {
          captureAndAnalyze();
        }
      }, 5000); // Analyze every 5 seconds in auto mode
    }
    return () => clearInterval(interval);
  }, [isAutoMode, hasCameraPermission, isAnalyzing]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto p-4">
      <div className="space-y-4">
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[4/3] shadow-2xl border-4 border-white/10">
          <video 
            ref={videoRef} 
            className="w-full h-full object-cover" 
            autoPlay 
            muted 
            playsInline 
          />
          <canvas ref={canvasRef} className="hidden" />
          
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 px-6">
            <Button 
              size="lg" 
              onClick={captureAndAnalyze} 
              disabled={!hasCameraPermission || isAnalyzing}
              className="bg-primary hover:bg-primary/90 shadow-xl rounded-full h-14 px-8"
            >
              {isAnalyzing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Camera className="mr-2 h-5 w-5" />}
              {isAnalyzing ? 'Analyzing...' : 'Analyze Scene'}
            </Button>
            
            <Button 
              size="lg" 
              variant={isAutoMode ? "destructive" : "secondary"}
              onClick={() => setIsAutoMode(!isAutoMode)}
              disabled={!hasCameraPermission}
              className="shadow-xl rounded-full h-14 w-14 p-0"
            >
              {isAutoMode ? <StopCircle className="h-6 w-6" /> : <RefreshCw className="h-6 w-6" />}
            </Button>
          </div>

          {isAutoMode && (
             <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
               <div className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE AI SCANNING
             </div>
          )}
        </div>

        {hasCameraPermission === false && (
          <Alert variant="destructive">
            <AlertTitle>Camera Access Required</AlertTitle>
            <AlertDescription>
              Please allow camera access to use the live labeling feature.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="space-y-6">
        <Card className="border-none shadow-xl bg-gradient-to-br from-white to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
              <Sparkles className="h-6 w-6 text-accent" />
              Surrounding Intelligence
            </CardTitle>
            <CardDescription>
              AI-driven insights from your live environment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {results ? (
              <>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider">Description</h4>
                  <p className="text-muted-foreground leading-relaxed italic border-l-4 border-accent pl-4 py-1 bg-white/50 rounded-r-lg">
                    "{results.description}"
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider">Identified Elements</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.labels.map((label, i) => (
                      <Badge key={i} variant="secondary" className="px-3 py-1 bg-white border border-border shadow-sm">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider">Suggested Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.suggestedTags.map((tag, i) => (
                      <Badge key={i} className="bg-accent text-accent-foreground">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-muted-foreground text-center space-y-4">
                <div className="p-4 bg-primary/5 rounded-full">
                  <Camera className="h-12 w-12 text-primary/20" />
                </div>
                <p className="max-w-[200px] text-sm">
                  Point your camera at your surroundings and click Analyze to begin.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="p-6 bg-white rounded-2xl border border-dashed border-accent/40 flex items-center gap-4">
           <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 text-accent font-bold">AI</div>
           <div>
             <h4 className="font-bold text-sm text-primary">Multimodal Live Feed</h4>
             <p className="text-xs text-muted-foreground leading-tight">Gemini 2.5 Flash is analyzing your frame in real-time to identify creative elements.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
