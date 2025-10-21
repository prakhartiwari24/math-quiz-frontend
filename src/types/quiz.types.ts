export type Difficulty = "easy" | "medium" | "hard";
export type QuestionType =
  | "arithmetic"
  | "mental_math"
  | "algebra"
  | "geometry";

export interface Question {
  id: string;
  question_text: string;
  question_type: QuestionType;
  difficulty: Difficulty;
  points: number;
  started_at: string;
}

export interface QuizState {
  currentQuestion: Question;
  activeUsers: number;
  leaderboard: LeaderboardEntry[];
  sessionId: string;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  total_score: number;
  questions_answered: number;
  average_response_time: number;
  best_response_time?: number;
  rank: number;
}

export interface Winner {
  id: string;
  username: string;
  responseTime: number;
  pointsEarned: number;
}

export interface AnswerResult {
  success: boolean;
  isCorrect: boolean;
  message: string;
  winner?: Winner;
  newQuestion?: Question;
  leaderboard?: LeaderboardEntry[];
}
