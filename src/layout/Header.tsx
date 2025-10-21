import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Wifi, WifiOff, RotateCcw } from "lucide-react";
import { useQuizStore } from "@/store/quizStore";
import { useSocket } from "@/hooks/useSocket";

export const Header = () => {
  const { user, activeUsers, isConnected, connectionStatus } = useQuizStore();
  const { resetGame } = useSocket();

  return (
    <Card className="mb-6">
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Math Quiz Competition</h1>
            {user && (
              <p className="text-muted-foreground">
                Welcome back, {user.username}!
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={resetGame}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Game
            </Button>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <Badge variant="secondary">{activeUsers} active</Badge>
            </div>

            <div className="flex items-center gap-2">
              {isConnected ? (
                <Wifi className="w-4 h-4 text-green-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-500" />
              )}
              <Badge
                variant={isConnected ? "default" : "destructive"}
                className="text-xs"
              >
                {connectionStatus}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
