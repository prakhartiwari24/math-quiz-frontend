import { create } from "zustand";
import { User, UserStats } from "../types/user.types";

interface UserStore {
  currentUser: User | null;
  userStats: UserStats | null;
  isLoggedIn: boolean;

  setUser: (user: User) => void;
  setUserStats: (stats: UserStats) => void;
  updateUserScore: (points: number) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  userStats: null,
  isLoggedIn: false,

  setUser: (user) =>
    set({
      currentUser: user,
      isLoggedIn: true,
      userStats: {
        totalScore: user.total_score,
        questionsAnswered: user.questions_answered,
        averageResponseTime: user.average_response_time,
        bestResponseTime: user.best_response_time,
      },
    }),

  setUserStats: (stats) => set({ userStats: stats }),

  updateUserScore: (points) => {
    const { currentUser, userStats } = get();
    if (currentUser && userStats) {
      set({
        currentUser: {
          ...currentUser,
          total_score: currentUser.total_score + points,
        },
        userStats: {
          ...userStats,
          totalScore: userStats.totalScore + points,
        },
      });
    }
  },

  clearUser: () =>
    set({
      currentUser: null,
      userStats: null,
      isLoggedIn: false,
    }),
}));
