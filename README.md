# ScrumPlan - Sprint Planning Web Application

A modern, mobile-responsive web application for Scrum teams to conduct Sprint Planning and manage their Product Backlog collaboratively.

## Features

### Room-Based Collaboration
- **Create Planning Rooms**: Product Owners create a room and get a unique 6-character invite code
- **Invite via Link or Code**: Share `yoursite.com/join/ABC123` or just the code `ABC123`
- **Persistent Sessions**: Rooms are saved in local storage so you can return later

### Sprint Planning
- **Real-time Poker Planning**: Team members vote on story points using Fibonacci sequence
- **Interactive Backlog**: Drag-and-drop prioritization of user stories
- **Sprint Goal Dashboard**: Prominently display current sprint goals
- **Team Presence**: Avatar row showing active team members

### User Experience
- **Role-Based Access**: Product Owners manage stories; Team Members vote
- **Mobile-First Design**: Fully responsive layout with bottom-sheet menus on mobile
- **Modern UI**: Clean design with smooth transitions and animations

## How It Works

### For Product Owners
1. Visit the home page and click **Create New Room**
2. Enter your name and a room name (e.g., "Sprint 42 Planning")
3. You're now in your planning room with an invite code in the header
4. Click the **Invite** button to copy the code or shareable link
5. Add stories to the backlog and start planning

### For Team Members
1. Click the invite link or visit the home page and click **Join Existing Room**
2. Enter the 6-character invite code and your name
3. You're now in the planning session and can vote on stories

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 3.4
- **Components**: Custom components with accessibility in mind
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: Zustand (with persistence)
- **Forms**: React Hook Form + Zod

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page (create/join room)
│   ├── room/[roomId]/page.tsx # Sprint planning dashboard
│   └── join/[code]/page.tsx   # Invite link handler
├── components/
│   ├── common/               # Button, Card, Avatar, Badge
│   ├── planning/             # PokerCard, PlanningArea
│   ├── backlog/              # StoryCard, StoryModal
│   ├── room/                 # InviteModal
│   ├── auth/                 # RoleToggle
│   └── layout/               # Header, Sidebar, MobileBottomSheet
├── stores/
│   ├── roomStore.ts          # Room management (create, join, invite codes)
│   └── sessionStore.ts       # Session state (votes, current story)
├── hooks/                    # useMediaQuery, useRealtimeUpdates
├── types/                    # TypeScript interfaces
├── utils/                    # Helpers (cn, generateId, constants)
└── styles/                   # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type check
npm run type-check

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to view the application.

## Key Components

| Component | Description |
|-----------|-------------|
| **InviteModal** | Displays invite code and copyable link for sharing |
| **PlanningArea** | Main interface for story estimation with voting |
| **BacklogList** | Searchable backlog with drag-and-drop support |
| **Header** | Room info, invite button, and team presence |
| **MobileBottomSheet** | Mobile-optimized backlog access |

## State Management

Using Zustand with persistence:

- **roomStore**: Manages rooms, participants, invite codes, backlog
- **sessionStore**: Handles current user, votes, UI state

Rooms are persisted to localStorage, allowing users to refresh or return later.

## Responsive Design

- **Mobile (< 640px)**: Bottom-sheet backlog, full-width planning
- **Tablet (< 1024px)**: Collapsible sidebar
- **Desktop (1024px+)**: Side-by-side layout with persistent sidebar

## License

MIT
