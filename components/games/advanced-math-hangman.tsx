"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import GameMusicPlayer from "@/components/game-music-player";

interface AdvancedMathHangmanProps {
  onBack: () => void;
}

type Operation = "multiplication" | "division";

export default function AdvancedMathHangman({
  onBack,
}: AdvancedMathHangmanProps) {
  const [questionCount, setQuestionCount] = useState(0);
  const MAX_QUESTIONS = 10;
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState<Operation>("multiplication");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [guessedDigits, setGuessedDigits] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const MAX_WRONG = 6;

  const generateQuestion = () => {
    if (questionCount >= MAX_QUESTIONS) {
      setGameComplete(true);
      return;
    }

    const op: Operation = Math.random() > 0.5 ? "multiplication" : "division";
    setOperation(op);

    if (op === "multiplication") {
      const n1 = Math.floor(Math.random() * 12) + 2;
      const n2 = Math.floor(Math.random() * 12) + 2;
      setNum1(n1);
      setNum2(n2);
      setCorrectAnswer((n1 * n2).toString());
    } else {
      const n2 = Math.floor(Math.random() * 10) + 2;
      const answer = Math.floor(Math.random() * 12) + 2;
      const n1 = n2 * answer;
      setNum1(n1);
      setNum2(n2);
      setCorrectAnswer(answer.toString());
    }

    setGuessedDigits(new Set());
    setWrongGuesses(0);
    setShowGameOver(false);
    setQuestionCount(questionCount + 1);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    const allDigitsGuessed = correctAnswer
      .split("")
      .every((digit) => guessedDigits.has(digit));
    if (allDigitsGuessed && correctAnswer) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setScore(score + 1);
      setTimeout(generateQuestion, 2000);
    }
  }, [guessedDigits, correctAnswer]);

  useEffect(() => {
    if (wrongGuesses >= MAX_WRONG) {
      setShowGameOver(true);
      setTimeout(generateQuestion, 3000);
    }
  }, [wrongGuesses]);

  const handleGuess = (digit: string) => {
    if (guessedDigits.has(digit)) return;

    const newGuessed = new Set(guessedDigits);
    newGuessed.add(digit);
    setGuessedDigits(newGuessed);

    if (!correctAnswer.includes(digit)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const renderAnswer = () => {
    return correctAnswer.split("").map((digit, index) => (
      <div
        key={index}
        className="w-16 h-20 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border-2 border-cyan-400 rounded-xl flex items-center justify-center text-4xl font-bold text-white"
      >
        {guessedDigits.has(digit) ? digit : "_"}
      </div>
    ));
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/40 to-blue-900/50" />
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 text-center">
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Juego Completado!
          </h2>
          <p className="text-2xl text-cyan-300 mb-4">
            Acertaste: <span className="text-pink-400 font-bold">{score}</span>{" "}
            de {MAX_QUESTIONS}
          </p>
          <p className="text-xl text-gray-300 mb-8">
            Puntuación: {Math.round((score / MAX_QUESTIONS) * 100)}%
          </p>
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white text-xl px-8 py-6 rounded-2xl"
          >
            Volver al Menu
          </Button>
        </div>
        <GameMusicPlayer
          theme="space"
          musicUrl="https://uppbeat.io/track/moire/space-ranger"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/40 to-blue-900/50" />

      {/* Animated stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Planets */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 opacity-60 animate-pulse" />
      <div
        className="absolute bottom-32 right-20 w-28 h-28 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 opacity-50 animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 p-6 flex justify-between items-center">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div className="flex gap-4">
          <div className="bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-3 rounded-full border-2 border-white/30 shadow-lg">
            <span className="text-white font-bold text-xl">
              Pregunta {questionCount}/{MAX_QUESTIONS}
            </span>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full border-2 border-white/30 shadow-lg">
            <span className="text-white font-bold text-xl">⭐ {score}</span>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-rose-500 px-6 py-3 rounded-full border-2 border-white/30 shadow-lg">
            <span className="text-white font-bold text-xl">
              ❌ {wrongGuesses}/{MAX_WRONG}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Ahorcado Matematico Avanzado
          </h2>

          {showGameOver && (
            <div className="mb-6 p-6 bg-red-500/20 border-2 border-red-500 rounded-xl text-center">
              <p className="text-red-300 text-2xl font-bold mb-2">
                Perdiste, vuelve a intentarlo
              </p>
              <p className="text-yellow-300 text-xl">
                La respuesta correcta era: {correctAnswer}
              </p>
            </div>
          )}

          <div className="bg-purple-900/40 rounded-2xl p-8 mb-8">
            <p className="text-2xl text-white text-center mb-4">
              Resuelve: {num1} {operation === "multiplication" ? "×" : "÷"}{" "}
              {num2} = ?
            </p>
            <div className="flex justify-center gap-2">{renderAnswer()}</div>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
              <Button
                key={digit}
                onClick={() => handleGuess(digit.toString())}
                disabled={guessedDigits.has(digit.toString()) || showGameOver}
                className={`h-16 text-2xl font-bold rounded-xl transition-all duration-300 ${
                  guessedDigits.has(digit.toString())
                    ? correctAnswer.includes(digit.toString())
                      ? "bg-gradient-to-r from-green-500 to-emerald-500"
                      : "bg-gradient-to-r from-red-500 to-rose-500"
                    : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105"
                } text-white shadow-lg`}
              >
                {digit}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <GameMusicPlayer
        theme="space"
        musicUrl="/song/Space Loop - Another Kid [Audio Library Release] · Free Copyright-safe Music.mp3"
      />
    </div>
  );
}
