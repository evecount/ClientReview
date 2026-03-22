
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ClientGate({ params }: { params: { projectId: string } }) {
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validate against DB. For demo, we just check if it matches mock 'view'
    if (password === 'view' || password === 'demo') {
      router.push(`/client/${params.projectId}/room`);
    } else {
      setIsError(true);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-md w-full border-none shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline font-bold text-primary">Private Client Portal</CardTitle>
          <CardDescription>
            Please enter your project passcode to view your studio deliverables.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input 
                type="password" 
                placeholder="Enter Passcode (use 'view')" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsError(false);
                }}
                className={isError ? "border-destructive" : ""}
              />
              {isError && (
                <p className="text-xs text-destructive font-medium">Invalid passcode. Please check with your account manager.</p>
              )}
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6">
              Enter Room <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-xs text-muted-foreground font-medium">Powerered by ClientReview White-Label</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
