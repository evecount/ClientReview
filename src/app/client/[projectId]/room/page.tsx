
"use client";

import React, { useState, useEffect } from 'react';
import { getProject } from '@/app/lib/db-mock';
import { Project, Asset, FeedbackLog } from '@/lib/types';
import { ImageReview } from '@/components/feedback/ImageReview';
import { VideoReview } from '@/components/feedback/VideoReview';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  MessageSquare, 
  ChevronLeft,
  Image as ImageIcon,
  Video as VideoIcon,
  LogOut,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function ClientRoom({ params }: { params: { projectId: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getProject(params.projectId);
      if (data) {
        setProject(data);
        setSelectedAsset(data.assets[0]);
      }
      setIsLoading(false);
    }
    load();
  }, [params.projectId]);

  const handleAddFeedback = (newLog: Omit<FeedbackLog, 'id' | 'timestamp'>) => {
    if (!selectedAsset || !project) return;
    
    const log: FeedbackLog = {
      ...newLog,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: format(new Date(), 'yyyy-MM-dd')
    };

    const updatedAssets = project.assets.map(a => 
      a.id === selectedAsset.id ? { ...a, feedback: [...a.feedback, log] } : a
    );

    setProject({ ...project, assets: updatedAssets });
    setSelectedAsset({ ...selectedAsset, feedback: [...selectedAsset.feedback, log] });
  };

  const handleApprove = () => {
    if (!selectedAsset || !project) return;
    const updatedAssets = project.assets.map(a => 
      a.id === selectedAsset.id ? { ...a, status: 'Approved' as const } : a
    );
    setProject({ ...project, assets: updatedAssets });
    setSelectedAsset({ ...selectedAsset, status: 'Approved' });
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center font-headline text-2xl text-primary animate-pulse">Loading Room...</div>;
  if (!project) return <div>Project not found.</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-8 py-5 border-b bg-white flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">C</div>
            <span className="font-headline font-bold text-lg text-primary">ClientReview</span>
          </div>
          <div className="h-8 w-px bg-border hidden md:block" />
          <h1 className="font-headline font-bold text-xl text-primary hidden md:block">{project.name}</h1>
        </div>
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <LogOut className="h-4 w-4 mr-2" /> Exit Room
          </Button>
        </Link>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Asset Sidebar */}
        <aside className="w-full lg:w-80 bg-white border-r flex flex-col overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="font-headline font-bold text-sm text-primary uppercase tracking-wider">Project Assets</h2>
          </div>
          <div className="flex-1">
            {project.assets.map(asset => (
              <button
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                className={`w-full p-4 flex items-center gap-4 text-left transition-colors border-b hover:bg-accent/5 ${selectedAsset?.id === asset.id ? 'bg-accent/10 border-r-4 border-r-accent' : ''}`}
              >
                <div className="w-16 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                  {asset.type === 'image' ? (
                    <img src={asset.url} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                      <VideoIcon className="h-6 w-6 text-white/40" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-primary truncate">{asset.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={`text-[9px] px-1 py-0 leading-none ${asset.status === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                      {asset.status}
                    </Badge>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Review Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {selectedAsset ? (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {selectedAsset.type === 'image' ? <ImageIcon className="h-5 w-5 text-primary" /> : <VideoIcon className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <h2 className="font-headline font-bold text-xl text-primary">{selectedAsset.name}</h2>
                    <p className="text-xs text-muted-foreground">{selectedAsset.type === 'image' ? 'Image Deliverable' : 'Video Asset'}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  {selectedAsset.status !== 'Approved' ? (
                    <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Approve Asset
                    </Button>
                  ) : (
                    <Badge className="bg-green-600 text-white py-2 px-4 rounded-lg">
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Asset Approved
                    </Badge>
                  )}
                </div>
              </div>

              {selectedAsset.type === 'image' ? (
                <ImageReview asset={selectedAsset} onAddFeedback={handleAddFeedback} />
              ) : (
                <VideoReview asset={selectedAsset} onAddFeedback={handleAddFeedback} />
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center flex-col text-muted-foreground space-y-4">
               <Sparkles className="h-12 w-12 text-accent/40" />
               <p className="font-headline font-semibold">Select an asset to begin review</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
