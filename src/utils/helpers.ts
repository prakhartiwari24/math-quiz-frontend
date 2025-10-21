import { Difficulty } from "../types/quiz.types";

export const formatTime = (milliseconds: number): string => {
  if (milliseconds < 1000) {
    return `${milliseconds}ms`;
  }
  return `${(milliseconds / 1000).toFixed(1)}s`;
};

export const formatScore = (score: number): string => {
  return score.toLocaleString();
};

export const getDifficultyColor = (difficulty: Difficulty): string => {
  const colors = {
    easy: "text-green-600 bg-green-50 border-green-200",
    medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
    hard: "text-red-600 bg-red-50 border-red-200",
  };
  return colors[difficulty];
};

export const validateAnswer = (answer: string): boolean => {
  const trimmed = answer.trim();
  return trimmed.length > 0 && !isNaN(Number(trimmed));
};

export const sanitizeUsername = (username: string): string => {
  return username.replace(/[^a-zA-Z0-9]/g, "").slice(0, 20);
};

export const generateQuestionId = (): string => {
  return `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const calculateResponseTime = (
  startTime: number,
  endTime: number
): number => {
  return Math.max(0, endTime - startTime);
};

export const getRankSuffix = (rank: number): string => {
  if (rank >= 11 && rank <= 13) return "th";
  switch (rank % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
