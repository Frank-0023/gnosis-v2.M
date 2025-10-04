"use client"

import { useState } from "react"
import { ArrowLeft, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

interface MathLogicQuizProps {
  difficulty: "easy" | "medium" | "hard"
  onBack: () => void
}

interface Question {
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

const quizQuestions = {
  easy: [
    {
      question: "Si x + 5 = 12, ¿cuál es el valor de x?",
      options: ["5", "7", "8", "17"],
      correctAnswer: 1,
      explanation: "x = 12 - 5 = 7",
    },
    {
      question: "¿Cuál es el 20% de 150?",
      options: ["20", "25", "30", "35"],
      correctAnswer: 2,
      explanation: "150 × 0.20 = 30",
    },
    {
      question: "Si un libro cuesta $45 y tiene 15% de descuento, ¿cuánto pagas?",
      options: ["$38.25", "$40.50", "$42.75", "$43.50"],
      correctAnswer: 0,
      explanation: "45 - (45 × 0.15) = 45 - 6.75 = $38.25",
    },
    {
      question: "¿Cuál número continúa la secuencia: 3, 6, 12, 24, ...?",
      options: ["36", "42", "48", "54"],
      correctAnswer: 2,
      explanation: "Cada número se multiplica por 2",
    },
    {
      question: "Si 3 manzanas cuestan $6, ¿cuánto cuestan 7 manzanas?",
      options: ["$12", "$14", "$16", "$18"],
      correctAnswer: 1,
      explanation: "Cada manzana cuesta $2, entonces 7 × $2 = $14",
    },
    {
      question: "¿Cuál es el área de un rectángulo de 8m × 5m?",
      options: ["26 m²", "32 m²", "40 m²", "45 m²"],
      correctAnswer: 2,
      explanation: "Área = base × altura = 8 × 5 = 40 m²",
    },
    {
      question: "Si hoy es miércoles, ¿qué día será en 100 días?",
      options: ["Lunes", "Martes", "Miércoles", "Jueves"],
      correctAnswer: 3,
      explanation: "100 ÷ 7 = 14 semanas y 2 días. Miércoles + 2 días = Jueves",
    },
    {
      question: "¿Cuántos minutos hay en 2.5 horas?",
      options: ["120", "130", "140", "150"],
      correctAnswer: 3,
      explanation: "2.5 × 60 = 150 minutos",
    },
    {
      question: "Si un tren sale a las 14:30 y llega a las 17:15, ¿cuánto duró el viaje?",
      options: ["2h 15min", "2h 30min", "2h 45min", "3h"],
      correctAnswer: 2,
      explanation: "De 14:30 a 17:15 son 2 horas y 45 minutos",
    },
    {
      question: "¿Cuál es el perímetro de un cuadrado de lado 9 cm?",
      options: ["27 cm", "32 cm", "36 cm", "81 cm"],
      correctAnswer: 2,
      explanation: "Perímetro = 4 × lado = 4 × 9 = 36 cm",
    },
  ],
  medium: [
    {
      question: "Si 2x + 7 = 19, ¿cuál es el valor de x?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 2,
      explanation: "2x = 19 - 7 = 12, entonces x = 6",
    },
    {
      question: "Un producto cuesta $80 después de un descuento del 20%. ¿Cuál era el precio original?",
      options: ["$96", "$100", "$104", "$110"],
      correctAnswer: 1,
      explanation: "Si $80 es el 80%, entonces 100% = 80 ÷ 0.8 = $100",
    },
    {
      question: "¿Cuál es el siguiente número primo después de 23?",
      options: ["25", "27", "29", "31"],
      correctAnswer: 2,
      explanation: "29 es el siguiente número primo",
    },
    {
      question: "Si 5 trabajadores tardan 8 días en terminar un trabajo, ¿cuántos días tardarán 10 trabajadores?",
      options: ["2 días", "4 días", "6 días", "8 días"],
      correctAnswer: 1,
      explanation: "Es inversamente proporcional: (5 × 8) ÷ 10 = 4 días",
    },
    {
      question: "¿Cuál es el área de un círculo con radio 5 cm? (π ≈ 3.14)",
      options: ["31.4 cm²", "62.8 cm²", "78.5 cm²", "157 cm²"],
      correctAnswer: 2,
      explanation: "Área = π × r² = 3.14 × 5² = 78.5 cm²",
    },
    {
      question: "Si lanzas dos dados, ¿cuál es la probabilidad de obtener suma 7?",
      options: ["1/6", "1/9", "1/12", "1/18"],
      correctAnswer: 0,
      explanation: "Hay 6 combinaciones que suman 7 de 36 posibles: 6/36 = 1/6",
    },
    {
      question: "¿Cuál número continúa: 2, 6, 12, 20, 30, ...?",
      options: ["38", "40", "42", "44"],
      correctAnswer: 2,
      explanation: "Diferencias: 4, 6, 8, 10, 12... entonces 30 + 12 = 42",
    },
    {
      question: "Si x² = 64, ¿cuáles son los valores posibles de x?",
      options: ["8", "-8", "±8", "±4"],
      correctAnswer: 2,
      explanation: "x puede ser 8 o -8, ya que ambos al cuadrado dan 64",
    },
    {
      question: "¿Cuántos triángulos hay en un pentágono dividido desde un vértice?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      explanation: "Un pentágono se puede dividir en 3 triángulos",
    },
    {
      question: "Si el lado de un cubo es 4 cm, ¿cuál es su volumen?",
      options: ["16 cm³", "48 cm³", "64 cm³", "96 cm³"],
      correctAnswer: 2,
      explanation: "Volumen = lado³ = 4³ = 64 cm³",
    },
  ],
  hard: [
    {
      question: "Si 3x - 2y = 10 y x + y = 8, ¿cuál es el valor de x?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 2,
      explanation: "Resolviendo el sistema: y = 8 - x, entonces 3x - 2(8-x) = 10, x = 6",
    },
    {
      question: "¿Cuál es la derivada de f(x) = x³ + 2x?",
      options: ["3x² + 2", "x² + 2", "3x² + 2x", "x³ + 2"],
      correctAnswer: 0,
      explanation: "f'(x) = 3x² + 2",
    },
    {
      question: "Si log₂(x) = 5, ¿cuál es el valor de x?",
      options: ["10", "16", "25", "32"],
      correctAnswer: 3,
      explanation: "x = 2⁵ = 32",
    },
    {
      question: "¿Cuál es el valor de sen(30°)?",
      options: ["0.5", "0.707", "0.866", "1"],
      correctAnswer: 0,
      explanation: "sen(30°) = 1/2 = 0.5",
    },
    {
      question: "Si una inversión de $1000 crece al 5% anual compuesto, ¿cuánto tendrás en 3 años?",
      options: ["$1150", "$1157.63", "$1200", "$1250"],
      correctAnswer: 1,
      explanation: "1000 × (1.05)³ = $1157.63",
    },
    {
      question: "¿Cuál es la suma de los ángulos internos de un octágono?",
      options: ["720°", "900°", "1080°", "1260°"],
      correctAnswer: 2,
      explanation: "(n-2) × 180° = (8-2) × 180° = 1080°",
    },
    {
      question: "Si f(x) = 2x + 3 y g(x) = x², ¿cuál es f(g(2))?",
      options: ["7", "11", "13", "19"],
      correctAnswer: 1,
      explanation: "g(2) = 4, entonces f(4) = 2(4) + 3 = 11",
    },
    {
      question: "¿Cuál es el valor de √(144 + 25)?",
      options: ["12", "13", "14", "17"],
      correctAnswer: 1,
      explanation: "√(144 + 25) = √169 = 13",
    },
    {
      question: "Si una secuencia aritmética tiene a₁ = 5 y d = 3, ¿cuál es a₁₀?",
      options: ["29", "32", "35", "38"],
      correctAnswer: 1,
      explanation: "aₙ = a₁ + (n-1)d = 5 + 9(3) = 32",
    },
    {
      question: "¿Cuántas diagonales tiene un dodecágono (12 lados)?",
      options: ["48", "54", "60", "66"],
      correctAnswer: 1,
      explanation: "n(n-3)/2 = 12(9)/2 = 54 diagonales",
    },
  ],
}

export default function MathLogicQuiz({ difficulty, onBack }: MathLogicQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [quizComplete, setQuizComplete] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(30)

  const questions = quizQuestions[difficulty]
  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = (selectedIndex: number) => {
    setSelectedAnswer(selectedIndex)
    if (selectedIndex === currentQuestion.correctAnswer) {
      setShowFeedback("correct")
      const timeBonus = Math.floor(timeLeft / 3)
      setScore(score + 10 + timeBonus)
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
      setSelectedAnswer(null)
      setTimeLeft(30)
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setQuizComplete(true)
      }
    }, 3000)
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
            <div className="bg-orange-900/50 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-orange-500/50 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 font-bold text-lg">{timeLeft}s</span>
            </div>
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
          <h2 className="text-3xl font-bold text-white text-center mb-12 leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback !== null}
                className={`h-20 text-xl font-bold rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 ${
                  selectedAnswer === index
                    ? index === currentQuestion.correctAnswer
                      ? "!bg-gradient-to-r !from-green-500 !to-emerald-500"
                      : "!bg-gradient-to-r !from-red-500 !to-rose-500"
                    : ""
                }`}
              >
                {option}
              </Button>
            ))}
          </div>

          {showFeedback && (
            <div className="mt-8 text-center">
              {showFeedback === "correct" ? (
                <>
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-3xl font-bold text-green-400 mb-2">¡Correcto!</p>
                  <p className="text-lg text-gray-300">{currentQuestion.explanation}</p>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">😅</div>
                  <p className="text-3xl font-bold text-red-400 mb-2">¡Incorrecto!</p>
                  <p className="text-lg text-gray-300">{currentQuestion.explanation}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
