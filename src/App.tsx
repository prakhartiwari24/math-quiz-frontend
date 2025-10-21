import { useState, useEffect } from "react";
import { useSocket } from "./hooks/useSocket";
import { useQuizStore } from "./store/quizStore";

import { QuestionDisplay } from "./components/quiz/QuestionDisplay";
import { AnswerInput } from "./components/quiz/AnswerInput";
import { Leaderboard } from "./components/quiz/Leaderboard";
import { CompetitionFeed } from "./components/quiz/CompetitionFeed";
import { UsernameForm } from "./auth/UsernameForm";
import { Header } from "./layout/Header";

function App() {
  const [hasJoined, setHasJoined] = useState(false);
  const { user } = useQuizStore();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("user-joined", (data) => {
      console.log("User joined successfully:", data);

      useQuizStore.getState().setUser({
        id: data.userId,
        username: data.username,
        total_score: data.userStats.totalScore,
        questions_answered: data.userStats.questionsAnswered,
        average_response_time: data.userStats.averageResponseTime,
        best_response_time: data.userStats.bestResponseTime,
        created_at: new Date().toISOString(),
      });
      setHasJoined(true);
    });

    socket.on("join-error", (error) => {
      console.error("Failed to join quiz:", error);
      setHasJoined(false);
    });

    return () => {
      socket.off("user-joined");
      socket.off("join-error");
    };
  }, [socket]);

  const handleJoin = () => {};

  if (!hasJoined || !user) {
    return <UsernameForm onJoin={handleJoin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <QuestionDisplay />
            <AnswerInput />
          </div>

          <div className="space-y-6">
            <Leaderboard />
            <CompetitionFeed />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
