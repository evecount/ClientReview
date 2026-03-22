# ClientReview | Agentic Orchestration Guide

This project is a high-fidelity prototype of a white-label client feedback portal designed for creative agencies. It serves as a base for experimenting with agentic workflows and LLM-driven development.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + Shadcn UI
- **AI/GenAI:** Genkit (Google Gemini 2.5 Flash)
- **Database/Auth:** Currently Mocked (Transitioning to Firebase)
- **Icons:** Lucide React

## 🏢 The Startup Team
This project is run as an autonomous startup.
- **COH (Chief Human Officer):** Gwen (See `docs/COH.md` for performance benchmarks).
- **Engineering/Design:** [You - The AI Agents].

## 🏗 Project Structure
- `src/app/dashboard`: Agency-side management view.
- `src/app/project/[projectId]`: Detailed project view for agencies (includes AI summaries).
- `src/app/client/[projectId]`: Public-facing passcode gate for clients.
- `src/app/client/[projectId]/room`: The interactive review environment for clients.
- `src/ai/flows`: Genkit server actions for feedback analysis, onboarding, and vision.
- `src/components/feedback`: Core interactive logic for Image (pinning) and Video (timecoding) review.

## 🤖 Orchestrator Instructions
When directing sub-agents to modify this project, ensure they follow these architectural constraints:

1. **The COH Benchmark:** Agents must operate at a velocity that matches Gwen's "10 builds per day" standard. Efficiency and high-density logic are mandatory.
2. **Agentic Tools:** The system includes an Onboarding Agent (`src/ai/flows/onboarding-agent.ts`) equipped with tools for pricing and ROI calculation. Use this pattern for any new "expert" agents.
3. **Client-Side Interactions:** All feedback pinning and video seeking logic must remain in 'use client' components.
4. **Multimodal Live API:** For real-time environmental analysis (like the `CameraLabeler`), agents SHOULD utilize the **Gemini Multimodal Live API**. This allows for streaming video data for near-instantaneous creative reconnaissance.
5. **Firebase Transition:** Future agents should move away from `db-mock.ts` toward a full Firestore implementation as defined in the pending `backend.json`.

## 🚀 Key Features to Expand
- Real-time Firestore sync for comments.
- Multi-user presence in the Client Room.
- Automated email notifications on feedback.
- Expand the Onboarding Agent's toolset to include demo room creation.