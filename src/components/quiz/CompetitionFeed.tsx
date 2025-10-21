import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Clock, Target } from "lucide-react";
import { useSocket } from "../../hooks/useSocket";

interface FeedItem {
  id: string;
  type: "winner" | "join" | "answer";
  message: string;
  timestamp: Date;
  data?: any;
}

export const CompetitionFeed = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const addFeedItem = (item: Omit<FeedItem, "id" | "timestamp">) => {
      const newItem: FeedItem = {
        ...item,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
      };

      setFeedItems((prev) => [newItem, ...prev.slice(0, 9)]);
    };

    socket.on("question-solved", (data) => {
      addFeedItem({
        type: "winner",
        message: `${data.winner.username} solved it in ${(
          data.winner.responseTime / 1000
        ).toFixed(1)}s!`,
        data: data.winner,
      });
    });

    socket.on("user-joined-broadcast", (data) => {
      addFeedItem({
        type: "join",
        message: `${data.username} joined the competition`,
      });
    });

    socket.on("answer-feedback", (data) => {
      if (data.isCorreect && data.pointsEarned) {
        addFeedItem({
          type: "answer",
          message: `You earned ${data.pointsEarned} points!`,
        });
      }
    });

    return () => {
      socket.off("question-solved");
      socket.off("user-joined-broadcast");
      socket.off("answer-feedback");
    };
  }, [socket]);

  const getIcon = (type: string) => {
    switch (type) {
      case "winner":
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case "join":
        return <Target className="w-4 h-4 text-blue-500" />;
      case "answer":
        return <Clock className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Live Feed</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {feedItems.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">
            Competition activity will appear here
          </div>
        ) : (
          feedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-2 rounded-lg bg-muted/50"
            >
              {getIcon(item.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm">{item.message}</p>
                <p className="text-xs text-muted-foreground">
                  {formatTime(item.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
