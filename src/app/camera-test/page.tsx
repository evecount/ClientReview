import React from 'react';
import { CameraLabeler } from '@/components/camera/CameraLabeler';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CameraTestPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="px-8 py-6 border-b bg-white flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button size="icon" variant="ghost">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-headline font-bold text-xl text-primary">Live Asset Discovery</h1>
        </div>
        <div className="text-xs font-mono bg-secondary px-3 py-1 rounded-full text-muted-foreground uppercase tracking-widest">
          Experiment: Multi-modal AI
        </div>
      </header>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto text-center mb-12 space-y-4">
          <h2 className="text-4xl font-headline font-bold text-primary">Environmental Analysis</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use your device's camera to identify objects and aesthetics in your physical space. 
            Perfect for creative reconnaissance and location scouting.
          </p>
        </div>
        
        <CameraLabeler />
      </section>
    </main>
  );
}
