"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import GameMusicPlayer from "@/components/game-music-player";

interface DinosaurSubtractionProps {
  onBack: () => void;
}

const dinosaurs = ["🦕", "🦖", "🦴", "🥚", "🌋", "🌿", "🦎", "🐊"];

export default function DinosaurSubtraction({
  onBack,
}: DinosaurSubtractionProps) {
  const [questionCount, setQuestionCount] = useState(0);
  const MAX_QUESTIONS = 10;
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const generateQuestion = () => {
    if (questionCount >= MAX_QUESTIONS) {
      setGameComplete(true);
      return;
    }

    const n1 = Math.floor(Math.random() * 8) + 3;
    const n2 = Math.floor(Math.random() * n1) + 1;
    const answer = n1 - n2;

    setNum1(n1);
    setNum2(n2);
    setCorrectAnswer(answer);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setQuestionCount(questionCount + 1);

    const opts = [answer];
    while (opts.length < 3) {
      const opt = Math.floor(Math.random() * 10);
      if (!opts.includes(opt) && opt >= 0) opts.push(opt);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    if (answer === correctAnswer) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setScore(score + 1);
      setTimeout(generateQuestion, 1500);
    } else {
      setShowCorrectAnswer(true);
      setTimeout(generateQuestion, 2500);
    }
  };

  const randomDino1 = dinosaurs[Math.floor(Math.random() * dinosaurs.length)];
  const randomDino2 = dinosaurs[Math.floor(Math.random() * dinosaurs.length)];

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-emerald-900/40 to-teal-900/50" />
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute text-xl sm:text-2xl md:text-3xl opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              {
                ["🌴", "🌿", "🍃", "🦜", "🐒", "🦕", "🦖"][
                  Math.floor(Math.random() * 7)
                ]
              }
            </div>
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
        <GameMusicPlayer musicUrl="/components/song/6-Happy-Commercial-Piano(chosic.com).mp3" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-emerald-900/40 to-teal-900/50" />

      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xl sm:text-2xl md:text-3xl opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            {
              ["🌴", "🌿", "🍃", "🦜", "🐒", "🦕", "🦖"][
                Math.floor(Math.random() * 7)
              ]
            }
          </div>
        ))}
      </div>

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

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-orange-500/50 shadow-2xl shadow-orange-500/20 p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-4 sm:mb-6 md:mb-8">
            Restas con Dinosaurios
          </h2>

          {showCorrectAnswer && selectedAnswer !== correctAnswer && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-yellow-500/20 border-2 border-yellow-500 rounded-xl text-center">
              <p className="text-yellow-300 text-base sm:text-lg md:text-xl font-bold">
                La respuesta correcta es: {correctAnswer}
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12">
            <div className="flex flex-wrap gap-1 sm:gap-2 justify-center max-w-[45%] sm:max-w-none">
              {[...Array(num1)].map((_, i) => (
                <div
                  key={i}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {randomDino1}
                </div>
              ))}
            </div>

            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-orange-400 shrink-0">
              -
            </div>

            <div className="flex flex-wrap gap-1 sm:gap-2 justify-center max-w-[45%] sm:max-w-none">
              {[...Array(num2)].map((_, i) => (
                <div
                  key={i}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-bounce opacity-50"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {randomDino2}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {options.map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`h-16 sm:h-20 md:h-24 text-2xl sm:text-3xl md:text-4xl font-bold rounded-xl sm:rounded-2xl transition-all duration-300 ${
                  selectedAnswer === option
                    ? option === correctAnswer
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 scale-110"
                      : "bg-gradient-to-r from-red-500 to-rose-500 scale-90"
                    : showCorrectAnswer && option === correctAnswer
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 ring-4 ring-green-300"
                    : "bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-105"
                } text-white shadow-lg`}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <GameMusicPlayer musicUrl="/song/6-Happy-Commercial-Piano(chosic.com).mp3" />
    </div>
  );
}
