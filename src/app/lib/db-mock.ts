
import { Studio, Project, Asset } from '@/lib/types';

export const MOCK_STUDIO: Studio = {
  id: 'studio-1',
  name: 'Arcane Creative',
  logo: 'https://picsum.photos/seed/studio/100/100',
  projects: [
    {
      id: 'proj-1',
      name: 'Skyline Residence Branding',
      studioId: 'studio-1',
      password: 'view',
      createdAt: '2024-05-10',
      assets: [
        {
          id: 'asset-1',
          type: 'image',
          url: 'https://picsum.photos/seed/arch1/1200/800',
          name: 'Main Lobby Concept',
          status: 'Pending Review',
          feedback: [
            { id: 'f-1', author: 'Client', comment: 'Can we make the lighting warmer here?', timestamp: '2024-05-11', x: 45, y: 30 }
          ]
        },
        {
          id: 'asset-2',
          type: 'image',
          url: 'https://picsum.photos/seed/arch2/1200/800',
          name: 'Facade Night View',
          status: 'Approved',
          feedback: []
        }
      ]
    },
    {
      id: 'proj-2',
      name: 'Eco-System Ad Campaign',
      studioId: 'studio-1',
      password: 'demo',
      createdAt: '2024-05-15',
      assets: [
        {
          id: 'asset-3',
          type: 'video',
          url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
          name: 'Campaign Teaser',
          status: 'Pending Review',
          feedback: [
            { id: 'f-2', author: 'Client', comment: 'Fade out needs to be 2 seconds longer.', timestamp: '2024-05-16', videoTime: 5.5 }
          ]
        }
      ]
    }
  ]
};

export async function getStudio() {
  return MOCK_STUDIO;
}

export async function getProject(id: string) {
  return MOCK_STUDIO.projects.find(p => p.id === id);
}
