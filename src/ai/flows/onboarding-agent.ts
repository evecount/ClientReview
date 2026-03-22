'use server';
/**
 * @fileOverview An onboarding AI agent for the ClientReview platform.
 * 
 * This agent uses tools to provide accurate pricing, ROI estimates, and 
 * feature explanations to prospective agency clients.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// --- TOOLS ---

const getPricingPlans = ai.defineTool(
  {
    name: 'getPricingPlans',
    description: 'Returns the current white-label subscription tiers for agencies.',
    inputSchema: z.void(),
    outputSchema: z.array(z.object({
      tier: z.string(),
      price: z.string(),
      features: z.array(z.string()),
      limit: z.string()
    })),
  },
  async () => [
    {
      tier: 'Boutique',
      price: '$99/mo',
      features: ['10 active projects', 'Basic branding', 'Image pinning'],
      limit: 'Up to 5 team members'
    },
    {
      tier: 'Studio',
      price: '$249/mo',
      features: ['Unlimited projects', 'Full HSL white-labeling', 'Video timecoding', 'AI feedback summaries'],
      limit: 'Up to 20 team members'
    },
    {
      tier: 'Enterprise',
      price: 'Custom',
      features: ['SSO', 'Custom domains', 'Dedicated support', 'Gemini Live API integrations'],
      limit: 'Unlimited everything'
    }
  ]
);

const calculateROI = ai.defineTool(
  {
    name: 'calculateROI',
    description: 'Calculates estimated hours saved and efficiency gains based on an agency\'s monthly project volume.',
    inputSchema: z.object({
      monthlyProjects: z.number().describe('Number of projects the agency manages per month'),
      averageReviewCycles: z.number().describe('Average number of review rounds per asset')
    }),
    outputSchema: z.object({
      hoursSaved: z.number(),
      efficiencyIncrease: z.string(),
      description: z.string()
    }),
  },
  async (input) => {
    const hoursSaved = input.monthlyProjects * input.averageReviewCycles * 2.5; // Arbitrary multiplier
    return {
      hoursSaved,
      efficiencyIncrease: '35%',
      description: `By using precise pins and timecoded feedback, you reduce the "clarification" loop significantly. For ${input.monthlyProjects} projects, we estimate a saving of roughly ${hoursSaved} hours of project management time per month.`
    };
  }
);

// --- FLOW ---

export async function chatWithOnboardingAgent(history: { role: 'user' | 'model', content: string }[], message: string) {
  return onboardingFlow({ history, message });
}

const onboardingFlow = ai.defineFlow(
  {
    name: 'onboardingFlow',
    inputSchema: z.object({
      history: z.array(z.object({
        role: z.enum(['user', 'model']),
        content: z.string()
      })),
      message: z.string()
    }),
    outputSchema: z.object({
      text: z.string(),
    }),
  },
  async (input) => {
    const { text } = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      system: `You are the ClientReview Onboarding Concierge. Your goal is to help agency owners understand the value of our white-label portal.
      
      - Use 'getPricingPlans' if they ask about cost.
      - Use 'calculateROI' if they want to know how much time they'll save.
      - Be professional, premium, and concise.
      - If they ask about the 'Gemini Live API' or 'Multimodal' features, explain that we are currently experimenting with real-time environmental analysis for on-site creative direction.`,
      messages: [
        ...input.history.map(m => ({ role: m.role, content: [{ text: m.content }] })),
        { role: 'user', content: [{ text: input.message }] }
      ],
      tools: [getPricingPlans, calculateROI]
    });

    return { text: text || "I'm here to help you get started with ClientReview." };
  }
);
