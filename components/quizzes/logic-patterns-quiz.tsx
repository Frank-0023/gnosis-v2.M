"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

interface LogicPatternsQuizProps {
  difficulty: "easy" | "medium" | "hard"
  onBack: () => void
}

interface Question {
  question: string
  options: number[]
  correct: number
  explanation: string
}

const questionsData: Record<string, Question[]> = {
  easy: [
    {
      question: "¿Qué número falta: 5, 10, 15, ?, 25?",
      options: [18, 20, 22],
      correct: 20,
      explanation: "La secuencia aumenta de 5 en 5",
    },
    {
      question: "¿Qué número sigue: 2, 4, 6, 8, ?",
      options: [9, 10, 12],
      correct: 10,
      explanation: "La secuencia son números pares que aumentan de 2 en 2",
    },
    {
      question: "¿Qué número falta: 1, 3, 5, 7, ?",
      options: [8, 9, 10],
      correct: 9,
      explanation: "La secuencia son números impares que aumentan de 2 en 2",
    },
    {
      question: "¿Qué número sigue: 10, 20, 30, 40, ?",
      options: [45, 50, 55],
      correct: 50,
      explanation: "La secuencia aumenta de 10 en 10",
    },
    {
      question: "¿Qué número falta: 3, 6, 9, ?, 15?",
      options: [10, 11, 12],
      correct: 12,
      explanation: "La secuencia son múltiplos de 3",
    },
  ],
  medium: [
    {
      question: "¿Qué número falta: 2, 4, 8, 16, ?",
      options: [24, 32, 40],
      correct: 32,
      explanation: "Cada número se multiplica por 2",
    },
    {
      question: "¿Qué número sigue: 1, 4, 9, 16, ?",
      options: [20, 25, 30],
      correct: 25,
      explanation: "Son cuadrados perfectos: 1², 2², 3², 4², 5²",
    },
    {
      question: "¿Qué número falta: 3, 6, 12, 24, ?",
      options: [36, 48, 60],
      correct: 48,
      explanation: "Cada número se multiplica por 2",
    },
    {
      question: "¿Qué número sigue: 100, 90, 80, 70, ?",
      options: [50, 60, 65],
      correct: 60,
      explanation: "La secuencia disminuye de 10 en 10",
    },
    {
      question: "¿Qué número falta: 1, 1, 2, 3, 5, ?",
      options: [6, 7, 8],
      correct: 8,
      explanation: "Secuencia de Fibonacci: cada número es la suma de los dos anteriores",
    },
  ],
  hard: [
    {
      question: "¿Qué número falta: 2, 6, 12, 20, 30, ?",
      options: [40, 42, 44],
      correct: 42,
      explanation: "Diferencias: 4, 6, 8, 10, 12 (aumentan de 2 en 2)",
    },
    {
      question: "¿Qué número sigue: 1, 8, 27, 64, ?",
      options: [100, 125, 150],
      correct: 125,
      explanation: "Son cubos perfectos: 1³, 2³, 3³, 4³, 5³",
    },
    {
      question: "¿Qué número falta: 3, 7, 15, 31, ?",
      options: [47, 55, 63],
      correct: 63,
      explanation: "Cada número se multiplica por 2 y se suma 1",
    },
    {
      question: "¿Qué número sigue: 2, 3, 5, 7, 11, ?",
      options: [12, 13, 15],
      correct: 13,
      explanation: "Son números primos en secuencia",
    },
    {
      question: "¿Qué número falta: 1, 4, 10, 22, 46, ?",
      options: [82, 92, 94],
      correct: 94,
      explanation: "Cada número se multiplica por 2 y se suma 2",
    },
  ],
}

export default function LogicPatternsQuiz({ difficulty, onBack }: LogicPatternsQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  const questions = questionsData[difficulty]
  const question = questions[currentQuestion]

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer)
    setShowExplanation(true)

    if (answer === question.correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowExplanation(false)
      } else {
        setGameComplete(true)
      }
    }, 3000)
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-blue-900/30 to-purple-900/40" />
        <div className="relative z-10 text-center">
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-5xl font-bold text-white mb-4">Quiz Completado!</h2>
          <p className="text-2xl text-cyan-300 mb-4">
            Acertaste: <span className="text-pink-400 font-bold">{score}</span> de {questions.length}
          </p>
          <p className="text-xl text-gray-300 mb-8">Puntuación: {Math.round((score / questions.length) * 100)}%</p>
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white text-xl px-8 py-6 rounded-2xl"
          >
            Volver al Menu
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-blue-900/30 to-purple-900/40" />
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
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
              Pregunta {currentQuestion + 1}/{questions.length}
            </span>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full border-2 border-white/30 shadow-lg">
            <span className="text-white font-bold text-xl">⭐ {score}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Patrones Lógicos - {difficulty}</h2>

          <div className="bg-blue-900/40 rounded-2xl p-8 mb-8">
            <p className="text-2xl text-white text-center mb-6">{question.question}</p>
          </div>

          {showExplanation && (
            <div
              className={`mb-6 p-4 border-2 rounded-xl text-center ${
                selectedAnswer === question.correct
                  ? "bg-green-500/20 border-green-500"
                  : "bg-yellow-500/20 border-yellow-500"
              }`}
            >
              <p
                className={`text-xl font-bold mb-2 ${
                  selectedAnswer === question.correct ? "text-green-300" : "text-yellow-300"
                }`}
              >
                {selectedAnswer === question.correct ? "¡Correcto!" : `La respuesta correcta es: ${question.correct}`}
              </p>
              <p className="text-white">{question.explanation}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            {question.options.map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`h-24 text-4xl font-bold rounded-2xl transition-all duration-300 ${
                  selectedAnswer === option
                    ? option === question.correct
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 scale-110"
                      : "bg-gradient-to-r from-red-500 to-rose-500 scale-90"
                    : showExplanation && option === question.correct
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 ring-4 ring-green-300"
                      : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105"
                } text-white shadow-lg`}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
