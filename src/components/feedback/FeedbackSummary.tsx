
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { summarizeClientFeedback } from '@/ai/flows/summarize-client-feedback';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeedbackSummaryProps {
  comments: string[];
}

export function FeedbackSummary({ comments }: FeedbackSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (comments.length === 0) return;
    setIsLoading(true);
    try {
      const result = await summarizeClientFeedback({ comments });
      setSummary(result.summary);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (comments.length === 0) return null;

  return (
    <Card className="bg-gradient-to-br from-white to-accent/10 border-accent/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-headline flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          AI Feedback Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent>
        {summary ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              "{summary}"
            </p>
            <Button variant="outline" size="sm" onClick={() => setSummary(null)}>
              Regenerate
            </Button>
          </div>
        ) : (
          <Button 
            onClick={handleSummarize} 
            disabled={isLoading}
            className="bg-accent text-accent-foreground hover:bg-accent/80"
          >
            {isLoading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
            ) : (
              'Summarize 10+ Comments'
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
