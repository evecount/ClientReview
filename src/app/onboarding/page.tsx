'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Send, Bot, User, ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';
import { chatWithOnboardingAgent } from '@/ai/flows/onboarding-agent';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default function OnboardingPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I'm your ClientReview concierge. I can help you understand our pricing, calculate your potential ROI, or walk you through our white-label features. How can I assist your agency today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithOnboardingAgent(messages, userMessage);
      setMessages([...newMessages, { role: 'model', content: response.text }]);
    } catch (error) {
      console.error("Agent Error:", error);
      setMessages([...newMessages, { role: 'model', content: "I'm having a bit of trouble connecting to my knowledge base. Could you try asking that again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="px-8 py-6 border-b bg-white flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button size="icon" variant="ghost">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-headline font-bold text-xl text-primary">Onboarding Concierge</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
          <Zap className="h-3 w-3 text-accent animate-pulse" />
          <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">AI Powered Agent</span>
        </div>
      </header>

      <section className="flex-1 max-w-4xl mx-auto w-full p-6 flex flex-col gap-6">
        <Card className="flex-1 flex flex-col border-none shadow-2xl overflow-hidden bg-white/50 backdrop-blur-sm">
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            <div className="space-y-6">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'model' ? 'bg-primary text-white' : 'bg-accent text-accent-foreground'}`}>
                    {m.role === 'model' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'model' ? 'bg-white shadow-sm border rounded-tl-none' : 'bg-primary text-white rounded-tr-none'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="bg-muted h-12 w-32 rounded-2xl rounded-tl-none" />
                </div>
              )}
            </div>
          </ScrollArea>
          
          <CardContent className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <Input 
                placeholder="Ask about pricing, ROI, or features..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
                disabled={isLoading}
              />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
              <Button 
                variant="outline" 
                size="xs" 
                className="text-[10px] whitespace-nowrap"
                onClick={() => setInput("What are your pricing tiers?")}
              >
                View Pricing
              </Button>
              <Button 
                variant="outline" 
                size="xs" 
                className="text-[10px] whitespace-nowrap"
                onClick={() => setInput("Calculate ROI for an agency doing 15 projects a month.")}
              >
                ROI Calculator
              </Button>
              <Button 
                variant="outline" 
                size="xs" 
                className="text-[10px] whitespace-nowrap"
                onClick={() => setInput("Tell me about white-label branding.")}
              >
                Branding Options
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
