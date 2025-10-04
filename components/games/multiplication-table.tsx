"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import GameMusicPlayer from "@/components/game-music-player";

interface MultiplicationTableProps {
  onBack: () => void;
  tableNumber: number;
}

interface Question {
  multiplicand: number;
  multiplier: number;
  answer: number;
  options: number[];
}

export default function MultiplicationTable({
  onBack,
  tableNumber,
}: MultiplicationTableProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showFinalScore, setShowFinalScore] = useState(false);

  useEffect(() => {
    generateQuestions();
  }, [tableNumber]);

  const generateQuestions = () => {
    const newQuestions: Question[] = [];

    // Generate questions from tableNumber x 1 to tableNumber x 10
    for (let i = 1; i <= 10; i++) {
      const answer = tableNumber * i;
      const options = generateOptions(answer);

      newQuestions.push({
        multiplicand: tableNumber,
        multiplier: i,
        answer,
        options,
      });
    }

    setQuestions(newQuestions);
  };

  const generateOptions = (correctAnswer: number): number[] => {
    const options = [correctAnswer];

    while (options.length < 4) {
      const offset = Math.floor(Math.random() * 20) - 10;
      const option = correctAnswer + offset;

      if (option > 0 && !options.includes(option)) {
        options.push(option);
      }
    }

    return options.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQuestion].answer;

    if (isCorrect) {
      setScore(score + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowResult(false);
        setSelectedAnswer(null);
      } else {
        setShowFinalScore(true);
        if (score + (isCorrect ? 1 : 0) >= 7) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }
    }, 1500);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-2xl">Cargando...</p>
      </div>
    );
  }

  if (showFinalScore) {
    const percentage = Math.round((score / questions.length) * 100);
    const stars = score >= 9 ? 3 : score >= 7 ? 2 : score >= 5 ? 1 : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 relative overflow-hidden">
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

        <div className="relative z-10 p-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)]">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/30 p-12 max-w-2xl w-full mx-4">
            <div className="text-center">
              <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-4">
                ¡Juego Completado!
              </h2>
              <p className="text-2xl text-white mb-8">
                Acertaste {score} de {questions.length} preguntas ({percentage}
                %)
              </p>

              <div className="flex justify-center gap-2 mb-8">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-12 h-12 ${
                      i < stars
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => window.location.reload()} // Assuming a restart would reload the page
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-6 text-lg rounded-xl"
                >
                  Jugar de Nuevo
                </Button>
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg rounded-xl"
                >
                  Volver al Menú
                </Button>
              </div>
            </div>
          </div>
        </div>
        <GameMusicPlayer
          theme="space"
          musicUrl="https://uppbeat.io/track/moire/space-ranger"
        />
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 relative overflow-hidden">
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
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 opacity-60 animate-pulse" />
      <div
        className="absolute bottom-40 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 opacity-50 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30">
            <p className="text-white text-lg font-bold">
              Pregunta {currentQuestion + 1} de {questions.length}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <p className="text-white text-lg font-bold">{score}</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-150px)] px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/30 p-12 max-w-3xl w-full">
          <h2 className="text-5xl font-bold text-white text-center mb-12">
            Tabla del {tableNumber}
          </h2>

          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-8 mb-8 border-2 border-cyan-400/50">
            <p className="text-6xl font-bold text-white text-center">
              {question.multiplicand} × {question.multiplier} = ?
            </p>
          </div>

          {showResult && (
            <div
              className={`mb-6 p-4 rounded-xl ${
                selectedAnswer === question.answer
                  ? "bg-green-500/20 border-2 border-green-400"
                  : "bg-red-500/20 border-2 border-red-400"
              }`}
            >
              <p className="text-white text-center text-xl font-bold">
                {selectedAnswer === question.answer
                  ? "¡Correcto! 🎉"
                  : `Incorrecto. La respuesta correcta es: ${question.answer}`}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => !showResult && handleAnswer(option)}
                disabled={showResult}
                className={`h-20 text-3xl font-bold rounded-xl transition-all ${
                  showResult
                    ? option === question.answer
                      ? "bg-green-500 hover:bg-green-500"
                      : option === selectedAnswer
                      ? "bg-red-500 hover:bg-red-500"
                      : "bg-gray-600 hover:bg-gray-600"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400"
                } text-white`}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <GameMusicPlayer
        theme="space"
        musicUrl="/song/space-ranger-moire-main-version-03-04-10814.mp3"
      />
    </div>
  );
}
