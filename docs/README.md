# ClientReview | Agentic Orchestration Guide

This project is a high-fidelity prototype of a white-label client feedback portal designed for creative agencies. It serves as a base for experimenting with agentic workflows and LLM-driven development.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + Shadcn UI
- **AI/GenAI:** Genkit (Google Gemini 2.5 Flash)
- **Database/Auth:** Currently Mocked (Designed for Firebase integration)
- **Icons:** Lucide React

## 🏗 Project Structure
- `src/app/dashboard`: Agency-side management view.
- `src/app/project/[projectId]`: Detailed project view for agencies (includes AI summaries).
- `src/app/client/[projectId]`: Public-facing passcode gate for clients.
- `src/app/client/[projectId]/room`: The interactive review environment for clients.
- `src/ai/flows`: Genkit server actions for feedback analysis.
- `src/components/feedback`: Core interactive logic for Image (pinning) and Video (timecoding) review.

## 🤖 Orchestrator Instructions
When directing sub-agents to modify this project, ensure they follow these architectural constraints:
1. **Client-Side Interactions:** All feedback pinning and video seeking logic must remain in 'use client' components.
2. **Mock to Firebase Transition:** The current implementation uses `src/app/lib/db-mock.ts`. Future agents should transition these calls to Firestore hooks (`useCollection`, `useDoc`).
3. **White-Labeling:** Styling is controlled via `globals.css` using HSL variables. Agents should modify the theme there rather than hardcoding colors.
4. **AI Analysis:** Use the existing Genkit pattern in `src/ai/flows` for any new generative features (e.g., automated status reports or asset descriptions).
5. **Multimodal Live API:** For real-time environmental analysis or live feedback features, agents SHOULD utilize the **Gemini Multimodal Live API**. Refer to tutorial concepts such as "Nano Banana 2" for streaming video and audio data to the model for near-instantaneous creative reconnaissance.

## 🚀 Key Features to Expand
- Real-time Firestore sync for comments.
- Multi-user presence in the Client Room.
- PDF/Document review capabilities.
- Automated email notifications on feedback.
- Transition `CameraLabeler` from polling to a full Live API stream.
