# Original Project Specification

**Project Name:** ClientReview
**Objective:** Create a premium, white-label presentation and feedback portal for creative professionals and agencies.

## Core Requirements

### 1. Branding & Feel
- Minimalist, professional aesthetic using a deep blue (`#455CA1`) and a sky blue accent (`#73BDF3`).
- Use "Space Grotesk" for headlines and "Inter" for body text.
- Components should feel "elevated" with soft shadows and rounded corners.

### 2. Agency Dashboard
- A high-level view showing active projects, pending files, and recent approvals.
- Project cards showing thumbnails of the latest work.

### 3. Gated Client Rooms
- Clients access their work via a specific URL (e.g., `/client/proj-123`).
- A simple passcode entry page to protect intellectual property.
- A "Room" interface where clients can switch between different assets (images and videos).

### 4. Interactive Feedback
- **Image Review:** Clients should be able to click anywhere on an image to drop a "Pin" and leave a comment.
- **Video Review:** A custom video player that allows users to leave comments tied to specific timestamps.
- **Feedback Log:** A sidebar tracking all comments for the currently selected asset.

### 5. AI Intelligence
- Implement an "AI Feedback Intelligence" feature for the agency side.
- It should summarize long lists of client comments into concise, actionable bullet points using Genkit.

### 6. Technical Constraints
- Built with Next.js 15.
- Use Shadcn UI for all standard components.
- Prepare the structure for Firebase integration but start with a robust mock data layer for rapid prototyping.
