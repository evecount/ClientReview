'use server';
/**
 * @fileOverview This file provides a Genkit flow to summarize client feedback comments.
 *
 * - summarizeClientFeedback - A function that summarizes client feedback comments.
 * - SummarizeClientFeedbackInput - The input type for the summarizeClientFeedback function.
 * - SummarizeClientFeedbackOutput - The return type for the summarizeClientFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeClientFeedbackInputSchema = z.object({
  comments: z.array(z.string()).describe('An array of client feedback comments.'),
});
export type SummarizeClientFeedbackInput = z.infer<
  typeof SummarizeClientFeedbackInputSchema
>;

const SummarizeClientFeedbackOutputSchema = z.object({
  summary: z.string().describe('A concise summary of all feedback comments.'),
});
export type SummarizeClientFeedbackOutput = z.infer<
  typeof SummarizeClientFeedbackOutputSchema
>;

export async function summarizeClientFeedback(
  input: SummarizeClientFeedbackInput
): Promise<SummarizeClientFeedbackOutput> {
  return summarizeClientFeedbackFlow(input);
}

const summarizeClientFeedbackPrompt = ai.definePrompt({
  name: 'summarizeClientFeedbackPrompt',
  input: {schema: SummarizeClientFeedbackInputSchema},
  output: {schema: SummarizeClientFeedbackOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing client feedback comments.

Review the following comments and provide a concise summary that captures the key points, common themes, and overall sentiment. Focus on actionable insights and areas that require attention.

Client Feedback Comments:
{{#each comments}}
- {{{this}}}
{{/each}}

Summary:`,
});

const summarizeClientFeedbackFlow = ai.defineFlow(
  {
    name: 'summarizeClientFeedbackFlow',
    inputSchema: SummarizeClientFeedbackInputSchema,
    outputSchema: SummarizeClientFeedbackOutputSchema,
  },
  async input => {
    const {output} = await summarizeClientFeedbackPrompt(input);
    return output!;
  }
);
