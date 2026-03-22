'use server';
/**
 * @fileOverview A multimodal AI agent that labels surroundings from a camera feed.
 *
 * - labelSurroundings - A function that analyzes an image and returns descriptive labels.
 * - LabelSurroundingsInput - The input type for the labelSurroundings function.
 * - LabelSurroundingsOutput - The return type for the labelSurroundings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LabelSurroundingsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo from the camera feed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type LabelSurroundingsInput = z.infer<typeof LabelSurroundingsInputSchema>;

const LabelSurroundingsOutputSchema = z.object({
  labels: z.array(z.string()).describe('A list of primary objects or elements identified in the scene.'),
  description: z.string().describe('A concise professional description of the surroundings, focusing on aesthetic and functional elements.'),
  suggestedTags: z.array(z.string()).describe('Keywords suitable for creative asset tagging.'),
});
export type LabelSurroundingsOutput = z.infer<typeof LabelSurroundingsOutputSchema>;

export async function labelSurroundings(input: LabelSurroundingsInput): Promise<LabelSurroundingsOutput> {
  return labelSurroundingsFlow(input);
}

const labelSurroundingsPrompt = ai.definePrompt({
  name: 'labelSurroundingsPrompt',
  input: {schema: LabelSurroundingsInputSchema},
  output: {schema: LabelSurroundingsOutputSchema},
  prompt: `You are an expert creative director and computer vision assistant.
Analyze the following image from a user's live camera feed. 

Identify the objects, the setting, and the overall aesthetic vibe. 
Provide a list of concise labels, a professional description, and creative tags that could be used for project categorization.

Photo: {{media url=photoDataUri}}`,
});

const labelSurroundingsFlow = ai.defineFlow(
  {
    name: 'labelSurroundingsFlow',
    inputSchema: LabelSurroundingsInputSchema,
    outputSchema: LabelSurroundingsOutputSchema,
  },
  async input => {
    const {output} = await labelSurroundingsPrompt(input);
    return output!;
  }
);
