import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSocket } from "../../hooks/useSocket";
import { useQuizStore } from "../../store/quizStore";

export const AnswerInput = () => {
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { submitAnswer } = useSocket();
  const { user, gameState, setGameState, setLastAnswer } = useQuizStore();

  useEffect(() => {
    if (gameState === "playing") {
      inputRef.current?.focus();
      setAnswer("");
      setIsSubmitting(false);
    }
  }, [gameState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer.trim() || !user || gameState !== "playing" || isSubmitting)
      return;

    setIsSubmitting(true);
    setGameState("answered");
    setLastAnswer(answer.trim());

    submitAnswer(answer.trim(), user.id);
    setAnswer("");
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState === "playing") {
      setAnswer(e.target.value);
    }
  };

  const isDisabled = gameState !== "playing" || isSubmitting;

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              ref={inputRef}
              type="text"
              placeholder="Enter your answer..."
              value={answer}
              onChange={handleAnswerChange}
              disabled={isDisabled}
              className="text-center text-lg"
              autoComplete="off"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!answer.trim() || isDisabled}
          >
            {isSubmitting ? "Submitting..." : "Submit Answer"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Press Enter to submit quickly
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
