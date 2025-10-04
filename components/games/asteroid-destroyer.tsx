"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import GameMusicPlayer from "@/components/game-music-player";

interface AsteroidDestroyerProps {
  onBack: () => void;
}

interface Asteroid {
  id: number;
  num1: number;
  num2: number;
  operation: "+" | "-";
  answer: number;
  options: number[];
  x: number;
  y: number;
}

export default function AsteroidDestroyer({ onBack }: AsteroidDestroyerProps) {
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [currentAsteroid, setCurrentAsteroid] = useState<Asteroid | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const MAX_SCORE = 10;

  useEffect(() => {
    generateAsteroid();
  }, []);

  const generateAsteroid = () => {
    if (score >= MAX_SCORE) {
      setGameWon(true);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
      });
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

    const opts = [answer];
    while (opts.length < 4) {
      const opt = answer + Math.floor(Math.random() * 20) - 10;
      if (!opts.includes(opt) && opt > 0) opts.push(opt);
    }

    const newAsteroid: Asteroid = {
      id: Date.now(),
      num1: n1,
      num2: n2,
      operation: op,
      answer,
      options: opts.sort(() => Math.random() - 0.5),
      x: Math.random() * 60 + 20,
      y: -10,
    };

    setCurrentAsteroid(newAsteroid);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answer: number) => {
    if (!currentAsteroid || showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentAsteroid.answer) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
      setScore(score + 1);
      setTimeout(generateAsteroid, 1500);
    } else {
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setGameOver(true);
      } else {
        setTimeout(generateAsteroid, 2000);
      }
    }
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-orange-900/40 to-yellow-900/50" />
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
          <div className="text-8xl mb-6">💥</div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Nave Destruida!
          </h2>
          <p className="text-2xl text-orange-300 mb-4">
            Puntuación final:{" "}
            <span className="text-yellow-400 font-bold">{score}</span> /{" "}
            {MAX_SCORE}
          </p>
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white text-xl px-8 py-6 rounded-2xl"
          >
            Volver al Menu
          </Button>
        </div>
        <GameMusicPlayer musicUrl="/components/song/the-technology-background-158085.mp3" />
      </div>
    );
  }

  if (gameWon) {
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
          <h2 className="text-5xl font-bold text-white mb-4">Victoria!</h2>
          <p className="text-2xl text-cyan-300 mb-4">
            Destruiste todos los asteroides!
          </p>
          <p className="text-xl text-gray-300 mb-8">
            Puntuación: <span className="text-pink-400 font-bold">{score}</span>{" "}
            / {MAX_SCORE}
          </p>
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white text-xl px-8 py-6 rounded-2xl"
          >
            Volver al Menu
          </Button>
        </div>
        <GameMusicPlayer musicUrl="/components/song/the-technology-background-158085.mp3" />
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

      {/* Header */}
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
          <div className="bg-gradient-to-r from-red-500 to-rose-500 px-6 py-3 rounded-full border-2 border-white/30 shadow-lg">
            <span className="text-white font-bold text-xl">❤️ {lives}</span>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full border-2 border-white/30 shadow-lg">
            <span className="text-white font-bold text-xl">
              ⭐ {score}/{MAX_SCORE}
            </span>
          </div>
        </div>
      </div>

      {/* Main game area */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 p-8">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            Destruye el Asteroide
          </h2>

          {currentAsteroid && (
            <>
              {/* Asteroid with problem */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div
                    className="text-8xl animate-bounce"
                    style={{ animationDuration: "2s" }}
                  >
                    ☄️
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500/90 rounded-full px-4 py-2 border-2 border-yellow-400">
                    <p className="text-white font-bold text-xl whitespace-nowrap">
                      {currentAsteroid.num1} {currentAsteroid.operation}{" "}
                      {currentAsteroid.num2} = ?
                    </p>
                  </div>
                </div>
              </div>

              {showResult && (
                <div
                  className={`mb-6 p-4 rounded-xl ${
                    selectedAnswer === currentAsteroid.answer
                      ? "bg-green-500/20 border-2 border-green-400"
                      : "bg-red-500/20 border-2 border-red-400"
                  }`}
                >
                  <p className="text-white text-center text-xl font-bold">
                    {selectedAnswer === currentAsteroid.answer
                      ? "¡Asteroide destruido! 🎉"
                      : `¡Impacto! La respuesta correcta era: ${currentAsteroid.answer}`}
                  </p>
                </div>
              )}

              {/* Spaceship */}
              <div className="flex justify-center mb-8">
                <div className="text-6xl">🚀</div>
              </div>

              {/* Answer options */}
              <div className="grid grid-cols-2 gap-4">
                {currentAsteroid.options.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    className={`h-20 text-3xl font-bold rounded-2xl transition-all duration-300 ${
                      showResult
                        ? option === currentAsteroid.answer
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : option === selectedAnswer
                          ? "bg-gradient-to-r from-red-500 to-rose-500"
                          : "bg-gray-600"
                        : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105"
                    } text-white shadow-lg`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <GameMusicPlayer musicUrl="/song/countach-2050-main-version-41372-03-44.mp3" />
    </div>
  );
}
