export interface User {
  id: string;
  username: string;
  total_score: number;
  questions_answered: number;
  average_response_time: number;
  best_response_time?: number;
  created_at: string;
}

export interface UserStats {
  totalScore: number;
  questionsAnswered: number;
  averageResponseTime: number;
  bestResponseTime?: number;
}
