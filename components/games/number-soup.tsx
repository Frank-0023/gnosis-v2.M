"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import GameMusicPlayer from "@/components/game-music-player";

interface NumberSoupProps {
  onBack: () => void;
  operation: "addition" | "subtraction";
}

export default function NumberSoup({ onBack, operation }: NumberSoupProps) {
  const [grid, setGrid] = useState<number[][]>([]);
  const [targetNumber, setTargetNumber] = useState(0);
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [foundCombinations, setFoundCombinations] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const gridSize = 6;
  const targetCombinations = 8;
  const maxNumber = 9;

  useEffect(() => {
    generateGrid();
  }, []);

  const generateGrid = () => {
    const newGrid: number[][] = [];
    const target = operation === "addition" ? 12 : 5;
    setTargetNumber(target);

    for (let i = 0; i < gridSize; i++) {
      const row: number[] = [];
      for (let j = 0; j < gridSize; j++) {
        row.push(Math.floor(Math.random() * maxNumber) + 1);
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
    setFoundCombinations([]);
    setScore(0);
    setGameComplete(false);
  };

  const handleCellClick = (row: number, col: number) => {
    const cellIndex = selectedCells.findIndex(
      ([r, c]) => r === row && c === col
    );

    if (cellIndex !== -1) {
      setSelectedCells(selectedCells.filter((_, i) => i !== cellIndex));
    } else {
      if (selectedCells.length < 2) {
        setSelectedCells([...selectedCells, [row, col]]);
      }
    }
  };

  const checkCombination = () => {
    if (selectedCells.length !== 2) return;

    const values = selectedCells.map(([r, c]) => grid[r][c]);
    let result = 0;

    if (operation === "addition") {
      result = values[0] + values[1];
    } else {
      result = Math.abs(values[0] - values[1]);
    }

    const combinationKey = selectedCells
      .map(([r, c]) => `${r}-${c}`)
      .sort()
      .join(",");

    if (
      result === targetNumber &&
      !foundCombinations.includes(combinationKey)
    ) {
      setFoundCombinations([...foundCombinations, combinationKey]);
      setScore(score + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });

      if (foundCombinations.length + 1 >= targetCombinations) {
        setGameComplete(true);
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.5 },
        });
      }
    }

    setSelectedCells([]);
  };

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some(([r, c]) => r === row && c === col);
  };

  const isCellFound = (row: number, col: number) => {
    return foundCombinations.some((combo) => combo.includes(`${row}-${col}`));
  };

  const saveAndExit = () => {
    const currentStars = Number.parseInt(
      localStorage.getItem("gnosisStars") || "0"
    );
    localStorage.setItem("gnosisStars", (currentStars + score).toString());
    onBack();
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/40 to-blue-900/50" />
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
        <div className="relative z-10 text-center px-4">
          <div className="text-5xl sm:text-6xl md:text-8xl mb-4 sm:mb-6">
            🏆
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Sopa Completada!
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-cyan-300 mb-3 sm:mb-4">
            Encontraste todas las combinaciones!
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
            Ganaste {score} estrellas! ⭐
          </p>
          <Button
            onClick={saveAndExit}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white text-base sm:text-lg md:text-xl px-6 sm:px-8 py-4 sm:py-6 rounded-2xl"
          >
            Volver al Menu
          </Button>
        </div>
        <GameMusicPlayer
          theme="space"
          musicUrl="https://uppbeat.io/track/moire/space-ranger"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/40 to-blue-900/50" />

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

      {/* Planets */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 opacity-60 animate-pulse" />
      <div
        className="absolute bottom-16 sm:bottom-32 right-10 sm:right-20 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 opacity-50 animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Header */}
      <div className="relative z-10 p-3 sm:p-4 md:p-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <Button
            onClick={saveAndExit}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm text-sm sm:text-base"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Volver
          </Button>

          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <div className="bg-purple-900/50 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border-2 border-yellow-500/50 flex items-center gap-2 flex-1 sm:flex-none">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-400 font-bold text-base sm:text-lg">
                {score}
              </span>
            </div>
            <div className="bg-cyan-900/50 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border-2 border-cyan-500/50">
              <span className="text-cyan-400 font-bold text-base sm:text-lg">
                {foundCombinations.length} / {targetCombinations}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 mb-2 sm:mb-3 md:mb-4">
            Sopa de {operation === "addition" ? "Sumas" : "Restas"}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-1 sm:mb-2">
            Encuentra {targetCombinations} combinaciones que den{" "}
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-400">
              {targetNumber}
            </span>
          </p>
          <p className="text-sm sm:text-base text-gray-300">
            Selecciona 2 números y presiona "Verificar"
          </p>
        </div>

        {/* Grid and control panel */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 items-start justify-center">
          <div className="bg-gradient-to-br from-cyan-900/40 to-teal-900/40 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 p-4 sm:p-6 md:p-8 w-full lg:w-auto">
            <div
              className="grid gap-1.5 sm:gap-2"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              }}
            >
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    disabled={isCellFound(rowIndex, colIndex)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg font-bold text-xl sm:text-2xl transition-all duration-300 ${
                      isCellFound(rowIndex, colIndex)
                        ? "bg-green-500/30 text-green-300 border-2 border-green-500 cursor-not-allowed"
                        : isCellSelected(rowIndex, colIndex)
                        ? "bg-pink-500 text-white border-2 border-pink-300 scale-110 shadow-lg shadow-pink-500/50"
                        : "bg-gray-800/50 text-white border-2 border-gray-600 hover:bg-gray-700 hover:scale-105"
                    }`}
                  >
                    {cell}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 p-4 sm:p-6 md:p-8 w-full lg:min-w-[300px]">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              Números Seleccionados
            </h3>
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 min-h-[60px]">
              {selectedCells.map(([r, c], index) => (
                <div
                  key={index}
                  className="bg-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-xl sm:text-2xl border-2 border-pink-300"
                >
                  {grid[r][c]}
                </div>
              ))}
            </div>

            {selectedCells.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <p className="text-gray-300 text-base sm:text-lg">
                  {operation === "addition" ? "Suma" : "Resta"} actual:{" "}
                  <span className="text-cyan-400 font-bold text-xl sm:text-2xl">
                    {selectedCells.length === 2
                      ? operation === "addition"
                        ? grid[selectedCells[0][0]][selectedCells[0][1]] +
                          grid[selectedCells[1][0]][selectedCells[1][1]]
                        : Math.abs(
                            grid[selectedCells[0][0]][selectedCells[0][1]] -
                              grid[selectedCells[1][0]][selectedCells[1][1]]
                          )
                      : "?"}
                  </span>
                </p>
              </div>
            )}

            <div className="space-y-2 sm:space-y-3">
              <Button
                onClick={checkCombination}
                disabled={selectedCells.length !== 2}
                className="w-full h-10 sm:h-12 text-base sm:text-lg font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white shadow-lg disabled:opacity-50"
              >
                Verificar
              </Button>
              <Button
                onClick={() => setSelectedCells([])}
                variant="outline"
                className="w-full h-10 sm:h-12 text-base sm:text-lg font-bold rounded-xl bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Limpiar
              </Button>
            </div>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20">
              <p className="text-gray-300 text-xs sm:text-sm">
                Combinaciones encontradas: {foundCombinations.length} /{" "}
                {targetCombinations}
              </p>
            </div>
          </div>
        </div>
      </div>
      <GameMusicPlayer
        theme="space"
        musicUrl="/song/Space Loop - Another Kid [Audio Library Release] · Free Copyright-safe Music.mp3"
      />
    </div>
  );
}
