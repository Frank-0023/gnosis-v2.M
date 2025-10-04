"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import GameMusicPlayer from "@/components/game-music-player";

interface AnimalAdditionProps {
  onBack: () => void;
}

const animals = ["🐶", "🐱", "🐰", "🐻", "🐼", "🦊", "🐨", "🐯"];
const fruits = ["🍎", "🍌", "🍊", "🍇", "🍓", "🍉", "🍑", "🥝"];

export default function AnimalAddition({ onBack }: AnimalAdditionProps) {
  const [questionCount, setQuestionCount] = useState(0);
  const MAX_QUESTIONS = 10;
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [useFruits, setUseFruits] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const generateQuestion = () => {
    if (questionCount >= MAX_QUESTIONS) {
      setGameComplete(true);
      return;
    }

    const n1 = Math.floor(Math.random() * 5) + 1;
    const n2 = Math.floor(Math.random() * 5) + 1;
    const answer = n1 + n2;

    setNum1(n1);
    setNum2(n2);
    setCorrectAnswer(answer);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setUseFruits(Math.random() > 0.5);
    setQuestionCount(questionCount + 1);

    const opts = [answer];
    while (opts.length < 3) {
      const opt = Math.floor(Math.random() * 10) + 1;
      if (!opts.includes(opt)) opts.push(opt);
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

  const items = useFruits ? fruits : animals;
  const randomItem1 = items[Math.floor(Math.random() * items.length)];
  const randomItem2 = items[Math.floor(Math.random() * items.length)];

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-teal-900/40 to-emerald-900/50" />
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              {
                ["🌴", "🌿", "🍃", "🦜", "🐵", "🦋"][
                  Math.floor(Math.random() * 6)
                ]
              }
            </div>
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
          theme="jungle"
          musicUrl="https://www.chosic.com/download-audio/27305/"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-teal-900/40 to-emerald-900/50" />

      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            {
              ["🌴", "🌿", "🍃", "🦜", "🐵", "🦋"][
                Math.floor(Math.random() * 6)
              ]
            }
          </div>
        ))}
      </div>

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
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl border-2 border-pink-500/50 shadow-2xl shadow-pink-500/20 p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Cuanto es?
          </h2>

          {showCorrectAnswer && selectedAnswer !== correctAnswer && (
            <div className="mb-6 p-4 bg-yellow-500/20 border-2 border-yellow-500 rounded-xl text-center">
              <p className="text-yellow-300 text-xl font-bold">
                La respuesta correcta es: {correctAnswer}
              </p>
            </div>
          )}

          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="flex gap-2">
              {[...Array(num1)].map((_, i) => (
                <div
                  key={i}
                  className="text-5xl animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {randomItem1}
                </div>
              ))}
            </div>

            <div className="text-6xl font-bold text-pink-400">+</div>

            <div className="flex gap-2">
              {[...Array(num2)].map((_, i) => (
                <div
                  key={i}
                  className="text-5xl animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {randomItem2}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {options.map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`h-24 text-4xl font-bold rounded-2xl transition-all duration-300 ${
                  selectedAnswer === option
                    ? option === correctAnswer
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 scale-110"
                      : "bg-gradient-to-r from-red-500 to-rose-500 scale-90"
                    : showCorrectAnswer && option === correctAnswer
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 ring-4 ring-green-300"
                    : "bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105"
                } text-white shadow-lg`}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <GameMusicPlayer
        theme="jungle"
        musicUrl="/song/6-Happy-Commercial-Piano(chosic.com).mp3"
      />
    </div>
  );
}
