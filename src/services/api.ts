import { API_BASE_URL } from "../utils/constants";
import { User, UserStats } from "../types/user.types";
import { Question, QuizState } from "../types/quiz.types";

class ApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "API request failed");
      }

      return data.data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async createUser(username: string): Promise<User> {
    return this.request<User>("/users", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
  }

  async getUserById(id: string): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }

  async getUserStats(id: string): Promise<UserStats> {
    return this.request<UserStats>(`/users/${id}/stats`);
  }

  async getRandomQuestion(): Promise<Question> {
    return this.request<Question>("/questions/random");
  }

  async generateQuestions(count: number): Promise<Question[]> {
    return this.request<Question[]>(`/questions/generate/${count}`);
  }

  async getQuizState(): Promise<QuizState> {
    return this.request<QuizState>("/quiz/state");
  }

  async getActiveUsers(): Promise<{ count: number }> {
    return this.request<{ count: number }>("/quiz/active-users");
  }

  async cleanupLocks(): Promise<{ message: string }> {
    return this.request<{ message: string }>("/quiz/cleanup-locks", {
      method: "POST",
    });
  }
}

export const apiService = new ApiService();
