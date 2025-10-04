"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AnimalAddition from "./games/animal-addition";
import DinosaurSubtraction from "./games/dinosaur-subtraction";
import ShapesGame from "./games/shapes-game";
import CountingGame from "./games/counting-game";
import JungleAdventure from "./games/jungle-adventure";
import NumberSoup from "./games/number-soup";
import MathHangman from "./games/math-hangman";
import AdvancedMathHangman from "./games/advanced-math-hangman";
import JungleAdventureMultiplication from "./games/jungle-adventure-multiplication";
import JungleAdventureDivision from "./games/jungle-adventure-division";
import MultiplicationTable from "./games/multiplication-table";
import AsteroidDestroyer from "./games/asteroid-destroyer";

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  borderColor: string;
  shadowColor: string;
}

interface GameSelectionProps {
  ageGroup: "3-5" | "6-8" | "9-11";
  onBack: () => void;
  onSelectGame: (gameId: string) => void;
}

const gamesData: Record<string, Game[]> = {
  "3-5": [
    {
      id: "counting",
      title: "Contar Objetos",
      description: "Aprende a contar con animales y frutas",
      icon: "🦁",
      color: "from-pink-500 to-rose-500",
      borderColor: "border-pink-500/50",
      shadowColor: "shadow-pink-500/20",
    },
    {
      id: "shapes",
      title: "Formas Geométricas",
      description: "Identifica formas y colores básicos",
      icon: "🔷",
      color: "from-purple-500 to-violet-500",
      borderColor: "border-purple-500/50",
      shadowColor: "shadow-purple-500/20",
    },
    {
      id: "simple-addition",
      title: "Sumas con Animales",
      description: "Suma con animales y frutas divertidas",
      icon: "🐻",
      color: "from-cyan-500 to-blue-500",
      borderColor: "border-cyan-500/50",
      shadowColor: "shadow-cyan-500/20",
    },
    {
      id: "dinosaur-subtraction",
      title: "Restas con Dinosaurios",
      description: "Resta con dinosaurios divertidos",
      icon: "🦕",
      color: "from-green-500 to-teal-500",
      borderColor: "border-green-500/50",
      shadowColor: "shadow-green-500/20",
    },
  ],
  "6-8": [
    {
      id: "jungle-adventure",
      title: "Aventura en la Selva",
      description: "Resuelve problemas matemáticos en la selva",
      icon: "🌴",
      color: "from-teal-500 to-green-500",
      borderColor: "border-teal-500/50",
      shadowColor: "shadow-teal-500/20",
    },
    {
      id: "asteroid-destroyer",
      title: "Destruye el Asteroide",
      description: "Destruye asteroides resolviendo sumas y restas",
      icon: "🚀",
      color: "from-orange-500 to-red-500",
      borderColor: "border-orange-500/50",
      shadowColor: "shadow-orange-500/20",
    },
    {
      id: "math-hangman",
      title: "Ahorcado Matemático",
      description: "Adivina el resultado resolviendo sumas y restas",
      icon: "🎯",
      color: "from-cyan-500 to-blue-500",
      borderColor: "border-cyan-500/50",
      shadowColor: "shadow-cyan-500/20",
    },
    {
      id: "number-soup-addition",
      title: "Sopa de Sumas",
      description: "Encuentra combinaciones que sumen el número objetivo",
      icon: "➕",
      color: "from-purple-500 to-violet-500",
      borderColor: "border-purple-500/50",
      shadowColor: "shadow-purple-500/20",
    },
    {
      id: "number-soup-subtraction",
      title: "Sopa de Restas",
      description: "Encuentra combinaciones que resten al número objetivo",
      icon: "➖",
      color: "from-pink-500 to-rose-500",
      borderColor: "border-pink-500/50",
      shadowColor: "shadow-pink-500/20",
    },
    {
      id: "table-1",
      title: "Tabla del 1",
      description: "Aprende la tabla de multiplicar del 1",
      icon: "1️⃣",
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-500/50",
      shadowColor: "shadow-blue-500/20",
    },
    {
      id: "table-2",
      title: "Tabla del 2",
      description: "Aprende la tabla de multiplicar del 2",
      icon: "2️⃣",
      color: "from-green-500 to-teal-500",
      borderColor: "border-green-500/50",
      shadowColor: "shadow-green-500/20",
    },
    {
      id: "table-3",
      title: "Tabla del 3",
      description: "Aprende la tabla de multiplicar del 3",
      icon: "3️⃣",
      color: "from-purple-500 to-violet-500",
      borderColor: "border-purple-500/50",
      shadowColor: "shadow-purple-500/20",
    },
    {
      id: "table-4",
      title: "Tabla del 4",
      description: "Aprende la tabla de multiplicar del 4",
      icon: "4️⃣",
      color: "from-orange-500 to-amber-500",
      borderColor: "border-orange-500/50",
      shadowColor: "shadow-orange-500/20",
    },
    {
      id: "table-5",
      title: "Tabla del 5",
      description: "Aprende la tabla de multiplicar del 5",
      icon: "5️⃣",
      color: "from-pink-500 to-rose-500",
      borderColor: "border-pink-500/50",
      shadowColor: "shadow-pink-500/20",
    },
  ],
  "9-11": [
    {
      id: "jungle-multiplication",
      title: "Multiplicación en el Espacio",
      description: "Resuelve problemas de multiplicación",
      icon: "✖️",
      color: "from-cyan-500 to-blue-500",
      borderColor: "border-cyan-500/50",
      shadowColor: "shadow-cyan-500/20",
    },
    {
      id: "jungle-division",
      title: "División en el Espacio",
      description: "Resuelve problemas de división",
      icon: "➗",
      color: "from-purple-500 to-violet-500",
      borderColor: "border-purple-500/50",
      shadowColor: "shadow-purple-500/20",
    },
    {
      id: "advanced-math-hangman",
      title: "Ahorcado Matemático Avanzado",
      description: "Resuelve multiplicaciones y divisiones",
      icon: "🎯",
      color: "from-teal-500 to-green-500",
      borderColor: "border-teal-500/50",
      shadowColor: "shadow-teal-500/20",
    },
    {
      id: "table-6",
      title: "Tabla del 6",
      description: "Aprende la tabla de multiplicar del 6",
      icon: "6️⃣",
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-500/50",
      shadowColor: "shadow-blue-500/20",
    },
    {
      id: "table-7",
      title: "Tabla del 7",
      description: "Aprende la tabla de multiplicar del 7",
      icon: "7️⃣",
      color: "from-green-500 to-teal-500",
      borderColor: "border-green-500/50",
      shadowColor: "shadow-green-500/20",
    },
    {
      id: "table-8",
      title: "Tabla del 8",
      description: "Aprende la tabla de multiplicar del 8",
      icon: "8️⃣",
      color: "from-purple-500 to-violet-500",
      borderColor: "border-purple-500/50",
      shadowColor: "shadow-purple-500/20",
    },
    {
      id: "table-9",
      title: "Tabla del 9",
      description: "Aprende la tabla de multiplicar del 9",
      icon: "9️⃣",
      color: "from-orange-500 to-amber-500",
      borderColor: "border-orange-500/50",
      shadowColor: "shadow-orange-500/20",
    },
    {
      id: "table-10",
      title: "Tabla del 10",
      description: "Aprende la tabla de multiplicar del 10",
      icon: "🔟",
      color: "from-pink-500 to-rose-500",
      borderColor: "border-pink-500/50",
      shadowColor: "shadow-pink-500/20",
    },
  ],
};

export default function GameSelection({
  ageGroup,
  onBack,
  onSelectGame,
}: GameSelectionProps) {
  const games = gamesData[ageGroup];
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const handleBackFromGame = () => {
    setSelectedGame(null);
  };

  // Render specific game component
  if (selectedGame === "counting") {
    return <CountingGame onBack={handleBackFromGame} />;
  }
  if (selectedGame === "shapes") {
    return <ShapesGame onBack={handleBackFromGame} />;
  }
  if (selectedGame === "simple-addition") {
    return <AnimalAddition onBack={handleBackFromGame} />;
  }
  if (selectedGame === "jungle-adventure") {
    return <JungleAdventure onBack={handleBackFromGame} />;
  }
  if (selectedGame === "asteroid-destroyer") {
    return <AsteroidDestroyer onBack={handleBackFromGame} />;
  }
  if (selectedGame === "math-hangman") {
    return <MathHangman onBack={handleBackFromGame} />;
  }
  if (selectedGame === "number-soup-addition") {
    return <NumberSoup onBack={handleBackFromGame} operation="addition" />;
  }
  if (selectedGame === "number-soup-subtraction") {
    return <NumberSoup onBack={handleBackFromGame} operation="subtraction" />;
  }
  if (selectedGame === "jungle-multiplication") {
    return <JungleAdventureMultiplication onBack={handleBackFromGame} />;
  }
  if (selectedGame === "jungle-division") {
    return <JungleAdventureDivision onBack={handleBackFromGame} />;
  }
  if (selectedGame === "dinosaur-subtraction") {
    return <DinosaurSubtraction onBack={handleBackFromGame} />;
  }
  if (selectedGame === "table-1") {
    return <MultiplicationTable onBack={handleBackFromGame} tableNumber={1} />;
  }
  if (selectedGame === "table-2") {
    return <MultiplicationTable onBack={handleBackFromGame} tableNumber={2} />;
  }
  if (selectedGame === "table-3") {
    return <MultiplicationTable onBack={handleBackFromGame} tableNumber={3} />;
  }
  if (selectedGame === "table-4") {
    return <MultiplicationTable onBack={handleBackFromGame} tableNumber={4} />;
  }
  if (selectedGame === "table-5") {
    return <MultiplicationTable onBack={handleBackFromGame} tableNumber={5} />;
  }
  if (selectedGame === "table-6") {
    return <MultiplicationTable onBack={handleBackFromGame} tableNumber={6} />;
  }
  if (selectedGame === "table-7") {
    return <MultiplicationTable onBack={handleBackFromGame} tableNumber={7} />;
  }
  if (selectedGame === "table-8") {
    return <MultiplicationTable onBack={handleBackFromGame} tableNumber={8} />;
  }
  if (selectedGame === "table-9") {
    return <MultiplicationTable onBack={handleBackFromGame} tableNumber={9} />;
  }
  if (selectedGame === "table-10") {
    return <MultiplicationTable onBack={handleBackFromGame} tableNumber={10} />;
  }
  if (selectedGame === "advanced-math-hangman") {
    return <AdvancedMathHangman onBack={handleBackFromGame} />;
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
          Volver
        </Button>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">
          <span className="text-pink-400">Juegos para {ageGroup} años</span>
        </h1>
        <p className="text-gray-300 text-center text-xl mb-12">
          Selecciona un juego para comenzar
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className={`bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-md rounded-3xl border-2 ${game.borderColor} shadow-2xl ${game.shadowColor} p-6 hover:scale-105 transition-all duration-300 cursor-pointer`}
              onClick={() => handleGameSelect(game.id)}
            >
              <div
                className={`bg-gradient-to-br ${game.color} rounded-2xl p-6 mb-4 shadow-lg flex items-center justify-center`}
              >
                <div className="text-5xl">{game.icon}</div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 text-balance">
                {game.title}
              </h3>

              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {game.description}
              </p>

              <Button
                className={`w-full h-10 text-sm font-bold rounded-xl bg-gradient-to-r ${game.color} hover:opacity-90 text-white shadow-lg`}
              >
                Jugar
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
