"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import confetti from "canvas-confetti"

interface DailyChallengeProps {
  onBack: () => void
}

interface Challenge {
  question: string
  answer: number
  hint: string
}

const challenges: Challenge[] = [
  {
    question: "Tengo 3 cajas. Cada caja tiene 4 manzanas. ¿Cuántas manzanas tengo en total?",
    answer: 12,
    hint: "Multiplica el número de cajas por las manzanas en cada caja",
  },
  {
    question: "Si un libro cuesta $15 y tengo $50, ¿cuántos libros puedo comprar?",
    answer: 3,
    hint: "Divide el dinero que tienes entre el precio del libro",
  },
  {
    question: "María tiene 8 años. Su hermano tiene el doble de su edad. ¿Cuántos años tiene su hermano?",
    answer: 16,
    hint: "El doble significa multiplicar por 2",
  },
]

export default function DailyChallenge({ onBack }: DailyChallengeProps) {
  const [userAnswer, setUserAnswer] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [showFeedback, setShowFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [completed, setCompleted] = useState(false)
  const [challenge, setChallenge] = useState<Challenge | null>(null)

  useEffect(() => {
    const today = new Date().toDateString()
    const lastChallenge = localStorage.getItem("lastDailyChallenge")

    if (lastChallenge === today) {
      setCompleted(true)
    } else {
      const dayIndex = new Date().getDate() % challenges.length
      setChallenge(challenges[dayIndex])
    }
  }, [])

  const handleSubmit = () => {
    if (!challenge) return

    const answer = Number.parseInt(userAnswer)
    if (answer === challenge.answer) {
      setShowFeedback("correct")
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      })

      const currentStars = Number.parseInt(localStorage.getItem("gnosisStars") || "0")
      localStorage.setItem("gnosisStars", (currentStars + 5).toString())
      localStorage.setItem("lastDailyChallenge", new Date().toDateString())

      setTimeout(() => {
        setCompleted(true)
      }, 2000)
    } else {
      setShowFeedback("incorrect")
      setTimeout(() => {
        setShowFeedback(null)
      }, 1500)
    }
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-cyan-900/30" />
        <div className="absolute inset-0 bg-[url('/cosmic-nebula-stars.png')] bg-cover bg-center opacity-30" />

        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <div className="bg-gradient-to-br from-orange-900/40 to-pink-900/40 backdrop-blur-md rounded-3xl border-2 border-orange-500/50 shadow-2xl shadow-orange-500/20 p-12 text-center">
            <div className="text-8xl mb-6">🎊</div>
            <h2 className="text-5xl font-bold text-white mb-4">¡Reto Completado!</h2>
            <p className="text-2xl text-orange-400 mb-8">
              ¡Ya completaste el reto de hoy! Vuelve mañana para un nuevo desafío.
            </p>
            <Button
              onClick={onBack}
              className="w-full h-14 text-xl font-bold rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white shadow-lg shadow-orange-500/50"
            >
              Volver al Inicio
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!challenge) return null

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-cyan-900/30" />
      <div className="absolute inset-0 bg-[url('/cosmic-nebula-stars.png')] bg-cover bg-center opacity-30" />

      <div className="relative z-10 p-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Inicio
        </Button>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-orange-400">Reto Diario</span>
          </h1>
          <p className="text-gray-300 text-xl">¡Resuelve el desafío y gana 5 estrellas! ⭐</p>
        </div>

        <div className="bg-gradient-to-br from-orange-900/40 to-pink-900/40 backdrop-blur-md rounded-3xl border-2 border-orange-500/50 shadow-2xl shadow-orange-500/20 p-12">
          <div className="text-center mb-8">
            <div className="text-6xl mb-6">🧩</div>
            <h2 className="text-3xl font-bold text-white mb-8 leading-relaxed">{challenge.question}</h2>
          </div>

          <div className="space-y-6">
            <Input
              type="number"
              placeholder="Tu respuesta"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="bg-black/50 border-2 border-orange-500/50 text-white text-2xl placeholder:text-gray-500 h-16 text-center rounded-2xl focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50"
            />

            <Button
              onClick={handleSubmit}
              disabled={!userAnswer || showFeedback !== null}
              className="w-full h-14 text-xl font-bold rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white shadow-lg shadow-orange-500/50 disabled:opacity-50"
            >
              Enviar Respuesta
            </Button>

            {!showHint && (
              <Button
                onClick={() => setShowHint(true)}
                variant="outline"
                className="w-full h-12 text-lg rounded-2xl bg-yellow-900/30 border-yellow-500/50 text-yellow-400 hover:bg-yellow-900/50"
              >
                💡 Ver Pista
              </Button>
            )}

            {showHint && (
              <div className="bg-yellow-900/30 border-2 border-yellow-500/50 rounded-2xl p-6">
                <p className="text-yellow-400 text-lg text-center">
                  <strong>Pista:</strong> {challenge.hint}
                </p>
              </div>
            )}
          </div>

          {showFeedback === "correct" && (
            <div className="mt-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-3xl font-bold text-green-400">¡Correcto! +5 ⭐</p>
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
