# **App Name**: ClientReview

## Core Features:

- Agency Dashboard & Project Creation: An authenticated portal for agencies to create new projects, upload high-resolution deliverables to Firebase Cloud Storage, and securely store asset download URLs in Firestore.
- Gated Client Project Rooms: Generate secure, password-protected URLs for each project, allowing clients to log in and view a clean, branded gallery of their specific assets.
- Timecoded Feedback Engine: A custom media player interface enabling clients to leave precise feedback by capturing X/Y coordinates on images or timestamps on videos, stored in Firestore via the Python Flask backend.
- Approval Workflow: A ' frictionless Approve' button for each asset, which updates its status from 'Pending Review' to 'Approved' in Firestore and notifies the agency in real-time.
- Feedback Summary Tool: Utilize generative AI to provide concise summaries of client feedback threads, assisting agencies in quickly understanding key comments and sentiment.

## Style Guidelines:

- Primary color: Professional Blue (#455CA1), symbolizing trust and clarity for agency branding.
- Background color: Muted Light Blue (#EBEDF9), providing a clean and understated canvas for content.
- Accent color: Vibrant Sky Blue (#73BDF3), used for interactive elements like call-to-action buttons to ensure visibility and user engagement.
- Headline font: 'Space Grotesk' (sans-serif) for a modern, tech-forward, and clear aesthetic. Body font: 'Inter' (sans-serif) for high readability in comments and descriptions.
- Use a consistent set of minimalist, outline-style icons to ensure clarity and intuitive navigation across dashboards and galleries.
- Adopt a clean, grid-based layout for galleries and dashboards, ensuring a focus on visual assets and feedback without clutter. The design should be fully responsive for all device sizes.
- Incorporate subtle, functional animations for state changes (e.g., asset approval, feedback submission) and smooth transitions between pages to enhance user experience.