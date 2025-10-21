import { create } from "zustand";
import { QuizState, Question, LeaderboardEntry } from "../types/quiz.types";
import { User } from "../types/user.types";

interface QuizStore {
  user: User | null;
  currentQuestion: Question | null;
  leaderboard: LeaderboardEntry[];
  activeUsers: number;
  sessionId: string | null;
  isConnected: boolean;
  connectionStatus: string;
  gameState: "waiting" | "playing" | "answered";
  lastAnswer: string;

  setUser: (user: User) => void;
  setQuizState: (state: QuizState) => void;
  setCurrentQuestion: (question: Question | null) => void;
  setLeaderboard: (leaderboard: LeaderboardEntry[]) => void;
  setActiveUsers: (count: number) => void;
  setConnectionStatus: (status: string) => void;
  setConnected: (connected: boolean) => void;
  setGameState: (state: "waiting" | "playing" | "answered") => void;
  setLastAnswer: (answer: string) => void;
  reset: () => void;
  resetGameState: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  user: null,
  currentQuestion: null,
  leaderboard: [],
  activeUsers: 0,
  sessionId: null,
  isConnected: false,
  connectionStatus: "disconnected",
  gameState: "waiting",
  lastAnswer: "",

  setUser: (user) => set({ user }),

  setQuizState: (state) =>
    set({
      currentQuestion: state.currentQuestion,
      leaderboard: state.leaderboard,
      activeUsers: state.activeUsers,
      sessionId: state.sessionId,
      gameState: "playing",
    }),

  setCurrentQuestion: (question) =>
    set({
      currentQuestion: question,
      gameState: question ? "playing" : "waiting",
    }),

  setLeaderboard: (leaderboard) => set({ leaderboard }),

  setActiveUsers: (count) => set({ activeUsers: count }),

  setConnectionStatus: (status) => set({ connectionStatus: status }),

  setConnected: (connected) => set({ isConnected: connected }),

  setGameState: (state) => set({ gameState: state }),

  setLastAnswer: (answer) => set({ lastAnswer: answer }),

  reset: () =>
    set({
      user: null,
      currentQuestion: null,
      leaderboard: [],
      activeUsers: 0,
      sessionId: null,
      isConnected: false,
      connectionStatus: "disconnected",
      gameState: "waiting",
      lastAnswer: "",
    }),

  resetGameState: () =>
    set({
      user: null,
      currentQuestion: null,
      leaderboard: [],
      activeUsers: 0,
      sessionId: null,
      gameState: "waiting",
      lastAnswer: "",
    }),
}));
