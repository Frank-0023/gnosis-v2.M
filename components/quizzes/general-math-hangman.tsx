"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Star, Trophy, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

interface GeneralMathHangmanProps {
  onBack: () => void
  difficulty: "easy" | "medium" | "hard"
}

interface Question {
  problem: string
  answer: number
  hint: string
}

const questionsData = {
  easy: [
    { problem: "15 + 8", answer: 23, hint: "Suma los números" },
    { problem: "25 - 12", answer: 13, hint: "Resta el segundo número del primero" },
    { problem: "30 + 15", answer: 45, hint: "Suma ambos números" },
    { problem: "50 - 20", answer: 30, hint: "Resta 20 de 50" },
    { problem: "18 + 7", answer: 25, hint: "Suma 18 y 7" },
    { problem: "40 - 15", answer: 25, hint: "Resta 15 de 40" },
    { problem: "22 + 13", answer: 35, hint: "Suma los dos números" },
    { problem: "35 - 18", answer: 17, hint: "Resta 18 de 35" },
    { problem: "27 + 9", answer: 36, hint: "Suma 27 y 9" },
    { problem: "45 - 22", answer: 23, hint: "Resta 22 de 45" },
  ],
  medium: [
    { problem: "12 × 8", answer: 96, hint: "Multiplica 12 por 8" },
    { problem: "144 ÷ 12", answer: 12, hint: "Divide 144 entre 12" },
    { problem: "15 × 6", answer: 90, hint: "Multiplica 15 por 6" },
    { problem: "81 ÷ 9", answer: 9, hint: "Divide 81 entre 9" },
    { problem: "25 × 4", answer: 100, hint: "Multiplica 25 por 4" },
    { problem: "120 ÷ 8", answer: 15, hint: "Divide 120 entre 8" },
    { problem: "18 × 5", answer: 90, hint: "Multiplica 18 por 5" },
    { problem: "96 ÷ 6", answer: 16, hint: "Divide 96 entre 6" },
    { problem: "22 × 3", answer: 66, hint: "Multiplica 22 por 3" },
    { problem: "108 ÷ 9", answer: 12, hint: "Divide 108 entre 9" },
  ],
  hard: [
    { problem: "2X + 5 = 15", answer: 5, hint: "Despeja X: 2X = 15 - 5" },
    { problem: "3X - 7 = 14", answer: 7, hint: "Despeja X: 3X = 14 + 7" },
    { problem: "4X + 8 = 32", answer: 6, hint: "Despeja X: 4X = 32 - 8" },
    { problem: "5X - 10 = 40", answer: 10, hint: "Despeja X: 5X = 40 + 10" },
    { problem: "X/2 + 3 = 8", answer: 10, hint: "Despeja X: X/2 = 8 - 3" },
    { problem: "X/3 + 5 = 10", answer: 15, hint: "Despeja X: X/3 = 10 - 5" },
    { problem: "2X + 12 = 30", answer: 9, hint: "Despeja X: 2X = 30 - 12" },
    { problem: "3X - 9 = 18", answer: 9, hint: "Despeja X: 3X = 18 + 9" },
    { problem: "4X + 4 = 28", answer: 6, hint: "Despeja X: 4X = 28 - 4" },
    { problem: "X/4 + 2 = 7", answer: 20, hint: "Despeja X: X/4 = 7 - 2" },
  ],
}

export default function GeneralMathHangman({ onBack, difficulty }: GeneralMathHangmanProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [guessedDigits, setGuessedDigits] = useState<Set<string>>(new Set())
  const [showHint, setShowHint] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [showFinalScore, setShowFinalScore] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    const shuffled = [...questionsData[difficulty]].sort(() => Math.random() - 0.5).slice(0, 10)
    setQuestions(shuffled)
  }, [difficulty])

  const currentQuestionData = questions[currentQuestion]
  const answerString = currentQuestionData?.answer.toString() || ""
  const maxMistakes = 6

  const handleDigitGuess = (digit: string) => {
    if (guessedDigits.has(digit)) return

    const newGuessed = new Set(guessedDigits)
    newGuessed.add(digit)
    setGuessedDigits(newGuessed)

    if (answerString.includes(digit)) {
      const allDigitsGuessed = answerString.split("").every((d) => newGuessed.has(d))
      if (allDigitsGuessed) {
        setScore(score + 1)
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        })
        setTimeout(() => handleNext(), 1500)
      }
    } else {
      const newMistakes = mistakes + 1
      setMistakes(newMistakes)
      if (newMistakes >= maxMistakes) {
        setGameOver(true)
      }
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setGuessedDigits(new Set())
      setMistakes(0)
      setShowHint(false)
      setGameOver(false)
    } else {
      setShowFinalScore(true)
      if (score >= 7) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setMistakes(0)
    setGuessedDigits(new Set())
    setShowHint(false)
    setGameOver(false)
    setShowFinalScore(false)
    const shuffled = [...questionsData[difficulty]].sort(() => Math.random() - 0.5).slice(0, 10)
    setQuestions(shuffled)
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-2xl">Cargando...</p>
      </div>
    )
  }

  if (showFinalScore) {
    const percentage = Math.round((score / questions.length) * 100)
    const stars = score >= 9 ? 3 : score >= 7 ? 2 : score >= 5 ? 1 : 0

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cosmic-nebula-stars.png')] bg-cover bg-center opacity-20" />

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
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border-2 border-cyan-400/50 p-12 max-w-2xl w-full mx-4">
            <div className="text-center">
              <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-4">¡Juego Completado!</h2>
              <p className="text-2xl text-white mb-8">
                Acertaste {score} de {questions.length} preguntas ({percentage}%)
              </p>

              <div className="flex justify-center gap-2 mb-8">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-12 h-12 ${i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                  />
                ))}
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={handleRestart}
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white px-8 py-6 text-lg rounded-xl"
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
      </div>
    )
  }

  const displayAnswer = answerString
    .split("")
    .map((digit) => (guessedDigits.has(digit) ? digit : "_"))
    .join(" ")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900 to-teal-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/cosmic-nebula-stars.png')] bg-cover bg-center opacity-20" />

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

          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-cyan-400/50">
            <p className="text-white text-lg font-bold">
              Pregunta {currentQuestion + 1} de {questions.length}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-cyan-400/50 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <p className="text-white text-lg font-bold">{score}</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-150px)] px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border-2 border-cyan-400/50 p-12 max-w-3xl w-full">
          <h2 className="text-4xl font-bold text-cyan-400 text-center mb-8">Ahorcado Matemático</h2>

          {gameOver && (
            <div className="mb-6 p-6 rounded-xl bg-red-500/20 border-2 border-red-400">
              <p className="text-white text-center text-2xl font-bold mb-4">Perdiste, vuelve a intentarlo</p>
              <p className="text-white text-center text-xl">La respuesta correcta era: {answerString}</p>
              <Button
                onClick={handleNext}
                className="w-full mt-4 h-12 text-lg font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white"
              >
                {currentQuestion < questions.length - 1 ? "Siguiente Pregunta" : "Ver Resultados"}
              </Button>
            </div>
          )}

          {!gameOver && (
            <>
              <div className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-2xl p-8 mb-8 border-2 border-cyan-400/50">
                <p className="text-4xl font-bold text-white text-center mb-4">{currentQuestionData.problem}</p>
                <p className="text-5xl font-mono text-cyan-400 text-center tracking-widest">{displayAnswer}</p>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-white text-xl font-bold">
                    Errores: {mistakes} / {maxMistakes}
                  </p>
                  <Button
                    onClick={() => setShowHint(!showHint)}
                    variant="outline"
                    className="bg-yellow-500/20 border-yellow-400 text-yellow-400 hover:bg-yellow-500/30"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Pista
                  </Button>
                </div>

                {showHint && (
                  <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-xl p-4">
                    <p className="text-yellow-400 text-center">{currentQuestionData.hint}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-5 gap-3">
                {[...Array(10)].map((_, i) => {
                  const digit = i.toString()
                  const isGuessed = guessedDigits.has(digit)
                  const isCorrect = answerString.includes(digit)

                  return (
                    <Button
                      key={digit}
                      onClick={() => handleDigitGuess(digit)}
                      disabled={isGuessed}
                      className={`h-16 text-2xl font-bold rounded-xl ${
                        isGuessed
                          ? isCorrect
                            ? "bg-green-500 hover:bg-green-500"
                            : "bg-red-500 hover:bg-red-500"
                          : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400"
                      } text-white`}
                    >
                      {digit}
                    </Button>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
