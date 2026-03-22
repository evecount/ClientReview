
import { getProject } from '@/app/lib/db-mock';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { FeedbackSummary } from '@/components/feedback/FeedbackSummary';
import { 
  ArrowLeft, 
  Upload, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  FileText,
  Image as ImageIcon,
  Video as VideoIcon
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function AgencyProjectView({ params }: { params: { projectId: string } }) {
  const { projectId } = await params;
  const project = await getProject(projectId);

  if (!project) notFound();

  const allComments = project.assets.flatMap(a => a.feedback.map(f => f.comment));

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b px-8 py-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button size="icon" variant="ghost" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-headline font-bold text-primary">{project.name}</h1>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary" className="text-[10px]">{project.id}</Badge>
                <Badge variant="outline" className="text-[10px]">Client: Skyline Corp</Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/80">
              <Upload className="mr-2 h-4 w-4" /> Upload Deliverables
            </Button>
            <Link href={`/client/${projectId}`}>
              <Button variant="outline">Client View</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList className="bg-white/50 border">
                  <TabsTrigger value="all">All Assets</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-0">
                {project.assets.map(asset => (
                  <Card key={asset.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-video relative bg-muted flex items-center justify-center">
                      {asset.type === 'image' ? (
                        <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                          <VideoIcon className="h-12 w-12 text-white/50" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <Badge className={asset.status === 'Approved' ? 'bg-green-500' : 'bg-amber-500'}>
                          {asset.status === 'Approved' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                          {asset.status}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-primary truncate max-w-[200px]">{asset.name}</h3>
                        {asset.type === 'video' ? <VideoIcon className="h-4 w-4 text-muted-foreground" /> : <ImageIcon className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {asset.feedback.length} Comments
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <aside className="space-y-6">
            <FeedbackSummary comments={allComments} />

            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
              <h3 className="font-headline font-bold text-primary flex items-center gap-2 border-b pb-2">
                <FileText className="h-4 w-4" />
                Project Settings
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Client Access Link</span>
                  <div className="p-2 bg-secondary rounded text-[10px] break-all border font-mono">
                    https://clientreview.app/client/{project.id}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Passcode</span>
                  <div className="p-2 bg-secondary rounded text-[10px] border font-mono font-bold">
                    {project.password}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
