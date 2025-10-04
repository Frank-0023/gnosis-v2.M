"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import GameMusicPlayer from "@/components/game-music-player";

interface JungleAdventureProps {
  onBack: () => void;
}

export default function JungleAdventure({ onBack }: JungleAdventureProps) {
  const [questionCount, setQuestionCount] = useState(0);
  const MAX_QUESTIONS = 10;
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState<"+" | "-">("+");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const generateQuestion = () => {
    if (questionCount >= MAX_QUESTIONS) {
      setGameComplete(true);
      return;
    }

    const op = Math.random() > 0.5 ? "+" : "-";
    let n1, n2, answer;

    if (op === "+") {
      n1 = Math.floor(Math.random() * 20) + 10;
      n2 = Math.floor(Math.random() * 20) + 10;
      answer = n1 + n2;
    } else {
      n1 = Math.floor(Math.random() * 30) + 20;
      n2 = Math.floor(Math.random() * n1);
      answer = n1 - n2;
    }

    setNum1(n1);
    setNum2(n2);
    setOperation(op);
    setCorrectAnswer(answer);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setQuestionCount(questionCount + 1);

    const opts = [answer];
    while (opts.length < 3) {
      const opt = answer + Math.floor(Math.random() * 20) - 10;
      if (!opts.includes(opt) && opt > 0) opts.push(opt);
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
      if ((score + 1) % 5 === 0) setLevel(level + 1);
      setTimeout(generateQuestion, 1500);
    } else {
      setShowCorrectAnswer(true);
      setTimeout(generateQuestion, 2500);
    }
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/jungle-background.png"
            alt="Jungle"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/50 via-green-900/40 to-blue-900/50" />
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
      <div className="absolute inset-0">
        <img
          src="/jungle-background.png"
          alt="Jungle"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/50 via-green-900/40 to-blue-900/50" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-32 h-full bg-gradient-to-b from-cyan-400/40 to-transparent blur-xl" />
        <div className="absolute top-0 right-1/3 w-24 h-full bg-gradient-to-b from-blue-400/30 to-transparent blur-xl" />
      </div>

      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            {
              ["🌴", "🌿", "🍃", "🦜", "🐵", "🦋", "🌺"][
                Math.floor(Math.random() * 7)
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
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 rounded-full border-2 border-white/30 shadow-lg">
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
        <div className="bg-gradient-to-br from-amber-800/40 to-amber-900/40 backdrop-blur-xl rounded-3xl border-4 border-amber-600/50 shadow-2xl shadow-amber-500/20 p-8">
          <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl p-6 mb-8 border-4 border-amber-600 shadow-lg">
            <h2 className="text-3xl font-bold text-center text-white mb-2">
              Desafio de la Cascada
            </h2>
            <p className="text-center text-amber-100 text-lg">
              Resuelve el problema matematico
            </p>
          </div>

          {showCorrectAnswer && selectedAnswer !== correctAnswer && (
            <div className="mb-6 p-4 bg-yellow-500/20 border-2 border-yellow-500 rounded-xl text-center">
              <p className="text-yellow-300 text-xl font-bold">
                La respuesta correcta es: {correctAnswer}
              </p>
            </div>
          )}

          <div className="bg-amber-800/60 rounded-2xl p-8 mb-8 border-2 border-amber-600/50">
            <p className="text-2xl text-white text-center mb-6 leading-relaxed">
              Cuantas frutas tienes si{" "}
              {operation === "+" ? "recoges" : "tienes"}{" "}
              <span className="text-cyan-400 font-bold">{num1}</span> y luego{" "}
              {operation === "+" ? "recoges" : "pierdes"}{" "}
              <span className="text-pink-400 font-bold">{num2}</span> mas?
            </p>

            <div className="text-6xl font-bold text-center text-white">
              {num1} {operation} {num2} = ?
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {options.map((option, index) => {
              const colors = [
                "from-red-500 to-red-600",
                "from-blue-500 to-blue-600",
                "from-green-500 to-green-600",
              ];
              return (
                <Button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`h-24 text-4xl font-bold rounded-2xl transition-all duration-300 ${
                    selectedAnswer === option
                      ? option === correctAnswer
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 scale-110 ring-4 ring-green-300"
                        : "bg-gradient-to-r from-red-500 to-rose-500 scale-90"
                      : showCorrectAnswer && option === correctAnswer
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 ring-4 ring-green-300"
                      : `bg-gradient-to-r ${colors[index]} hover:scale-105`
                  } text-white shadow-lg border-2 border-white/30`}
                >
                  {option}
                </Button>
              );
            })}
          </div>
        </div>
        <GameMusicPlayer
          theme="jungle"
          musicUrl="/song/the-technology-background-158085.mp3"
        />
      </div>
    </div>
  );
}
