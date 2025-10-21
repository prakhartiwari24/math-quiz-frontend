export interface SocketEvents {
  "join-quiz": (data: { username: string }) => void;
  "submit-answer": (data: {
    answer: string;
    clientTimestamp: number;
    userId: string;
  }) => void;
  "get-quiz-state": () => void;
  "get-leaderboard": (data: { limit?: number }) => void;
  "reset-game": () => void;
  ping: () => void;

  "quiz-state": (data: QuizState) => void;
  "user-joined": (data: {
    userId: string;
    username: string;
    userStats: UserStats;
  }) => void;
  "user-left": (data: { username: string; activeUsers: number }) => void;
  "question-solved": (data: {
    winner: Winner;
    newQuestion: Question;
    leaderboard: LeaderboardEntry[];
    activeUsers: number;
  }) => void;
  "answer-feedback": (data: {
    isCorrect: boolean;
    message: string;
    pointsEarned?: number;
  }) => void;
  "connection-status": (data: { status: string; message: string }) => void;
  "user-count-update": (data: { activeUsers: number }) => void;
  "game-reset": (data: { message: string }) => void;
  pong: (data: { timestamp: number; activeUsers: number }) => void;
  error: (data: { success: false; message: string; timestamp: string }) => void;
}

import { Question, QuizState, LeaderboardEntry, Winner } from "./quiz.types";
import { UserStats } from "./user.types";
