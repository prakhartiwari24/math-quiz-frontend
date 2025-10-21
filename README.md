# Math Quiz Frontend

A real-time competitive math quiz application built with React, TypeScript, and Socket.IO. Challenge other players in live math competitions with instant feedback, leaderboards, and dynamic question generation.

## 🌟 Features

- **Real-time Multiplayer** - Compete with other players simultaneously using WebSocket connections
- **Live Leaderboard** - See rankings update in real-time as players answer questions
- **Dynamic Questions** - Math problems across multiple categories and difficulty levels
- **Instant Feedback** - Get immediate results when submitting answers
- **Competition Feed** - Live updates of player activities and achievements
- **Connection Status** - Visual indicators for network connectivity
- **Game Reset** - Admin functionality to reset game state
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI** - Clean, accessible interface with shadcn/ui components
- **Type Safety** - Full TypeScript implementation for robust development

## 🛠️ Tech Stack

### Core Framework

- **React 19** - Latest React with concurrent features
- **TypeScript 5.9** - Type-safe JavaScript with latest features
- **Vite 7** - Lightning-fast build tool and dev server

### UI Framework & Styling

- **TailwindCSS v4** - Latest utility-first CSS framework
- **shadcn/ui** - High-quality, accessible React components
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful SVG icon library
- **tailwindcss-animate** - Animation utilities for Tailwind

### Real-time Communication

- **Socket.IO Client v4.8** - WebSocket client for real-time features
- **Custom Socket Service** - Abstracted socket management with reconnection logic

### State Management

- **Zustand v5** - Lightweight state management solution
- **Custom Hooks** - Reusable logic for socket connections and quiz state

### Additional Libraries

- **class-variance-authority** - Component variant management
- **clsx & tailwind-merge** - Conditional className utilities

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Backend API** running with Socket.IO support
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/prakhartiwari24/math-quiz-frontend.git
cd math-quiz-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5002/api
VITE_SOCKET_URL=http://localhost:5002/quiz
```

### 4. Run the Application

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

The application will be available at `http://localhost:5173`

## 🎮 How to Play

1. **Enter Username** - Choose a unique username (2-20 characters, alphanumeric only)
2. **Join Quiz** - Click "Join Quiz" to enter the competition
3. **Answer Questions** - Solve math problems as quickly as possible
4. **Compete** - Race against other players for the top spot on the leaderboard
5. **Track Progress** - Monitor your performance and see live updates

## 🏗️ Project Structure

```
src/
├── auth/                 # Authentication components
│   └── UsernameForm.tsx  # Username entry form
├── components/           # Reusable UI components
│   ├── quiz/            # Quiz-specific components
│   │   ├── AnswerInput.tsx      # Answer submission form
│   │   ├── CompetitionFeed.tsx  # Live activity feed
│   │   ├── Leaderboard.tsx      # Player rankings
│   │   └── QuestionDisplay.tsx  # Question presentation
│   └── ui/              # Base UI components (shadcn/ui)
├── hooks/               # Custom React hooks
│   ├── useSocket.ts     # Socket.IO connection management
│   ├── useQuiz.ts       # Quiz state management
│   └── useUser.ts       # User state management
├── layout/              # Layout components
│   └── Header.tsx       # Application header with status
├── services/            # External service integrations
│   ├── api.ts          # HTTP API client
│   └── socket.ts       # Socket.IO service
├── store/               # State management
│   ├── quizStore.ts    # Quiz state (Zustand)
│   └── userStore.ts    # User state (Zustand)
├── types/               # TypeScript type definitions
│   ├── quiz.types.ts   # Quiz-related types
│   ├── socket.types.ts # Socket event types
│   └── user.types.ts   # User-related types
└── utils/               # Utility functions
    ├── constants.ts     # Application constants
    └── helpers.ts       # Helper functions
```

## 🎨 UI Components

This project uses **shadcn/ui** components including:

- **Forms**: Input, Button for user interactions
- **Layout**: Card, Separator for content organization
- **Feedback**: Badge for status indicators
- **Icons**: Lucide React for consistent iconography

## 🔌 Real-time Features

The application implements several real-time features:

- **Live Player Count** - See how many players are currently active
- **Instant Question Updates** - New questions appear immediately for all players
- **Real-time Leaderboard** - Rankings update as players submit answers
- **Connection Status** - Visual feedback for network connectivity
- **Competition Feed** - Live stream of player activities

## 🎯 Question Categories

The quiz supports multiple math categories:

- **Arithmetic** - Basic mathematical operations
- **Mental Math** - Quick calculation challenges
- **Algebra** - Algebraic equations and expressions
- **Geometry** - Geometric problems and calculations

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Variables

For production deployment, set:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_SOCKET_URL=https://your-api-domain.com/quiz
```

## 🔧 Development

### Code Style

The project uses:

- **ESLint** for code linting
- **TypeScript** for type checking
- **Prettier** (recommended) for code formatting

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Socket.IO](https://socket.io/) for real-time communication
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [Lucide](https://lucide.dev/) for the icon library
- [Vite](https://vitejs.dev/) for the blazing fast build tool
