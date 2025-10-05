"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import GameMusicPlayer from "@/components/game-music-player";

interface MathHangmanProps {
  onBack: () => void;
}

export default function MathHangman({ onBack }: MathHangmanProps) {
  const [questionCount, setQuestionCount] = useState(0);
  const MAX_QUESTIONS = 10;
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState<"+" | "-">("+");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [guessedDigits, setGuessedDigits] = useState<Set<number>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [questionSolved, setQuestionSolved] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const MAX_WRONG = 6;

  const generateQuestion = () => {
    if (questionCount >= MAX_QUESTIONS) {
      setGameComplete(true);
      return;
    }

    const op = Math.random() > 0.5 ? "+" : "-";
    let n1, n2, answer;

    if (op === "+") {
      n1 = Math.floor(Math.random() * 30) + 10;
      n2 = Math.floor(Math.random() * 30) + 10;
      answer = n1 + n2;
    } else {
      n1 = Math.floor(Math.random() * 40) + 20;
      n2 = Math.floor(Math.random() * n1);
      answer = n1 - n2;
    }

    setNum1(n1);
    setNum2(n2);
    setOperation(op);
    setCorrectAnswer(answer);
    setGuessedDigits(new Set());
    setWrongGuesses(0);
    setQuestionSolved(false);
    setGameLost(false);
    setQuestionCount(questionCount + 1);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleGuess = (digit: number) => {
    if (guessedDigits.has(digit) || questionSolved || gameLost) return;

    const newGuessed = new Set(guessedDigits);
    newGuessed.add(digit);
    setGuessedDigits(newGuessed);

    const answerDigits = correctAnswer.toString().split("").map(Number);

    if (!answerDigits.includes(digit)) {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);

      if (newWrong >= MAX_WRONG) {
        setGameLost(true);
        setTimeout(generateQuestion, 3000);
      }
    } else {
      const allDigitsGuessed = answerDigits.every((d) => newGuessed.has(d));
      if (allDigitsGuessed) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setScore(score + 1);
        setQuestionSolved(true);
        setTimeout(generateQuestion, 2000);
      }
    }
  };

  const renderAnswer = () => {
    return correctAnswer
      .toString()
      .split("")
      .map((digit, index) => {
        const digitNum = Number(digit);
        return (
          <div
            key={index}
            className="w-10 h-12 sm:w-12 sm:h-16 md:w-16 md:h-20 bg-white/10 border-2 border-cyan-500/50 rounded-lg sm:rounded-xl flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white"
          >
            {guessedDigits.has(digitNum) || gameLost ? digit : "_"}
          </div>
        );
      });
  };

  const renderHangman = () => {
    const parts = ["😰", "👕", "👖", "👞", "👞", "💀"];
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="text-5xl sm:text-6xl md:text-8xl mb-2 sm:mb-4">
          {wrongGuesses >= MAX_WRONG ? "💀" : "😊"}
        </div>
        <div className="flex gap-1 sm:gap-2">
          {parts.slice(0, wrongGuesses).map((part, i) => (
            <div key={i} className="text-xl sm:text-2xl md:text-3xl">
              {part}
            </div>
          ))}
        </div>
        <p className="text-white text-base sm:text-lg md:text-xl mt-2">
          Errores: {wrongGuesses}/{MAX_WRONG}
        </p>
      </div>
    );
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
        <div className="relative z-10 text-center px-4">
          <div className="text-5xl sm:text-6xl md:text-8xl mb-4 sm:mb-6">
            🏆
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Juego Completado!
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-cyan-300 mb-3 sm:mb-4">
            Acertaste: <span className="text-pink-400 font-bold">{score}</span>{" "}
            de {MAX_QUESTIONS}
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
            Puntuación: {Math.round((score / MAX_QUESTIONS) * 100)}%
          </p>
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white text-base sm:text-lg md:text-xl px-6 sm:px-8 py-4 sm:py-6 rounded-2xl"
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
      <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 opacity-60 animate-pulse" />
      <div
        className="absolute bottom-20 sm:bottom-40 left-10 sm:left-20 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 opacity-50 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Header */}
      <div className="relative z-10 p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm text-sm sm:text-base"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Volver
        </Button>
        <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="bg-gradient-to-r from-cyan-500 to-teal-500 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full border-2 border-white/30 shadow-lg flex-1 sm:flex-none">
            <span className="text-white font-bold text-sm sm:text-base md:text-xl">
              Pregunta {questionCount}/{MAX_QUESTIONS}
            </span>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full border-2 border-white/30 shadow-lg">
            <span className="text-white font-bold text-sm sm:text-base md:text-xl">
              ⭐ {score}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-teal-500/50 shadow-2xl shadow-teal-500/20 p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-4 sm:mb-6 md:mb-8">
            Ahorcado Matematico
          </h2>

          {gameLost && (
            <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-red-500/20 border-2 border-red-500 rounded-xl text-center animate-pulse">
              <p className="text-red-300 text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                Perdiste, vuelve a intentarlo
              </p>
              <p className="text-white text-base sm:text-lg md:text-xl">
                La respuesta era: {correctAnswer}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
            <div className="bg-purple-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-purple-500/30">
              {renderHangman()}
            </div>

            <div className="bg-cyan-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-cyan-500/30 flex flex-col items-center justify-center">
              <p className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4">
                Resuelve:
              </p>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                {num1} {operation} {num2} = ?
              </div>
              <div className="flex gap-1 sm:gap-2">{renderAnswer()}</div>
            </div>
          </div>

          <div className="bg-pink-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-pink-500/30">
            <p className="text-white text-base sm:text-lg md:text-xl mb-3 sm:mb-4 text-center">
              Selecciona un numero:
            </p>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <Button
                  key={digit}
                  onClick={() => handleGuess(digit)}
                  disabled={
                    guessedDigits.has(digit) || questionSolved || gameLost
                  }
                  className={`h-12 sm:h-14 md:h-16 text-xl sm:text-2xl md:text-3xl font-bold rounded-lg sm:rounded-xl transition-all duration-300 ${
                    guessedDigits.has(digit)
                      ? "bg-gray-600 opacity-50 cursor-not-allowed"
                      : "bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105"
                  } text-white shadow-lg`}
                >
                  {digit}
                </Button>
              ))}
            </div>
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
