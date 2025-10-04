"use client"

import { useState } from "react"
import { ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

interface QuizProps {
  difficulty: "easy" | "medium" | "hard"
  onBack: () => void
}

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

const quizQuestions = {
  easy: [
    {
      question: "¿Cuánto es 5 + 3?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2,
    },
    {
      question: "¿Cuánto es 10 - 4?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 1,
    },
    {
      question: "¿Cuántos lados tiene un triángulo?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
    },
  ],
  medium: [
    {
      question: "¿Cuánto es 12 × 3?",
      options: ["32", "34", "36", "38"],
      correctAnswer: 2,
    },
    {
      question: "¿Cuánto es 48 ÷ 6?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2,
    },
    {
      question: "Si tienes 25 manzanas y das 7, ¿cuántas te quedan?",
      options: ["16", "17", "18", "19"],
      correctAnswer: 2,
    },
  ],
  hard: [
    {
      question: "¿Cuánto es 15 × 12?",
      options: ["170", "180", "190", "200"],
      correctAnswer: 1,
    },
    {
      question: "¿Cuál es el siguiente número en la secuencia: 2, 4, 8, 16, ...?",
      options: ["24", "28", "32", "36"],
      correctAnswer: 2,
    },
    {
      question: "Si un tren viaja a 60 km/h durante 2.5 horas, ¿qué distancia recorre?",
      options: ["120 km", "130 km", "140 km", "150 km"],
      correctAnswer: 3,
    },
  ],
}

export default function Quiz({ difficulty, onBack }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [quizComplete, setQuizComplete] = useState(false)

  const questions = quizQuestions[difficulty]
  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === currentQuestion.correctAnswer) {
      setShowFeedback("correct")
      setScore(score + 10)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    } else {
      setShowFeedback("incorrect")
    }

    setTimeout(() => {
      setShowFeedback(null)
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setQuizComplete(true)
      }
    }, 1500)
  }

  const saveAndExit = () => {
    const currentStars = Number.parseInt(localStorage.getItem("gnosisStars") || "0")
    localStorage.setItem("gnosisStars", (currentStars + Math.floor(score / 10)).toString())
    onBack()
  }

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-cyan-900/30" />
        <div className="absolute inset-0 bg-[url('/cosmic-nebula-stars.png')] bg-cover bg-center opacity-30" />

        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 p-12 text-center">
            <div className="text-8xl mb-6">🏆</div>
            <h2 className="text-5xl font-bold text-white mb-4">¡Quiz Completado!</h2>
            <p className="text-3xl text-cyan-400 mb-8">Puntuación: {score}</p>
            <p className="text-xl text-gray-300 mb-8">¡Ganaste {Math.floor(score / 10)} estrellas! ⭐</p>
            <Button
              onClick={saveAndExit}
              className="w-full h-14 text-xl font-bold rounded-2xl bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white shadow-lg shadow-pink-500/50"
            >
              Volver al Inicio
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-cyan-900/30" />
      <div className="absolute inset-0 bg-[url('/cosmic-nebula-stars.png')] bg-cover bg-center opacity-30" />

      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            onClick={saveAndExit}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <div className="flex items-center gap-4">
            <div className="bg-purple-900/50 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-yellow-500/50 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-400 font-bold text-lg">{score}</span>
            </div>
            <div className="bg-cyan-900/50 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-cyan-500/50">
              <span className="text-cyan-400 font-bold text-lg">
                {currentQuestionIndex + 1} / {questions.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 p-12">
          <h2 className="text-4xl font-bold text-white text-center mb-12">{currentQuestion.question}</h2>

          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback !== null}
                className="h-20 text-2xl font-bold rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50"
              >
                {option}
              </Button>
            ))}
          </div>

          {showFeedback === "correct" && (
            <div className="mt-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-3xl font-bold text-green-400">¡Correcto!</p>
            </div>
          )}

          {showFeedback === "incorrect" && (
            <div className="mt-8 text-center">
              <div className="text-6xl mb-4">😅</div>
              <p className="text-3xl font-bold text-red-400">¡Intenta de nuevo!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
