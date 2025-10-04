"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Star, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

interface AdvancedNumberSoupProps {
  difficulty: "easy" | "medium" | "hard"
  onBack: () => void
}

export default function AdvancedNumberSoup({ difficulty, onBack }: AdvancedNumberSoupProps) {
  const [grid, setGrid] = useState<number[][]>([])
  const [targetNumber, setTargetNumber] = useState(0)
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([])
  const [foundCombinations, setFoundCombinations] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  const gridSize = difficulty === "easy" ? 6 : difficulty === "medium" ? 8 : 10
  const targetCombinations = difficulty === "easy" ? 8 : difficulty === "medium" ? 10 : 12
  const maxNumber = difficulty === "easy" ? 15 : difficulty === "medium" ? 25 : 50

  useEffect(() => {
    generateGrid()
  }, [])

  const generateGrid = () => {
    const newGrid: number[][] = []
    const target = difficulty === "easy" ? 20 : difficulty === "medium" ? 50 : 100
    setTargetNumber(target)

    for (let i = 0; i < gridSize; i++) {
      const row: number[] = []
      for (let j = 0; j < gridSize; j++) {
        row.push(Math.floor(Math.random() * maxNumber) + 1)
      }
      newGrid.push(row)
    }
    setGrid(newGrid)
  }

  const handleCellClick = (row: number, col: number) => {
    const cellIndex = selectedCells.findIndex(([r, c]) => r === row && c === col)

    if (cellIndex !== -1) {
      setSelectedCells(selectedCells.filter((_, i) => i !== cellIndex))
    } else {
      if (selectedCells.length < 4) {
        setSelectedCells([...selectedCells, [row, col]])
      }
    }
  }

  const checkCombination = () => {
    if (selectedCells.length < 2) return

    const values = selectedCells.map(([r, c]) => grid[r][c])
    const sum = values.reduce((a, b) => a + b, 0)

    const combinationKey = selectedCells
      .map(([r, c]) => `${r}-${c}`)
      .sort()
      .join(",")

    if (sum === targetNumber && !foundCombinations.includes(combinationKey)) {
      setFoundCombinations([...foundCombinations, combinationKey])
      setScore(score + 10)
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      })

      if (foundCombinations.length + 1 >= targetCombinations) {
        setGameComplete(true)
      }
    }

    setSelectedCells([])
  }

  const saveAndExit = () => {
    const currentStars = Number.parseInt(localStorage.getItem("gnosisStars") || "0")
    localStorage.setItem("gnosisStars", (currentStars + Math.floor(score / 10)).toString())
    onBack()
  }

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some(([r, c]) => r === row && c === col)
  }

  const isCellFound = (row: number, col: number) => {
    return foundCombinations.some((combo) => combo.includes(`${row}-${col}`))
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-cyan-900/30" />
        <div className="absolute inset-0 bg-[url('/cosmic-nebula-stars.png')] bg-cover bg-center opacity-30" />

        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <div className="bg-gradient-to-br from-cyan-900/40 to-teal-900/40 backdrop-blur-md rounded-3xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 p-12 text-center">
            <div className="text-8xl mb-6">
              <Trophy className="w-24 h-24 mx-auto text-yellow-400" />
            </div>
            <h2 className="text-5xl font-bold text-white mb-4">¡Sopa Completada!</h2>
            <p className="text-3xl text-cyan-400 mb-8">Puntuación: {score}</p>
            <p className="text-xl text-gray-300 mb-8">¡Ganaste {Math.floor(score / 10)} estrellas! ⭐</p>
            <Button
              onClick={saveAndExit}
              className="w-full h-14 text-xl font-bold rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white shadow-lg shadow-cyan-500/50"
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
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-teal-900/20 to-blue-900/30" />
      <div className="absolute inset-0 bg-[url('/cosmic-nebula-stars.png')] bg-cover bg-center opacity-30" />

      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            onClick={saveAndExit}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <div className="flex items-center gap-4">
            <div className="bg-purple-900/50 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-yellow-500/50 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-400 font-bold text-lg">{score}</span>
            </div>
            <div className="bg-cyan-900/50 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-cyan-500/50">
              <span className="text-cyan-400 font-bold text-lg">
                {foundCombinations.length} / {targetCombinations}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">Sopa de Números Avanzada</h1>
          <p className="text-2xl text-white mb-2">
            Encuentra {targetCombinations} combinaciones que sumen{" "}
            <span className="text-5xl font-bold text-pink-400">{targetNumber}</span>
          </p>
          <p className="text-gray-300">Selecciona 2-4 números y presiona "Verificar"</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="bg-gradient-to-br from-cyan-900/40 to-teal-900/40 backdrop-blur-md rounded-3xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 p-8">
            <div
              className="grid gap-2"
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
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-lg font-bold text-lg transition-all duration-300 ${
                      isCellFound(rowIndex, colIndex)
                        ? "bg-green-500/30 text-green-300 border-2 border-green-500 cursor-not-allowed"
                        : isCellSelected(rowIndex, colIndex)
                          ? "bg-pink-500 text-white border-2 border-pink-300 scale-110 shadow-lg shadow-pink-500/50"
                          : "bg-gray-800/50 text-white border-2 border-gray-600 hover:bg-gray-700 hover:scale-105"
                    }`}
                  >
                    {cell}
                  </button>
                )),
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 p-8 min-w-[300px]">
            <h3 className="text-2xl font-bold text-white mb-4">Números Seleccionados</h3>
            <div className="flex flex-wrap gap-2 mb-6 min-h-[60px]">
              {selectedCells.map(([r, c], index) => (
                <div
                  key={index}
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg font-bold text-xl border-2 border-pink-300"
                >
                  {grid[r][c]}
                </div>
              ))}
            </div>

            {selectedCells.length > 0 && (
              <div className="mb-6">
                <p className="text-gray-300 text-lg">
                  Suma actual:{" "}
                  <span className="text-cyan-400 font-bold text-2xl">
                    {selectedCells.reduce((sum, [r, c]) => sum + grid[r][c], 0)}
                  </span>
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={checkCombination}
                disabled={selectedCells.length < 2}
                className="w-full h-12 text-lg font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white shadow-lg disabled:opacity-50"
              >
                Verificar
              </Button>
              <Button
                onClick={() => setSelectedCells([])}
                variant="outline"
                className="w-full h-12 text-lg font-bold rounded-xl bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Limpiar
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-gray-300 text-sm">
                Combinaciones encontradas: {foundCombinations.length} / {targetCombinations}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
