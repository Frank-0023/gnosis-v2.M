"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

interface MathGameProps {
  ageGroup: "3-5" | "6-8" | "9-11"
  onBack: () => void
}

interface Question {
  question: string
  answer: number
  options: number[]
  emoji?: string
}

export default function MathGame({ ageGroup, onBack }: MathGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [score, setScore] = useState(0)
  const [questionsAnswered, setQuestionsAnswered] = useState(0)
  const [showFeedback, setShowFeedback] = useState<"correct" | "incorrect" | null>(null)

  const generateQuestion = (): Question => {
    if (ageGroup === "3-5") {
      const num1 = Math.floor(Math.random() * 5) + 1
      const num2 = Math.floor(Math.random() * 5) + 1
      const answer = num1 + num2
      const emojis = ["🍎", "🌟", "🎈", "🐶", "🚗"]
      return {
        question: `${num1} + ${num2}`,
        answer,
        options: [answer, answer + 1, answer - 1, answer + 2].sort(() => Math.random() - 0.5),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }
    } else if (ageGroup === "6-8") {
      const operation = Math.random() > 0.5 ? "+" : "-"
      const num1 = Math.floor(Math.random() * 20) + 1
      const num2 = Math.floor(Math.random() * (operation === "+" ? 20 : num1)) + 1
      const answer = operation === "+" ? num1 + num2 : num1 - num2
      return {
        question: `${num1} ${operation} ${num2}`,
        answer,
        options: [answer, answer + 1, answer - 1, answer + 2].sort(() => Math.random() - 0.5),
      }
    } else {
      const operations = ["+", "-", "×", "÷"]
      const operation = operations[Math.floor(Math.random() * operations.length)]
      let num1, num2, answer

      if (operation === "×") {
        num1 = Math.floor(Math.random() * 12) + 1
        num2 = Math.floor(Math.random() * 12) + 1
        answer = num1 * num2
      } else if (operation === "÷") {
        num2 = Math.floor(Math.random() * 10) + 2
        answer = Math.floor(Math.random() * 10) + 1
        num1 = num2 * answer
      } else if (operation === "+") {
        num1 = Math.floor(Math.random() * 50) + 1
        num2 = Math.floor(Math.random() * 50) + 1
        answer = num1 + num2
      } else {
        num1 = Math.floor(Math.random() * 50) + 20
        num2 = Math.floor(Math.random() * num1) + 1
        answer = num1 - num2
      }

      return {
        question: `${num1} ${operation} ${num2}`,
        answer,
        options: [answer, answer + 1, answer - 1, answer + 2].sort(() => Math.random() - 0.5),
      }
    }
  }

  useEffect(() => {
    setCurrentQuestion(generateQuestion())
  }, [ageGroup])

  const handleAnswer = (selectedAnswer: number) => {
    if (!currentQuestion) return

    if (selectedAnswer === currentQuestion.answer) {
      setShowFeedback("correct")
      setScore(score + 10)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      setTimeout(() => {
        setShowFeedback(null)
        setQuestionsAnswered(questionsAnswered + 1)
        setCurrentQuestion(generateQuestion())
      }, 1500)
    } else {
      setShowFeedback("incorrect")
      setTimeout(() => {
        setShowFeedback(null)
      }, 1000)
    }
  }

  const saveProgress = () => {
    const currentStars = Number.parseInt(localStorage.getItem("gnosisStars") || "0")
    localStorage.setItem("gnosisStars", (currentStars + Math.floor(score / 10)).toString())
    onBack()
  }

  if (!currentQuestion) return null

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Space background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-cyan-900/30" />
      <div className="absolute inset-0 bg-[url('/cosmic-nebula-stars.png')] bg-cover bg-center opacity-30" />

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            onClick={saveProgress}
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
              <span className="text-cyan-400 font-bold text-lg">Pregunta {questionsAnswered + 1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 p-12">
          {currentQuestion.emoji && <div className="text-center text-8xl mb-8">{currentQuestion.emoji}</div>}

          <h2 className="text-6xl font-bold text-white text-center mb-12">{currentQuestion.question} = ?</h2>

          <div className="grid grid-cols-2 gap-6">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback !== null}
                className="h-24 text-4xl font-bold rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50"
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
