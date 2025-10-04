"use client"

import { useState } from "react"
import { ArrowLeft, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

interface RiddlesQuizProps {
  difficulty: "easy" | "medium" | "hard"
  onBack: () => void
}

const riddlesData = {
  easy: [
    {
      question: "Tengo agujas pero no coso, tengo números pero no cuento. ¿Qué soy?",
      options: ["Un reloj", "Una brújula", "Un termómetro"],
      correct: 0,
      explanation: "Un reloj tiene agujas (manecillas) y números, pero no cose ni cuenta.",
    },
    {
      question: "Blanca por dentro, verde por fuera. Si quieres que te lo diga, espera.",
      options: ["La pera", "La manzana", "El plátano"],
      correct: 0,
      explanation: "La pera es blanca por dentro y verde por fuera.",
    },
    {
      question: "Tiene dientes pero no muerde. ¿Qué es?",
      options: ["Un peine", "Un tenedor", "Una sierra"],
      correct: 0,
      explanation: "Un peine tiene dientes pero no puede morder.",
    },
    {
      question: "Cuanto más seca, más moja. ¿Qué es?",
      options: ["La toalla", "La esponja", "El agua"],
      correct: 0,
      explanation: "La toalla: cuanto más seca está, más agua puede absorber (mojar).",
    },
    {
      question: "Tiene ojos y no ve, tiene agua y no la bebe. ¿Qué es?",
      options: ["El coco", "La papa", "El queso"],
      correct: 0,
      explanation: "El coco tiene 'ojos' (los agujeros) y agua de coco dentro.",
    },
  ],
  medium: [
    {
      question: "Vuelo sin alas, lloro sin ojos. Donde quiera que voy, la oscuridad me sigue. ¿Qué soy?",
      options: ["La nube", "El viento", "La sombra"],
      correct: 0,
      explanation: "La nube vuela sin alas, llora (lluvia) sin ojos, y donde va trae oscuridad.",
    },
    {
      question: "Tengo ciudades pero no casas, tengo montañas pero no árboles, tengo agua pero no peces. ¿Qué soy?",
      options: ["Un mapa", "Un libro", "Una foto"],
      correct: 0,
      explanation: "Un mapa tiene representaciones de ciudades, montañas y agua, pero no los objetos reales.",
    },
    {
      question: "Cuanto más quitas, más grande se hace. ¿Qué es?",
      options: ["Un agujero", "Una deuda", "El hambre"],
      correct: 0,
      explanation: "Un agujero: cuanto más tierra quitas, más grande se hace.",
    },
    {
      question:
        "Puedo volar sin alas, puedo llorar sin ojos. Aparezco con la luz y desaparezco con la oscuridad. ¿Qué soy?",
      options: ["Una sombra", "Un reflejo", "El humo"],
      correct: 0,
      explanation: "Una sombra aparece con la luz y desaparece en la oscuridad.",
    },
    {
      question: "Tengo llaves pero no abro puertas, tengo espacio pero no tengo habitaciones. ¿Qué soy?",
      options: ["Un teclado", "Un piano", "Un mapa"],
      correct: 0,
      explanation: "Un teclado tiene teclas (llaves) y barra espaciadora (espacio).",
    },
  ],
  hard: [
    {
      question:
        "Soy el principio del fin, el final del tiempo y el espacio, el comienzo de cada final y el fin de cada lugar. ¿Qué soy?",
      options: ["La letra E", "El tiempo", "La muerte"],
      correct: 0,
      explanation: "La letra 'E' está al principio de 'fin', al final de 'tiempo' y 'espacio', etc.",
    },
    {
      question: "Cuanto más me quitas, más grande me vuelvo. Cuanto más me añades, más pequeño me hago. ¿Qué soy?",
      options: ["Un agujero en el suelo", "Una deuda", "El conocimiento"],
      correct: 0,
      explanation: "Un agujero: quitar tierra lo agranda, añadir tierra lo reduce.",
    },
    {
      question: "Puedo ser largo o corto, puedo ser crecido o comprado, puedo ser pintado o dejado desnudo. ¿Qué soy?",
      options: ["El cabello", "Una uña", "Un árbol"],
      correct: 0,
      explanation:
        "El cabello puede ser largo/corto, crece naturalmente o se compran extensiones, se pinta o se deja natural.",
    },
    {
      question: "Hablo sin boca y oigo sin oídos. No tengo cuerpo, pero cobro vida con el viento. ¿Qué soy?",
      options: ["Un eco", "Una radio", "Un teléfono"],
      correct: 0,
      explanation: "Un eco repite sonidos sin tener boca u oídos, y se propaga por el aire.",
    },
    {
      question: "Tengo un corazón que no late, una casa pero no vivo en ella, y corro pero no tengo piernas. ¿Qué soy?",
      options: ["Un río", "Un reloj", "Un árbol"],
      correct: 0,
      explanation: "Un río tiene corazón (centro), cauce (casa), y corre sin piernas.",
    },
  ],
}

export default function RiddlesQuiz({ difficulty, onBack }: RiddlesQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)

  const riddles = riddlesData[difficulty]
  const currentRiddle = riddles[currentQuestion]

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    if (answerIndex === currentRiddle.correct) {
      setScore(score + 1)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }

    setTimeout(() => {
      if (currentQuestion < riddles.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowExplanation(false)
      } else {
        setQuizComplete(true)
      }
    }, 3000)
  }

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-pink-900/40" />
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <div className="text-8xl mb-6">🧩</div>
          <h2 className="text-5xl font-bold text-white mb-4">Quiz Completado!</h2>
          <p className="text-2xl text-cyan-300 mb-4">
            Acertaste: <span className="text-pink-400 font-bold">{score}</span> de {riddles.length}
          </p>
          <p className="text-xl text-gray-300 mb-8">Puntuación: {Math.round((score / riddles.length) * 100)}%</p>
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
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-pink-900/40" />
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
              {currentQuestion + 1}/{riddles.length}
            </span>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full border-2 border-white/30 shadow-lg">
            <span className="text-white font-bold text-xl">⭐ {score}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl border-2 border-indigo-500/50 shadow-2xl shadow-indigo-500/20 p-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Lightbulb className="w-10 h-10 text-yellow-400" />
            <h2 className="text-3xl font-bold text-center text-white">Acertijos</h2>
          </div>

          <div className="bg-purple-900/30 rounded-2xl p-8 mb-8 border-2 border-purple-500/30">
            <p className="text-2xl text-white text-center leading-relaxed">{currentRiddle.question}</p>
          </div>

          {showExplanation && (
            <div
              className={`mb-6 p-6 rounded-xl text-center border-2 ${
                selectedAnswer === currentRiddle.correct
                  ? "bg-green-500/20 border-green-500"
                  : "bg-red-500/20 border-red-500"
              }`}
            >
              <p
                className={`text-xl font-bold mb-2 ${
                  selectedAnswer === currentRiddle.correct ? "text-green-300" : "text-red-300"
                }`}
              >
                {selectedAnswer === currentRiddle.correct ? "¡Correcto!" : "Incorrecto"}
              </p>
              <p className="text-white text-lg">{currentRiddle.explanation}</p>
            </div>
          )}

          <div className="grid gap-4">
            {currentRiddle.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`h-20 text-xl font-bold rounded-2xl transition-all duration-300 ${
                  selectedAnswer === index
                    ? index === currentRiddle.correct
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 scale-105 ring-4 ring-green-300"
                      : "bg-gradient-to-r from-red-500 to-rose-500 scale-95"
                    : showExplanation && index === currentRiddle.correct
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 ring-4 ring-green-300"
                      : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105"
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
