"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import GameMusicPlayer from "@/components/game-music-player";

interface CountingGameProps {
  onBack: () => void;
}

const items = [
  { emoji: "🍎", name: "manzana" },
  { emoji: "🍌", name: "banana" },
  { emoji: "🍊", name: "naranja" },
  { emoji: "🐵", name: "mono" },
  { emoji: "🦜", name: "loro" },
  { emoji: "🦋", name: "mariposa" },
  { emoji: "🌺", name: "flor" },
  { emoji: "🍇", name: "uvas" },
];

export default function CountingGame({ onBack }: CountingGameProps) {
  const [questionCount, setQuestionCount] = useState(0);
  const MAX_QUESTIONS = 10;
  const [targetCount, setTargetCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const [availableItems, setAvailableItems] = useState<
    Array<{ id: number; emoji: string; name: string }>
  >([]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [currentItem, setCurrentItem] = useState(items[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const playNumberAudio = (number: number) => {
    const utterance = new SpeechSynthesisUtterance(number.toString());
    utterance.lang = "es-ES";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const generateQuestion = () => {
    if (questionCount >= MAX_QUESTIONS) {
      setGameComplete(true);
      return;
    }

    const num = Math.floor(Math.random() * 8) + 3; // 3-10 items
    const item = items[Math.floor(Math.random() * items.length)];

    setTargetCount(num);
    setCurrentCount(0);
    setCurrentItem(item);
    setShowSuccess(false);
    setQuestionCount(questionCount + 1);

    // Generate items to drag
    const itemsArray = Array.from({ length: num + 2 }, (_, i) => ({
      id: i,
      emoji: item.emoji,
      name: item.name,
    }));
    setAvailableItems(itemsArray);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleDragStart = (id: number) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = () => {
    if (draggedItem !== null) {
      const newCount = currentCount + 1;
      setCurrentCount(newCount);
      playNumberAudio(newCount);
      setAvailableItems(
        availableItems.filter((item) => item.id !== draggedItem)
      );
      setDraggedItem(null);

      if (newCount === targetCount) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setScore(score + 1);
        setShowSuccess(true);
        setTimeout(generateQuestion, 2000);
      }
    }
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-teal-900/40 to-emerald-900/50" />
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl sm:text-3xl md:text-4xl opacity-30 animate-pulse"
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
        <div className="relative z-10 text-center px-4">
          <div className="text-5xl sm:text-6xl md:text-8xl mb-4 sm:mb-6">
            🏆
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Juego Completado!
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-cyan-300 mb-6 sm:mb-8">
            Puntuación final:{" "}
            <span className="text-pink-400 font-bold">{score}</span> /{" "}
            {MAX_QUESTIONS}
          </p>
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white text-base sm:text-lg md:text-xl px-6 sm:px-8 py-4 sm:py-6 rounded-2xl"
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

      {/* Jungle decorative elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl sm:text-3xl md:text-4xl opacity-30 animate-pulse"
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
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-teal-500/50 shadow-2xl shadow-teal-500/20 p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-3 sm:mb-4">
            Arrastra {targetCount} {currentItem.name}s al cofre
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-6 md:mt-8">
            {/* Left side - Available items */}
            <div className="bg-green-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-green-500/30">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">
                Objetos Disponibles
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
                {availableItems.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item.id)}
                    className="text-4xl sm:text-5xl md:text-6xl cursor-move hover:scale-110 transition-transform animate-bounce"
                    style={{
                      animationDuration: "1s",
                      animationDelay: `${item.id * 0.1}s`,
                    }}
                  >
                    {item.emoji}
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Treasure chest */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="bg-amber-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-amber-500/30 flex flex-col items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[400px]"
            >
              <div className="text-5xl sm:text-6xl md:text-8xl mb-3 sm:mb-4 animate-pulse">
                📦
              </div>
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center border-4 border-white/30 shadow-lg">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                  {currentCount}
                </span>
              </div>
              <p className="text-white text-base sm:text-lg md:text-xl mt-3 sm:mt-4 font-bold">
                {showSuccess ? "Correcto!" : `Necesitas ${targetCount}`}
              </p>
            </div>
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
