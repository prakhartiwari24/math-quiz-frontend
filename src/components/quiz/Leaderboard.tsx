import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import { useQuizStore } from "../../store/quizStore";

export const Leaderboard = () => {
  const { leaderboard, user } = useQuizStore();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 2:
        return <Medal className="w-4 h-4 text-gray-400" />;
      case 3:
        return <Award className="w-4 h-4 text-amber-600" />;
      default:
        return (
          <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">
            {rank}
          </span>
        );
    }
  };

  const formatTime = (ms: number) => {
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Leaderboard
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {leaderboard.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">
            No players yet. Be the first to answer!
          </div>
        ) : (
          leaderboard.map((player) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                player.id === user?.id
                  ? "bg-primary/10 border-primary"
                  : "bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-3">
                {getRankIcon(player.rank)}
                <div>
                  <div className="font-medium">
                    {player.username}
                    {player.id === user?.id && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        You
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {player.questions_answered} questions answered
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-lg">{player.total_score}</div>
                <div className="text-xs text-muted-foreground">
                  {player.best_response_time &&
                    formatTime(player.best_response_time)}
                </div>
              </div>
            </div>
          ))
        )}

        {leaderboard.length > 0 && (
          <div className="text-center text-xs text-muted-foreground pt-2 border-t">
            Updated in real-time
          </div>
        )}
      </CardContent>
    </Card>
  );
};
