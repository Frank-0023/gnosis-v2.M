"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import QuizSelection from "@/components/quiz-selection"
import Quiz from "@/components/quiz"
import MathLogicQuiz from "@/components/quizzes/math-logic-quiz"
import AdvancedNumberSoup from "@/components/quizzes/advanced-number-soup"
import VaultEscape from "@/components/quizzes/vault-escape"
import RiddlesQuiz from "@/components/quizzes/riddles-quiz"
import LogicPatternsQuiz from "@/components/quizzes/logic-patterns-quiz"
import LogicReasoningQuiz from "@/components/quizzes/logic-reasoning-quiz"
import GeneralMathHangman from "@/components/quizzes/general-math-hangman"

interface GeneralSectionProps {
  onBack: () => void
}

type Difficulty = "easy" | "medium" | "hard" | null

export default function GeneralSection({ onBack }: GeneralSectionProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(null)
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)

  if (selectedDifficulty && selectedQuiz) {
    if (selectedQuiz === "math-logic") {
      return <MathLogicQuiz difficulty={selectedDifficulty} onBack={() => setSelectedQuiz(null)} />
    }
    if (selectedQuiz === "number-soup") {
      return <AdvancedNumberSoup difficulty={selectedDifficulty} onBack={() => setSelectedQuiz(null)} />
    }
    if (selectedQuiz === "vault-escape") {
      return <VaultEscape difficulty={selectedDifficulty} onBack={() => setSelectedQuiz(null)} />
    }
    if (selectedQuiz === "riddles") {
      return <RiddlesQuiz difficulty={selectedDifficulty} onBack={() => setSelectedQuiz(null)} />
    }
    if (selectedQuiz === "logic-patterns") {
      return <LogicPatternsQuiz difficulty={selectedDifficulty} onBack={() => setSelectedQuiz(null)} />
    }
    if (selectedQuiz === "logic-reasoning") {
      return <LogicReasoningQuiz difficulty={selectedDifficulty} onBack={() => setSelectedQuiz(null)} />
    }
    if (selectedQuiz === "math-hangman") {
      return <GeneralMathHangman difficulty={selectedDifficulty} onBack={() => setSelectedQuiz(null)} />
    }
    return <Quiz difficulty={selectedDifficulty} onBack={() => setSelectedQuiz(null)} />
  }

  if (selectedDifficulty) {
    return (
      <QuizSelection
        difficulty={selectedDifficulty}
        onBack={() => setSelectedDifficulty(null)}
        onSelectQuiz={setSelectedQuiz}
      />
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-cyan-900/30" />
      <div className="absolute inset-0 bg-[url('/cosmic-nebula-stars.png')] bg-cover bg-center opacity-30" />

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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">
          <span className="text-cyan-400">Sección General</span>
        </h1>
        <p className="text-gray-300 text-center text-xl mb-12">Seleacna el nivel of dificlicad</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-md rounded-3xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 p-8 hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl p-6 mb-6 shadow-lg shadow-cyan-500/50 flex items-center justify-center">
              <div className="text-6xl">😊</div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">Facil</h2>

            <p className="text-gray-300 mb-8 leading-relaxed">
              Juegos de matematicas divertidos para todas las edades. Aprende sumando, restando y m-mas!
            </p>

            <Button
              onClick={() => setSelectedDifficulty("easy")}
              className="w-full h-12 text-lg font-bold rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/50"
            >
              Seleccionar
            </Button>
          </div>

          <div className="bg-gradient-to-br from-teal-900/40 to-green-900/40 backdrop-blur-md rounded-3xl border-2 border-teal-500/50 shadow-2xl shadow-teal-500/20 p-8 hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-teal-500 to-green-500 rounded-3xl p-6 mb-6 shadow-lg shadow-teal-500/50 flex items-center justify-center">
              <div className="text-6xl">📖</div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">Medio</h2>

            <p className="text-gray-300 mb-8 leading-relaxed">
              Quizzes y acertijos matematicos para todas las edades. Pon a prueba tu logica!
            </p>

            <Button
              onClick={() => setSelectedDifficulty("medium")}
              className="w-full h-12 text-lg font-bold rounded-2xl bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-400 hover:to-green-400 text-white shadow-lg shadow-teal-500/50"
            >
              Comenzar Quiz
            </Button>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 p-8 hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 mb-6 shadow-lg shadow-purple-500/50 flex items-center justify-center">
              <div className="text-6xl">⚡</div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">Dificil</h2>

            <p className="text-gray-300 mb-8 leading-relaxed">
              Un nuevo desafio matematico cada dia. Resuelve y gana estrellas especiales!
            </p>

            <Button
              onClick={() => setSelectedDifficulty("hard")}
              className="w-full h-12 text-lg font-bold rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-lg shadow-purple-500/50"
            >
              Aceptar Reto
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
