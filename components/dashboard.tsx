"use client"

import { useState } from "react"
import { Rocket, BookOpen, Zap, LogOut, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import KidsSection from "@/components/kids-section"
import GeneralSection from "@/components/general-section"
import DailyChallenge from "@/components/daily-challenge"

interface DashboardProps {
  userName: string
  onLogout: () => void
}

type Section = "dashboard" | "kids" | "general" | "daily"

export default function Dashboard({ userName, onLogout }: DashboardProps) {
  const [currentSection, setCurrentSection] = useState<Section>("dashboard")
  const [stars, setStars] = useState(() => {
    const stored = localStorage.getItem("gnosisStars")
    return stored ? Number.parseInt(stored) : 0
  })

  if (currentSection === "kids") {
    return <KidsSection onBack={() => setCurrentSection("dashboard")} />
  }

  if (currentSection === "general") {
    return <GeneralSection onBack={() => setCurrentSection("dashboard")} />
  }

  if (currentSection === "daily") {
    return <DailyChallenge onBack={() => setCurrentSection("dashboard")} />
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Space background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-cyan-900/30" />
      <div className="absolute inset-0 bg-[url('/cosmic-nebula-stars.png')] bg-cover bg-center opacity-30" />

      {/* Animated stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
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
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-full p-3">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Hola, <span className="text-cyan-400">{userName}</span>!
              </h1>
              <p className="text-gray-400">Listo para aprender matematicas?</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-purple-900/50 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-yellow-500/50 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-lg">{stars}</span>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              className="bg-red-900/30 border-red-500/50 text-red-400 hover:bg-red-900/50 hover:text-red-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Niños Card */}
          <div
            onClick={() => setCurrentSection("kids")}
            className="group cursor-pointer bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur-md rounded-3xl border-2 border-pink-500/50 shadow-2xl shadow-pink-500/20 p-8 hover:scale-105 transition-all duration-300 hover:shadow-pink-500/40"
          >
            <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-3xl p-6 mb-6 shadow-lg shadow-pink-500/50 flex items-center justify-center">
              <div className="text-6xl">😊</div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">Niños</h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Juegos de matematicas divertidos para todas las edades. Aprende sumando, restando y m-mas!
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-pink-600/50 text-pink-200 px-4 py-2 rounded-full text-sm font-medium">3-5 años</span>
              <span className="bg-purple-600/50 text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
                6-8 años
              </span>
              <span className="bg-blue-600/50 text-blue-200 px-4 py-2 rounded-full text-sm font-medium">9-11 años</span>
            </div>

            <Button className="w-full h-12 text-lg font-bold rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white shadow-lg shadow-pink-500/50">
              Jugar Ahora
            </Button>
          </div>

          {/* General Card */}
          <div
            onClick={() => setCurrentSection("general")}
            className="group cursor-pointer bg-gradient-to-br from-cyan-900/40 to-teal-900/40 backdrop-blur-md rounded-3xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 p-8 hover:scale-105 transition-all duration-300 hover:shadow-cyan-500/40"
          >
            <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl p-6 mb-6 shadow-lg shadow-cyan-500/50 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white" />
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">General</h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Quizzes y acertijos matematicos para todas las edades. Pon a prueba tu logica!
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-blue-600/50 text-blue-200 px-4 py-2 rounded-full text-sm font-medium">Facil</span>
              <span className="bg-teal-600/50 text-teal-200 px-4 py-2 rounded-full text-sm font-medium">Medio</span>
              <span className="bg-purple-600/50 text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
                Dificil
              </span>
            </div>

            <Button className="w-full h-12 text-lg font-bold rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/50">
              Comenzar Quiz
            </Button>
          </div>

          {/* Reto Diario Card */}
          <div
            onClick={() => setCurrentSection("daily")}
            className="group cursor-pointer bg-gradient-to-br from-orange-900/40 to-pink-900/40 backdrop-blur-md rounded-3xl border-2 border-orange-500/50 shadow-2xl shadow-orange-500/20 p-8 hover:scale-105 transition-all duration-300 hover:shadow-orange-500/40"
          >
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl p-6 mb-6 shadow-lg shadow-orange-500/50 flex items-center justify-center">
              <Zap className="w-16 h-16 text-white" />
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">Reto Diario</h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Un nuevo desafio matematico cada dia. Resuelve y gana estrellas especiales!
            </p>

            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-2xl p-4 mb-6 flex items-center gap-3">
              <div className="text-2xl">🏆</div>
              <span className="text-yellow-400 font-medium">Nuevo reto disponible!</span>
            </div>

            <Button className="w-full h-12 text-lg font-bold rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white shadow-lg shadow-orange-500/50">
              Aceptar Reto
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
