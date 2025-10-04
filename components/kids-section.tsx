"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import MathGame from "@/components/math-game";
import GameSelection from "@/components/game-selection";

interface KidsSectionProps {
  onBack: () => void;
}

type AgeGroup = "3-5" | "6-8" | "9-11" | null;

export default function KidsSection({ onBack }: KidsSectionProps) {
  const [selectedAge, setSelectedAge] = useState<AgeGroup>(null);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  if (selectedAge && selectedGame) {
    return (
      <MathGame ageGroup={selectedAge} onBack={() => setSelectedGame(null)} />
    );
  }

  if (selectedAge) {
    return (
      <GameSelection
        ageGroup={selectedAge}
        onBack={() => setSelectedAge(null)}
        onSelectGame={setSelectedGame}
      />
    );
  }

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
          Volver al Inicio
        </Button>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">
          <span className="text-pink-400">Sección de Niños</span>
        </h1>
        <p className="text-gray-300 text-center text-xl mb-12">
          Selecciona tu edad para comenzar
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 3-5 años */}
          <div className="bg-gradient-to-br from-pink-900/40 to-rose-900/40 backdrop-blur-md rounded-3xl border-2 border-pink-500/50 shadow-2xl shadow-pink-500/20 p-8 hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 mb-6 shadow-lg shadow-pink-500/50 flex items-center justify-center">
              <div className="text-6xl">😊</div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">3-5 años</h2>

            <p className="text-gray-300 mb-8 leading-relaxed">
              Colores, formas y sumas sencillas con imágenes
            </p>

            <Button
              onClick={() => setSelectedAge("3-5")}
              className="w-full h-12 text-lg font-bold rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white shadow-lg shadow-pink-500/50"
            >
              Seleccionar
            </Button>
          </div>

          {/* 6-8 años */}
          <div className="bg-gradient-to-br from-purple-900/40 to-violet-900/40 backdrop-blur-md rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 p-8 hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-purple-500 to-violet-500 rounded-3xl p-6 mb-6 shadow-lg shadow-purple-500/50 flex items-center justify-center">
              <div className="text-6xl">😄</div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">6-8 años</h2>

            <p className="text-gray-300 mb-8 leading-relaxed">
              Sumas, restas y conteo divertido
            </p>

            <Button
              onClick={() => setSelectedAge("6-8")}
              className="w-full h-12 text-lg font-bold rounded-2xl bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-400 hover:to-violet-400 text-white shadow-lg shadow-purple-500/50"
            >
              Seleccionar
            </Button>
          </div>

          {/* 9-11 años */}
          <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-md rounded-3xl border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20 p-8 hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 mb-6 shadow-lg shadow-blue-500/50 flex items-center justify-center">
              <div className="text-6xl">⭐</div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">9-11 años</h2>

            <p className="text-gray-300 mb-8 leading-relaxed">
              Multiplicación, división y problemas
            </p>

            <Button
              onClick={() => setSelectedAge("9-11")}
              className="w-full h-12 text-lg font-bold rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/50"
            >
              Seleccionar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
