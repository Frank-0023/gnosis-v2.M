"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Star, Clock, Lock, Unlock, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

interface VaultEscapeProps {
  difficulty: "easy" | "medium" | "hard"
  onBack: () => void
}

interface Challenge {
  question: string
  options: { label: string; value: string }[]
  correctAnswer: string
  hint: string
}

const challenges = {
  easy: [
    {
      question: "¿Cuál es el valor de X si 2X + 5 = 15?",
      options: [
        { label: "A: 5", value: "5" },
        { label: "B: 10", value: "10" },
        { label: "C: -5", value: "-5" },
      ],
      correctAnswer: "5",
      hint: "Resta 5 de ambos lados primero",
    },
    {
      question: "Si X - 8 = 12, ¿cuál es X?",
      options: [
        { label: "A: 4", value: "4" },
        { label: "B: 20", value: "20" },
        { label: "C: 16", value: "16" },
      ],
      correctAnswer: "20",
      hint: "Suma 8 a ambos lados",
    },
    {
      question: "¿Cuál es el valor de X si 3X = 21?",
      options: [
        { label: "A: 6", value: "6" },
        { label: "B: 7", value: "7" },
        { label: "C: 8", value: "8" },
      ],
      correctAnswer: "7",
      hint: "Divide ambos lados entre 3",
    },
    {
      question: "Si X/4 = 5, ¿cuál es X?",
      options: [
        { label: "A: 15", value: "15" },
        { label: "B: 20", value: "20" },
        { label: "C: 25", value: "25" },
      ],
      correctAnswer: "20",
      hint: "Multiplica ambos lados por 4",
    },
  ],
  medium: [
    {
      question: "¿Cuál es el valor de X si 3X - 7 = 20?",
      options: [
        { label: "A: 7", value: "7" },
        { label: "B: 9", value: "9" },
        { label: "C: 11", value: "11" },
      ],
      correctAnswer: "9",
      hint: "Primero suma 7, luego divide entre 3",
    },
    {
      question: "Si 2(X + 3) = 18, ¿cuál es X?",
      options: [
        { label: "A: 6", value: "6" },
        { label: "B: 7", value: "7" },
        { label: "C: 9", value: "9" },
      ],
      correctAnswer: "6",
      hint: "Divide entre 2 primero, luego resta 3",
    },
    {
      question: "¿Cuál es X si X² = 49?",
      options: [
        { label: "A: 7", value: "7" },
        { label: "B: ±7", value: "±7" },
        { label: "C: 14", value: "14" },
      ],
      correctAnswer: "±7",
      hint: "Recuerda que hay dos raíces",
    },
    {
      question: "Si 5X + 2X = 35, ¿cuál es X?",
      options: [
        { label: "A: 4", value: "4" },
        { label: "B: 5", value: "5" },
        { label: "C: 7", value: "7" },
      ],
      correctAnswer: "5",
      hint: "Combina términos semejantes primero",
    },
  ],
  hard: [
    {
      question: "¿Cuál es X si 2X² - 8 = 40?",
      options: [
        { label: "A: 4", value: "4" },
        { label: "B: ±4√3", value: "±4√3" },
        { label: "C: 2√6", value: "2√6" },
      ],
      correctAnswer: "2√6",
      hint: "Suma 8, divide entre 2, luego saca raíz cuadrada",
    },
    {
      question: "Si log₂(X) = 4, ¿cuál es X?",
      options: [
        { label: "A: 8", value: "8" },
        { label: "B: 16", value: "16" },
        { label: "C: 32", value: "32" },
      ],
      correctAnswer: "16",
      hint: "X = 2⁴",
    },
    {
      question: "¿Cuál es X si 3^X = 81?",
      options: [
        { label: "A: 3", value: "3" },
        { label: "B: 4", value: "4" },
        { label: "C: 5", value: "5" },
      ],
      correctAnswer: "4",
      hint: "81 = 3⁴",
    },
    {
      question: "Si √(X + 5) = 4, ¿cuál es X?",
      options: [
        { label: "A: 9", value: "9" },
        { label: "B: 11", value: "11" },
        { label: "C: 16", value: "16" },
      ],
      correctAnswer: "11",
      hint: "Eleva al cuadrado ambos lados primero",
    },
  ],
}

export default function VaultEscape({ difficulty, onBack }: VaultEscapeProps) {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [unlockedCircuits, setUnlockedCircuits] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(45)
  const [showHint, setShowHint] = useState(false)
  const [showFeedback, setShowFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [gameComplete, setGameComplete] = useState(false)

  const challengeList = challenges[difficulty]
  const currentChallenge = challengeList[currentChallengeIndex]
  const totalCircuits = challengeList.length

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showFeedback) {
      handleTimeout()
    }
  }, [timeLeft, showFeedback, gameComplete])

  const handleTimeout = () => {
    setShowFeedback("incorrect")
    setTimeout(() => {
      moveToNextChallenge()
    }, 2000)
  }

  const handleAnswer = (answer: string) => {
    if (answer === currentChallenge.correctAnswer) {
      setShowFeedback("correct")
      const timeBonus = Math.floor(timeLeft / 5)
      setScore(score + 15 + timeBonus)
      setUnlockedCircuits(unlockedCircuits + 1)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00d4ff", "#00ff88", "#ffff00"],
      })
    } else {
      setShowFeedback("incorrect")
    }

    setTimeout(() => {
      moveToNextChallenge()
    }, 2000)
  }

  const moveToNextChallenge = () => {
    setShowFeedback(null)
    setShowHint(false)
    setTimeLeft(45)

    if (currentChallengeIndex < challengeList.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1)
    } else {
      setGameComplete(true)
    }
  }

  const saveAndExit = () => {
    const currentStars = Number.parseInt(localStorage.getItem("gnosisStars") || "0")
    localStorage.setItem("gnosisStars", (currentStars + Math.floor(score / 10)).toString())
    onBack()
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-teal-900/30 to-green-900/40" />
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-3xl border-2 border-cyan-500/70 shadow-2xl shadow-cyan-500/50 p-12 text-center">
            <Unlock className="w-24 h-24 mx-auto mb-6 text-green-400" />
            <h2 className="text-5xl font-bold text-cyan-400 mb-4">¡BÓVEDA DESBLOQUEADA!</h2>
            <p className="text-3xl text-green-400 mb-4">
              Circuitos: {unlockedCircuits}/{totalCircuits}
            </p>
            <p className="text-2xl text-white mb-8">Puntuación: {score}</p>
            <p className="text-xl text-gray-300 mb-8">¡Ganaste {Math.floor(score / 10)} estrellas! ⭐</p>
            <Button
              onClick={saveAndExit}
              className="w-full h-14 text-xl font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-black shadow-lg shadow-cyan-500/50"
            >
              Salir de la Bóveda
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-cyan-950/50 to-gray-900" />

      {/* Animated tech lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-pulse" />
        <div
          className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-transparent via-green-500 to-transparent animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-cyan-900/50 backdrop-blur-sm rounded-lg px-4 py-2 border-2 border-cyan-500/50 flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-bold text-lg">{timeLeft}</span>
            </div>
            <Button
              onClick={saveAndExit}
              variant="outline"
              className="bg-white/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>

          <Button
            onClick={() => setShowHint(!showHint)}
            className="bg-teal-900/50 backdrop-blur-sm border-2 border-teal-500/50 text-teal-400 hover:bg-teal-500/20"
          >
            Pistas
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 tracking-wider">
            ESCAPE DE LA BÓVEDA DE NÚMEROS
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question panel */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/30 p-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center leading-relaxed">
                {currentChallenge.question}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {currentChallenge.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    disabled={showFeedback !== null}
                    className="h-16 text-xl font-bold rounded-xl bg-gradient-to-r from-cyan-600/80 to-teal-600/80 hover:from-cyan-500 hover:to-teal-500 text-white border-2 border-cyan-400/30 shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>

              {showHint && (
                <div className="mt-6 p-4 bg-yellow-900/30 border-2 border-yellow-500/50 rounded-xl">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-yellow-400 mt-1" />
                    <p className="text-yellow-300">{currentChallenge.hint}</p>
                  </div>
                </div>
              )}

              {showFeedback && (
                <div className="mt-6 text-center">
                  {showFeedback === "correct" ? (
                    <>
                      <div className="text-6xl mb-2">✓</div>
                      <p className="text-2xl font-bold text-green-400">¡Circuito Desbloqueado!</p>
                    </>
                  ) : (
                    <>
                      <div className="text-6xl mb-2">✗</div>
                      <p className="text-2xl font-bold text-red-400">¡Circuito Bloqueado!</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Progress panel */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl border-2 border-green-500/50 shadow-2xl shadow-green-500/30 p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4 text-center">PROGRESS</h3>

              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-700"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(unlockedCircuits / totalCircuits) * 351.86} 351.86`}
                    className="text-green-400"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-green-400">{unlockedCircuits}</span>
                  <span className="text-sm text-gray-400">/ {totalCircuits}</span>
                </div>
              </div>

              <p className="text-center text-white font-bold">Circuitos Desbloqueados</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/30 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Puntuación</span>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400 font-bold text-xl">{score}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Estado</span>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-bold">BLOQUEADO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
