import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/hooks/useSocket";
import { useQuizStore } from "@/store/quizStore";

interface UsernameFormProps {
  onJoin: (userData: any) => void;
}

export const UsernameForm = ({ onJoin }: UsernameFormProps) => {
  const [username, setUsername] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const { joinQuiz, isConnected, socket } = useSocket();
  const { connectionStatus } = useQuizStore();

  useEffect(() => {
    if (!socket) return;

    const handleUserJoined = (data: any) => {
      console.log("received user-joined:", data);
      setIsJoining(false);
      useQuizStore.getState().setUser({
        id: data.userId,
        username: data.username,
        total_score: data.userStats.totalScore,
        questions_answered: data.userStats.questionsAnswered,
        average_response_time: data.userStats.averageResponseTime,
        best_response_time: data.userStats.bestResponseTime,
        created_at: new Date().toISOString(),
      });
      onJoin(data);
    };

    const handleJoinError = (error: any) => {
      console.error("join error:", error);
      setIsJoining(false);
    };

    socket.on("user-joined", handleUserJoined);
    socket.on("join-error", handleJoinError);

    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("join-error", handleJoinError);
    };
  }, [socket, onJoin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || username.length < 2 || !isConnected || isJoining)
      return;

    console.log("=== SOCKET EMIT ===");
    console.log("Event: join-quiz");
    console.log("Data:", { username: username.trim() });
    console.log("Socket connected:", isConnected);

    setIsJoining(true);
    joinQuiz(username.trim());
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    if (value.length <= 20) {
      setUsername(value);
    }
  };

  const isValid = username.trim().length >= 2 && username.trim().length <= 20;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Competitive Math Quiz</CardTitle>
          <p className="text-muted-foreground">
            Test your math skills against other players in real-time
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                connectionStatus === "connected"
                  ? "bg-green-100 text-green-800"
                  : connectionStatus === "connecting" ||
                    connectionStatus === "reconnecting"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  connectionStatus === "connected"
                    ? "bg-green-500"
                    : connectionStatus === "connecting" ||
                      connectionStatus === "reconnecting"
                    ? "bg-yellow-500 animate-pulse"
                    : "bg-red-500"
                }`}
              />
              {connectionStatus === "connected"
                ? "Connected"
                : connectionStatus === "connecting"
                ? "Connecting..."
                : connectionStatus === "reconnecting"
                ? "Reconnecting..."
                : "Disconnected"}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
                disabled={isJoining || !isConnected}
                className="text-center"
                autoFocus
              />
              <p className="text-xs text-muted-foreground mt-1 text-center">
                2–20 characters, letters and numbers only
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!isValid || isJoining || !isConnected}
            >
              {isJoining ? "Joining..." : "Join Quiz"}
            </Button>
          </form>

          {!isConnected && (
            <p className="text-sm text-destructive text-center">
              Unable to connect to quiz server. Please check your connection.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
