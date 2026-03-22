
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Zap, 
  MessageSquare, 
  Video, 
  Palette, 
  Check,
  Star,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col scroll-smooth">
      <header className="px-6 py-6 border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">C</div>
          <span className="font-headline font-bold text-xl text-primary tracking-tight">ClientReview</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#showcase" className="hover:text-primary transition-colors">Showcase</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
        </nav>
        <div className="flex gap-4 items-center">
          <Link href="/onboarding" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="text-accent hover:text-accent hover:bg-accent/10">
              <Zap className="h-4 w-4 mr-2" /> AI Concierge
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
              Agency Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-white to-background">
        <div className="max-w-4xl space-y-8">
          <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-accent/10 text-primary border-accent/20">
            Version 2.0 Now Live • Multimodal AI Experimental
          </Badge>
          <h1 className="text-6xl md:text-8xl font-headline font-bold text-primary leading-tight tracking-tighter">
            The White-Label <span className="text-accent underline decoration-accent/30 underline-offset-8">Feedback</span> Portal
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Premium presentation for elite creative studios. Secure gated rooms, precise timecoded reviews, and agentic AI summaries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/dashboard">
              <Button size="lg" className="px-10 h-16 text-lg bg-primary hover:bg-primary/90 rounded-full shadow-2xl transition-all hover:scale-105">
                Start 14-Day Free Trial
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button size="lg" variant="ghost" className="px-10 h-16 text-lg text-primary hover:bg-primary/5 rounded-full border border-primary/10">
                Talk to AI Concierge
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 relative max-w-5xl w-full">
           <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
           <div className="relative rounded-2xl border bg-white shadow-2xl overflow-hidden aspect-video">
             <img 
               src="https://picsum.photos/seed/agency-hero/1200/800" 
               alt="Dashboard Preview" 
               className="w-full h-full object-cover"
               data-ai-hint="agency dashboard"
             />
           </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl font-headline font-bold text-primary">Engineered for Precision</h2>
            <p className="text-muted-foreground text-lg">Every pixel and frame accounted for. Give your clients the premium experience they expect from a high-tier agency.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl bg-background hover:shadow-xl transition-all border border-border/50 space-y-4 group">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-accent h-6 w-6" />
              </div>
              <h3 className="font-headline font-bold text-xl">Gated Client Rooms</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Secure, password-protected galleries branded for your specific clients. No more messy email threads or generic links.</p>
            </div>
            <div className="p-8 rounded-2xl bg-background hover:shadow-xl transition-all border border-border/50 space-y-4 group">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-headline font-bold text-xl">Precise Image Pins</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Clients click exactly where they want changes. Zero ambiguity. Zero "which logo are you talking about?" questions.</p>
            </div>
            <div className="p-8 rounded-2xl bg-background hover:shadow-xl transition-all border border-border/50 space-y-4 group">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Video className="text-accent h-6 w-6" />
              </div>
              <h3 className="font-headline font-bold text-xl">Video Timecoding</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Frame-accurate feedback for video assets. Comments are pinned to specific seconds, making editing loops 3x faster.</p>
            </div>
            <div className="p-8 rounded-2xl bg-background hover:shadow-xl transition-all border border-border/50 space-y-4 group">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-headline font-bold text-xl">AI Feedback Intel</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Gemini-powered summaries consolidate 50+ nitpicky comments into actionable bullet points for your creative team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-4xl font-headline font-bold text-primary tracking-tight">Showcase of Excellence</h2>
              <p className="text-muted-foreground text-lg">See how top agencies across the globe are presenting their vision using ClientReview.</p>
            </div>
            <Button variant="outline" className="rounded-full border-primary/20 text-primary">View Full Showcase <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all rounded-2xl">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={`https://picsum.photos/seed/project-${i}/600/400`} 
                    alt={`Showcase ${i}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint="creative project"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <Button variant="secondary" size="sm" className="w-full">Preview Room</Button>
                  </div>
                </div>
                <CardContent className="p-6 bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-headline font-bold text-primary">{i === 1 ? 'Skyline Residences' : i === 2 ? 'Eco-System Ad' : 'Urban Muse Branding'}</h4>
                    <Star className="h-4 w-4 text-accent fill-accent" />
                  </div>
                  <p className="text-xs text-muted-foreground">Architectural Visualization • 12 Assets</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-white relative overflow-hidden">
        {/* Background Decorative Blob */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl font-headline font-bold text-primary">Simple, Scalable Pricing</h2>
            <p className="text-muted-foreground text-lg">Choose the tier that fits your agency's project volume.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Boutique */}
            <Card className="flex flex-col border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <CardHeader className="bg-background/50 p-8 border-b">
                <CardTitle className="font-headline text-2xl text-primary">Boutique</CardTitle>
                <CardDescription>Perfect for freelancers and small shops.</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold text-primary">$99</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="p-8 flex-1 space-y-4">
                <ul className="space-y-3">
                  {['10 active projects', 'Basic branding', 'Image pinning', 'Up to 5 team members'].map((f) => (
                    <li key={f} className="flex items-center text-sm gap-3">
                      <Check className="h-4 w-4 text-accent" /> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Button variant="outline" className="w-full rounded-full">Get Started</Button>
              </CardFooter>
            </Card>

            {/* Studio - FEATURED */}
            <Card className="flex flex-col border-accent bg-primary text-white rounded-2xl overflow-hidden shadow-2xl scale-105 z-10">
              <CardHeader className="p-8 border-b border-white/10 relative">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-accent text-accent-foreground text-[10px] font-bold">MOST POPULAR</Badge>
                </div>
                <CardTitle className="font-headline text-2xl">Studio</CardTitle>
                <CardDescription className="text-white/70">The sweet spot for growing creative teams.</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">$249</span>
                  <span className="text-white/70">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="p-8 flex-1 space-y-4">
                <ul className="space-y-3">
                  {['Unlimited projects', 'Full HSL white-labeling', 'Video timecoding', 'AI feedback summaries', 'Up to 20 team members'].map((f) => (
                    <li key={f} className="flex items-center text-sm gap-3">
                      <Check className="h-4 w-4 text-accent" /> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Button className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90">Upgrade to Studio</Button>
              </CardFooter>
            </Card>

            {/* Enterprise */}
            <Card className="flex flex-col border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <CardHeader className="bg-background/50 p-8 border-b">
                <CardTitle className="font-headline text-2xl text-primary">Enterprise</CardTitle>
                <CardDescription>For agencies requiring scale and security.</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
              </CardHeader>
              <CardContent className="p-8 flex-1 space-y-4">
                <ul className="space-y-3">
                  {['SSO / SAML', 'Custom domains', 'Dedicated support', 'Gemini Live API integrations', 'Unlimited team members'].map((f) => (
                    <li key={f} className="flex items-center text-sm gap-3">
                      <Check className="h-4 w-4 text-accent" /> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Button variant="outline" className="w-full rounded-full">Contact Sales</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto space-y-8 px-6">
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Ready to elevate your agency?</h2>
          <p className="text-xl text-white/70">Join 500+ studios delivering world-class creative reviews.</p>
          <div className="pt-6">
            <Link href="/dashboard">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full h-16 px-12 text-lg font-bold">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t bg-white px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xs">C</div>
              <span className="font-headline font-bold text-lg text-primary">ClientReview</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">The premium presentation and feedback portal for creative professionals and agencies.</p>
          </div>
          <div>
            <h5 className="font-bold text-sm mb-4">Product</h5>
            <ul className="text-xs space-y-2 text-muted-foreground font-medium">
              <li><Link href="#features" className="hover:text-primary">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-primary">Pricing</Link></li>
              <li><Link href="#" className="hover:text-primary">Integrations</Link></li>
              <li><Link href="/camera-test" className="hover:text-primary">Experimental Multimodal</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-sm mb-4">Company</h5>
            <ul className="text-xs space-y-2 text-muted-foreground font-medium">
              <li><Link href="#" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary">Legal</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-sm mb-4">Support</h5>
            <ul className="text-xs space-y-2 text-muted-foreground font-medium">
              <li><Link href="#" className="hover:text-primary">Documentation</Link></li>
              <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary">Community</Link></li>
              <li><Link href="/onboarding" className="hover:text-primary">AI Concierge</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-[10px] text-muted-foreground">
          © 2024 ClientReview Inc. Built for top-tier creative agencies. Powered by Gemini Multimodal Intelligence.
        </div>
      </footer>
    </main>
  );
}
