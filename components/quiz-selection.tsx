"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuizTopic {
  id: string
  title: string
  description: string
  icon: string
  color: string
  borderColor: string
  shadowColor: string
}

interface QuizSelectionProps {
  difficulty: "easy" | "medium" | "hard"
  onBack: () => void
  onSelectQuiz: (quizId: string) => void
}

const quizData: Record<string, QuizTopic[]> = {
  easy: [
    {
      id: "math-logic",
      title: "Problemas Matemáticos",
      description: "Álgebra básica y lógica",
      icon: "🧮",
      color: "from-cyan-500 to-blue-500",
      borderColor: "border-cyan-500/50",
      shadowColor: "shadow-cyan-500/20",
    },
    {
      id: "number-soup",
      title: "Sopa de Números",
      description: "Encuentra combinaciones que sumen el objetivo",
      icon: "🔢",
      color: "from-teal-500 to-cyan-500",
      borderColor: "border-teal-500/50",
      shadowColor: "shadow-teal-500/20",
    },
    {
      id: "vault-escape",
      title: "Escape de la Bóveda",
      description: "Resuelve ecuaciones para desbloquear circuitos",
      icon: "🔐",
      color: "from-green-500 to-teal-500",
      borderColor: "border-green-500/50",
      shadowColor: "shadow-green-500/20",
    },
    {
      id: "riddles",
      title: "Acertijos",
      description: "Resuelve acertijos lógicos",
      icon: "🤔",
      color: "from-purple-500 to-violet-500",
      borderColor: "border-purple-500/50",
      shadowColor: "shadow-purple-500/20",
    },
    {
      id: "logic-patterns",
      title: "Patrones Lógicos",
      description: "Encuentra el número que falta",
      icon: "🔢",
      color: "from-pink-500 to-rose-500",
      borderColor: "border-pink-500/50",
      shadowColor: "shadow-pink-500/20",
    },
    {
      id: "logic-reasoning",
      title: "Razonamiento Lógico",
      description: "Desafía tu lógica",
      icon: "🧩",
      color: "from-orange-500 to-amber-500",
      borderColor: "border-orange-500/50",
      shadowColor: "shadow-orange-500/20",
    },
    {
      id: "math-hangman",
      title: "Ahorcado Matemático",
      description: "Adivina el resultado",
      icon: "🎯",
      color: "from-teal-500 to-green-500",
      borderColor: "border-teal-500/50",
      shadowColor: "shadow-teal-500/20",
    },
  ],
  medium: [
    {
      id: "math-logic",
      title: "Problemas Matemáticos",
      description: "Ecuaciones y lógica intermedia",
      icon: "🧮",
      color: "from-cyan-500 to-blue-500",
      borderColor: "border-cyan-500/50",
      shadowColor: "shadow-cyan-500/20",
    },
    {
      id: "number-soup",
      title: "Sopa de Números",
      description: "Combinaciones más complejas",
      icon: "🔢",
      color: "from-teal-500 to-cyan-500",
      borderColor: "border-teal-500/50",
      shadowColor: "shadow-teal-500/20",
    },
    {
      id: "vault-escape",
      title: "Escape de la Bóveda",
      description: "Ecuaciones cuadráticas y exponenciales",
      icon: "🔐",
      color: "from-green-500 to-teal-500",
      borderColor: "border-green-500/50",
      shadowColor: "shadow-green-500/20",
    },
    {
      id: "riddles",
      title: "Acertijos",
      description: "Acertijos de dificultad media",
      icon: "🤔",
      color: "from-purple-500 to-violet-500",
      borderColor: "border-purple-500/50",
      shadowColor: "shadow-purple-500/20",
    },
    {
      id: "logic-patterns",
      title: "Patrones Lógicos",
      description: "Secuencias más complejas",
      icon: "🔢",
      color: "from-pink-500 to-rose-500",
      borderColor: "border-pink-500/50",
      shadowColor: "shadow-pink-500/20",
    },
    {
      id: "logic-reasoning",
      title: "Razonamiento Lógico",
      description: "Problemas de lógica intermedia",
      icon: "🧩",
      color: "from-orange-500 to-amber-500",
      borderColor: "border-orange-500/50",
      shadowColor: "shadow-orange-500/20",
    },
    {
      id: "math-hangman",
      title: "Ahorcado Matemático",
      description: "Multiplicaciones y divisiones",
      icon: "🎯",
      color: "from-teal-500 to-green-500",
      borderColor: "border-teal-500/50",
      shadowColor: "shadow-teal-500/20",
    },
  ],
  hard: [
    {
      id: "math-logic",
      title: "Problemas Matemáticos",
      description: "Álgebra avanzada y cálculo",
      icon: "🧮",
      color: "from-cyan-500 to-blue-500",
      borderColor: "border-cyan-500/50",
      shadowColor: "shadow-cyan-500/20",
    },
    {
      id: "number-soup",
      title: "Sopa de Números",
      description: "Desafío extremo de combinaciones",
      icon: "🔢",
      color: "from-teal-500 to-cyan-500",
      borderColor: "border-teal-500/50",
      shadowColor: "shadow-teal-500/20",
    },
    {
      id: "vault-escape",
      title: "Escape de la Bóveda",
      description: "Logaritmos y ecuaciones complejas",
      icon: "🔐",
      color: "from-green-500 to-teal-500",
      borderColor: "border-green-500/50",
      shadowColor: "shadow-green-500/20",
    },
    {
      id: "riddles",
      title: "Acertijos",
      description: "Acertijos muy difíciles",
      icon: "🤔",
      color: "from-purple-500 to-violet-500",
      borderColor: "border-purple-500/50",
      shadowColor: "shadow-purple-500/20",
    },
    {
      id: "logic-patterns",
      title: "Patrones Lógicos",
      description: "Secuencias avanzadas",
      icon: "🔢",
      color: "from-pink-500 to-rose-500",
      borderColor: "border-pink-500/50",
      shadowColor: "shadow-pink-500/20",
    },
    {
      id: "logic-reasoning",
      title: "Razonamiento Lógico",
      description: "Desafíos de lógica extrema",
      icon: "🧩",
      color: "from-orange-500 to-amber-500",
      borderColor: "border-orange-500/50",
      shadowColor: "shadow-orange-500/20",
    },
    {
      id: "math-hangman",
      title: "Ahorcado Matemático",
      description: "Ecuaciones algebraicas",
      icon: "🎯",
      color: "from-teal-500 to-green-500",
      borderColor: "border-teal-500/50",
      shadowColor: "shadow-teal-500/20",
    },
  ],
}

export default function QuizSelection({ difficulty, onBack, onSelectQuiz }: QuizSelectionProps) {
  const quizzes = quizData[difficulty]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Space background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-cyan-900/30" />
      <div className="absolute inset-0 bg-[url('/cosmic-nebula-stars.png')] bg-cover bg-center opacity-30" />

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
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

      {/* Header */}
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

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">
          <span className="text-cyan-400">
            Quizzes - Nivel {difficulty === "easy" ? "Fácil" : difficulty === "medium" ? "Medio" : "Difícil"}
          </span>
        </h1>
        <p className="text-gray-300 text-center text-xl mb-12">Selecciona un tema para comenzar</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className={`bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-md rounded-3xl border-2 ${quiz.borderColor} shadow-2xl ${quiz.shadowColor} p-6 hover:scale-105 transition-all duration-300 cursor-pointer`}
              onClick={() => onSelectQuiz(quiz.id)}
            >
              <div
                className={`bg-gradient-to-br ${quiz.color} rounded-2xl p-6 mb-4 shadow-lg flex items-center justify-center`}
              >
                <div className="text-5xl">{quiz.icon}</div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 text-balance">{quiz.title}</h3>

              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{quiz.description}</p>

              <Button
                className={`w-full h-10 text-sm font-bold rounded-xl bg-gradient-to-r ${quiz.color} hover:opacity-90 text-white shadow-lg`}
              >
                Comenzar
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
