
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 py-6 border-b bg-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <span className="font-headline font-bold text-xl text-primary tracking-tight">ClientReview</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#" className="hover:text-primary">Features</Link>
          <Link href="#" className="hover:text-primary">Pricing</Link>
          <Link href="#" className="hover:text-primary">Showcase</Link>
        </nav>
        <Link href="/dashboard">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
            Agency Login
          </Button>
        </Link>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-white to-background">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary leading-tight">
            White-Label <span className="text-accent">Client Feedback</span> Made Elegant
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The premium presentation portal for creative studios. Gated client rooms, timecoded feedback, and seamless approvals for your high-res assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/dashboard">
              <Button size="lg" className="px-8 h-14 text-lg bg-primary hover:bg-primary/90 rounded-full shadow-lg">
                Create Agency Portal
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="px-8 h-14 text-lg text-primary hover:bg-primary/5 rounded-full">
              Book a Demo
            </Button>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 text-left space-y-4">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
              <ShieldCheck className="text-accent h-6 w-6" />
            </div>
            <h3 className="font-headline font-bold text-xl">Gated Rooms</h3>
            <p className="text-muted-foreground text-sm">Secure, password-protected galleries branded for your specific clients.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 text-left space-y-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <Zap className="text-primary h-6 w-6" />
            </div>
            <h3 className="font-headline font-bold text-xl">Precise Feedback</h3>
            <p className="text-muted-foreground text-sm">Drop pins on images or timecode video timestamps for zero confusion.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 text-left space-y-4">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
              <Users className="text-accent h-6 w-6" />
            </div>
            <h3 className="font-headline font-bold text-xl">Multi-Tenant</h3>
            <p className="text-muted-foreground text-sm">Manage hundreds of projects and clients from a single professional dashboard.</p>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t bg-white px-6 text-center text-sm text-muted-foreground">
        © 2024 ClientReview Inc. Built for top-tier creative agencies.
      </footer>
    </main>
  );
}
