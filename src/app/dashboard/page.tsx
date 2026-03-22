
import { getStudio } from '@/app/lib/db-mock';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Briefcase, FileText, CheckCircle2, MoreVertical, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default async function AgencyDashboard() {
  const studio = await getStudio();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden">
            <img src={studio.logo} alt={studio.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-headline font-bold text-lg text-primary">{studio.name}</h1>
            <p className="text-xs text-muted-foreground">Studio Dashboard</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button size="sm" variant="outline">Settings</Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/80">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>
      </header>

      <main className="flex-1 p-8 space-y-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studio.projects.length}</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Files Pending Review</CardTitle>
              <FileText className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Approvals This Month</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-headline font-bold text-primary">Recent Projects</h2>
            <Link href="#" className="text-sm font-semibold text-accent hover:underline">View All</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studio.projects.map((project) => (
              <Card key={project.id} className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all">
                <div className="h-48 bg-muted relative">
                  <img 
                    src={project.assets[0]?.url || 'https://picsum.photos/seed/placeholder/600/400'} 
                    alt={project.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute top-4 right-4">
                    <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/80 backdrop-blur">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/project/${project.id}`}>
                      <h3 className="font-headline font-bold text-lg text-primary hover:text-accent transition-colors">{project.name}</h3>
                    </Link>
                    <Badge variant="outline" className="text-[10px] font-mono uppercase bg-background">
                      {project.assets.length} Assets
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">Created on {project.createdAt}</p>
                  
                  <div className="flex gap-2 pt-2 border-t">
                    <Link href={`/project/${project.id}`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full text-[11px] h-8">Manage Assets</Button>
                    </Link>
                    <Link href={`/client/${project.id}`} className="flex-1">
                      <Button size="sm" variant="ghost" className="w-full text-[11px] h-8 text-accent hover:bg-accent/10">
                        <ExternalLink className="h-3 w-3 mr-2" /> Client Room
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
