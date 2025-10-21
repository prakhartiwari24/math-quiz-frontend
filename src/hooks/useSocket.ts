import { useEffect, useRef } from "react";
import { socketService } from "../services/socket";
import { useQuizStore } from "../store/quizStore";

export const useSocket = () => {
  const {
    setConnected,
    setConnectionStatus,
    setQuizState,
    setActiveUsers,
    setLeaderboard,
    setCurrentQuestion,
    setGameState,
    resetGameState,
  } = useQuizStore();

  const socketRef = useRef(socketService.getSocket());

  useEffect(() => {
    const socket = socketService.connect();
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      setConnectionStatus("connected");
    });

    socket.on("disconnect", () => {
      setConnected(false);
      setConnectionStatus("disconnected");
    });

    socket.on("connect_error", () => {
      setConnected(false);
      setConnectionStatus("reconnecting");
    });

    socket.on("quiz-state", (data) => {
      setQuizState(data);
      setGameState("playing");
    });

    socket.on("user-count-update", (data) => {
      setActiveUsers(data.activeUsers);
    });

    socket.on("question-solved", (data) => {
      setCurrentQuestion(data.newQuestion);
      setLeaderboard(data.leaderboard);
      setActiveUsers(data.activeUsers);
      setGameState("playing");
    });

    socket.on("answer-feedback", (data) => {
      setGameState("playing");
      if (data.isCorrect) {
        console.log("Correct answer!", data.message);
      } else {
        console.log("Incorrect:", data.message);
      }
    });

    socket.on("answer-error", (error) => {
      setGameState("playing");
      console.error("Answer error:", error);
    });

    socket.on("leaderboard-update", (data) => {
      setLeaderboard(data);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("quiz-state");
      socket.off("user-count-update");
      socket.off("question-solved");
      socket.off("answer-feedback");
      socket.off("answer-error");
      socket.off("leaderboard-update");
      socket.off("error");
    };
  }, []);

  const joinQuiz = (username: string) => {
    socketService.emit("join-quiz", { username });
  };

  const submitAnswer = (answer: string, userId: string) => {
    socketService.emit("submit-answer", {
      answer,
      clientTimestamp: Date.now(),
      userId,
    });
  };

  const getQuizState = () => {
    socketService.emit("get-quiz-state");
  };

  const getLeaderboard = (limit = 10) => {
    socketService.emit("get-leaderboard", { limit });
  };

  const resetGame = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/quiz/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Game reset successfully");
        // Reset only game-related state, preserve connection status
        resetGameState();
      } else {
        console.error("Failed to reset game:", response.statusText);
      }
    } catch (error) {
      console.error("Error resetting game:", error);
    }
  };

  return {
    socket: socketRef.current,
    joinQuiz,
    submitAnswer,
    getQuizState,
    getLeaderboard,
    resetGame,
    isConnected: socketService.isConnected(),
  };
};
