"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import GameMusicPlayer from "@/components/game-music-player";

interface ShapesGameProps {
  onBack: () => void;
}

const shapes = [
  { name: "Círculo", icon: "⭕", color: "from-pink-500 to-rose-500" },
  { name: "Cuadrado", icon: "🟦", color: "from-blue-500 to-cyan-500" },
  { name: "Triángulo", icon: "🔺", color: "from-purple-500 to-violet-500" },
  { name: "Rectángulo", icon: "▬", color: "from-green-500 to-emerald-500" },
  { name: "Estrella", icon: "⭐", color: "from-yellow-500 to-orange-500" },
  { name: "Pentágono", icon: "⬟", color: "from-red-500 to-pink-500" },
  { name: "Rombo", icon: "🔶", color: "from-orange-500 to-amber-500" },
  { name: "Óvalo", icon: "🥚", color: "from-teal-500 to-cyan-500" },
  { name: "Semicírculo", icon: "🌙", color: "from-indigo-500 to-purple-500" },
  { name: "Hexágono", icon: "⬡", color: "from-lime-500 to-green-500" },
];

export default function ShapesGame({ onBack }: ShapesGameProps) {
  const [questionCount, setQuestionCount] = useState(0);
  const MAX_QUESTIONS = 10;
  const [gameComplete, setGameComplete] = useState(false);
  const [currentShape, setCurrentShape] = useState(shapes[0]);
  const [options, setOptions] = useState<typeof shapes>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [usedShapes, setUsedShapes] = useState<string[]>([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const playShapeAudio = (shapeName: string) => {
    const utterance = new SpeechSynthesisUtterance(shapeName);
    utterance.lang = "es-ES";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const generateQuestion = () => {
    if (questionCount >= MAX_QUESTIONS) {
      setGameComplete(true);
      return;
    }

    let availableShapes = shapes.filter((s) => !usedShapes.includes(s.name));
    if (availableShapes.length === 0) {
      setUsedShapes([]);
      availableShapes = shapes;
    }

    const shape =
      availableShapes[Math.floor(Math.random() * availableShapes.length)];
    setCurrentShape(shape);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setQuestionCount(questionCount + 1);
    setUsedShapes([...usedShapes, shape.name]);

    const opts = [shape];
    while (opts.length < 3) {
      const opt = shapes[Math.floor(Math.random() * shapes.length)];
      if (!opts.find((o) => o.name === opt.name)) opts.push(opt);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswer = (shapeName: string) => {
    setSelectedAnswer(shapeName);
    if (shapeName === currentShape.name) {
      playShapeAudio(shapeName);
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

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/40 to-blue-900/50" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InN0YXIiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IndoaXRlIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSJ0cmFuc3BhcmVudCIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjIiIGZpbGw9InVybCgjc3RhcikiIG9wYWNpdHk9IjAuOCIvPjwvc3ZnPg==')] opacity-40" />
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
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 opacity-60 animate-pulse" />
      <div
        className="absolute top-40 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 opacity-50 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-32 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 opacity-60 animate-pulse"
        style={{ animationDelay: "2s" }}
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
        </div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Que forma es esta?
          </h2>
          <div className="flex justify-center mb-12">
            <div className="text-[200px] animate-bounce">
              {currentShape.icon}
            </div>
          </div>
          {showCorrectAnswer && selectedAnswer !== currentShape.name && (
            <div className="mb-6 p-4 bg-yellow-500/20 border-2 border-yellow-500 rounded-xl text-center">
              <p className="text-yellow-300 text-xl font-bold">
                La respuesta correcta es: {currentShape.name}{" "}
                {currentShape.icon}
              </p>
            </div>
          )}
          <div className="grid grid-cols-3 gap-4">
            {options.map((option) => (
              <Button
                key={option.name}
                onClick={() => handleAnswer(option.name)}
                disabled={selectedAnswer !== null}
                className={`h-32 text-2xl font-bold rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                  selectedAnswer === option.name
                    ? option.name === currentShape.name
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 scale-110"
                      : "bg-gradient-to-r from-red-500 to-rose-500 scale-90"
                    : showCorrectAnswer && option.name === currentShape.name
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 ring-4 ring-green-300"
                    : `bg-gradient-to-r ${option.color} hover:scale-105`
                } text-white shadow-lg`}
              >
                <div className="text-5xl">{option.icon}</div>
                <div>{option.name}</div>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <GameMusicPlayer
        theme="space"
        musicUrl="/song/6-Happy-Commercial-Piano(chosic.com).mp3"
      />
    </div>
  );
}
