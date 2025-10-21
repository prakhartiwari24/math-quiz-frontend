import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuizStore } from "../../store/quizStore";
import { DIFFICULTY_COLORS } from "../../utils/constants";

export const QuestionDisplay = () => {
  const { currentQuestion, gameState } = useQuizStore();

  if (!currentQuestion) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-40">
          <div className="text-center text-muted-foreground">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            Waiting for question...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Current Question</CardTitle>
          <div className="flex gap-2">
            <Badge className={DIFFICULTY_COLORS[currentQuestion.difficulty]}>
              {currentQuestion.difficulty}
            </Badge>
            <Badge variant="secondary">{currentQuestion.points} pts</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-primary">
            {currentQuestion.question_text}
          </div>

          <div className="text-sm text-muted-foreground">
            {gameState === "answered" ? (
              <span className="text-green-600">
                Answer submitted! Waiting for results...
              </span>
            ) : (
              "Enter your answer below"
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
