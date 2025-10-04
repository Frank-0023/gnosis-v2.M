"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

interface LogicReasoningQuizProps {
  difficulty: "easy" | "medium" | "hard"
  onBack: () => void
}

interface Question {
  question: string
  options: string[]
  correct: string
  explanation: string
}

const questionsData: Record<string, Question[]> = {
  easy: [
    {
      question: "¿Cuántos meses tienen 28 días?",
      options: ["1", "2", "Todos"],
      correct: "Todos",
      explanation: "Todos los meses tienen al menos 28 días",
    },
    {
      question: "Si hay 3 manzanas y tomas 2, ¿cuántas tienes?",
      options: ["1", "2", "3"],
      correct: "2",
      explanation: "Tienes las 2 que tomaste",
    },
    {
      question: "¿Qué pesa más: un kilo de plumas o un kilo de hierro?",
      options: ["Plumas", "Hierro", "Pesan igual"],
      correct: "Pesan igual",
      explanation: "Ambos pesan un kilo, por lo tanto pesan lo mismo",
    },
    {
      question: "Si un tren eléctrico va hacia el norte, ¿hacia dónde va el humo?",
      options: ["Norte", "Sur", "No hay humo"],
      correct: "No hay humo",
      explanation: "Los trenes eléctricos no producen humo",
    },
    {
      question: "¿Cuántos animales de cada especie llevó Moisés en el arca?",
      options: ["2", "1", "Ninguno"],
      correct: "Ninguno",
      explanation: "Fue Noé quien llevó los animales en el arca, no Moisés",
    },
  ],
  medium: [
    {
      question:
        "Un padre y un hijo tienen un accidente. El padre muere y el hijo es llevado al hospital. El cirujano dice: 'No puedo operarlo, es mi hijo'. ¿Cómo es posible?",
      options: ["Es adoptado", "El cirujano es su madre", "Tiene dos padres"],
      correct: "El cirujano es su madre",
      explanation: "El cirujano es la madre del niño",
    },
    {
      question: "¿Qué viene una vez en un minuto, dos veces en un momento y nunca en cien años?",
      options: ["La letra M", "El tiempo", "La letra O"],
      correct: "La letra M",
      explanation: "La letra M aparece una vez en 'minuto', dos veces en 'momento' y ninguna en 'cien años'",
    },
    {
      question: "Tengo ciudades pero no casas, bosques pero no árboles, agua pero no peces. ¿Qué soy?",
      options: ["Un país", "Un mapa", "Un libro"],
      correct: "Un mapa",
      explanation: "Un mapa tiene representaciones de ciudades, bosques y agua, pero no los elementos reales",
    },
    {
      question:
        "Si 5 gatos cazan 5 ratones en 5 minutos, ¿cuántos gatos se necesitan para cazar 100 ratones en 100 minutos?",
      options: ["5", "20", "100"],
      correct: "5",
      explanation: "Si 5 gatos cazan 5 ratones en 5 minutos, en 100 minutos cazarán 100 ratones",
    },
    {
      question: "¿Qué se rompe cuando lo nombras?",
      options: ["Un secreto", "El silencio", "Una promesa"],
      correct: "El silencio",
      explanation: "El silencio se rompe cuando hablas o haces ruido",
    },
  ],
  hard: [
    {
      question:
        "Tres interruptores controlan tres bombillas en otra habitación. Puedes encender los interruptores las veces que quieras, pero solo puedes entrar una vez a la habitación. ¿Cómo sabes qué interruptor controla cada bombilla?",
      options: ["Es imposible", "Enciendo uno, espero, apago y enciendo otro", "Enciendo todos y veo"],
      correct: "Enciendo uno, espero, apago y enciendo otro",
      explanation:
        "Enciendes el primero y esperas, lo apagas y enciendes el segundo. La bombilla caliente apagada es del primero, la encendida del segundo, y la fría apagada del tercero",
    },
    {
      question: "Un hombre empuja su auto hasta un hotel y pierde su fortuna. ¿Qué pasó?",
      options: ["Tuvo un accidente", "Está jugando Monopoly", "Le robaron"],
      correct: "Está jugando Monopoly",
      explanation: "Es una situación del juego de mesa Monopoly",
    },
    {
      question:
        "Tienes dos cuerdas que tardan exactamente 60 minutos en quemarse completamente, pero no se queman uniformemente. ¿Cómo mides 45 minutos?",
      options: ["Es imposible", "Quemo una por ambos extremos y otra por un extremo", "Corto las cuerdas"],
      correct: "Quemo una por ambos extremos y otra por un extremo",
      explanation:
        "Quemas la primera por ambos extremos (30 min) y la segunda por un extremo. Cuando se acabe la primera, quemas el otro extremo de la segunda (15 min más) = 45 min",
    },
    {
      question:
        "En una isla hay dos tipos de personas: las que siempre dicen la verdad y las que siempre mienten. Encuentras a dos personas. ¿Qué pregunta haces para saber el camino correcto?",
      options: ["¿Cuál es el camino?", "¿Qué diría la otra persona?", "¿Eres mentiroso?"],
      correct: "¿Qué diría la otra persona?",
      explanation:
        "Si preguntas qué diría la otra persona sobre el camino correcto, ambos te señalarán el camino incorrecto, así que tomas el opuesto",
    },
    {
      question:
        "Tienes 12 bolas idénticas, pero una pesa diferente. Con una balanza de dos platos y solo 3 pesadas, ¿cómo encuentras la bola diferente?",
      options: ["Es imposible", "Divido en grupos de 4", "Peso de dos en dos"],
      correct: "Divido en grupos de 4",
      explanation:
        "Divides en 3 grupos de 4. Pesas dos grupos: si equilibran, la diferente está en el tercero. Luego pesas 3 de ese grupo contra 3 normales, y finalmente 2 sospechosas",
    },
  ],
}

export default function LogicReasoningQuiz({ difficulty, onBack }: LogicReasoningQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  const questions = questionsData[difficulty]
  const question = questions[currentQuestion]

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    setShowExplanation(true)

    if (answer === question.correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowExplanation(false)
      } else {
        setGameComplete(true)
      }
    }, 4000)
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-orange-900/40" />
        <div className="relative z-10 text-center">
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-5xl font-bold text-white mb-4">Quiz Completado!</h2>
          <p className="text-2xl text-cyan-300 mb-4">
            Acertaste: <span className="text-pink-400 font-bold">{score}</span> de {questions.length}
          </p>
          <p className="text-xl text-gray-300 mb-8">Puntuación: {Math.round((score / questions.length) * 100)}%</p>
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
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-orange-900/40" />
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
              Pregunta {currentQuestion + 1}/{questions.length}
            </span>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full border-2 border-white/30 shadow-lg">
            <span className="text-white font-bold text-xl">⭐ {score}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Razonamiento Lógico - {difficulty}</h2>

          <div className="bg-purple-900/40 rounded-2xl p-8 mb-8">
            <p className="text-xl text-white text-center leading-relaxed">{question.question}</p>
          </div>

          {showExplanation && (
            <div
              className={`mb-6 p-4 border-2 rounded-xl text-center ${
                selectedAnswer === question.correct
                  ? "bg-green-500/20 border-green-500"
                  : "bg-yellow-500/20 border-yellow-500"
              }`}
            >
              <p
                className={`text-xl font-bold mb-2 ${
                  selectedAnswer === question.correct ? "text-green-300" : "text-yellow-300"
                }`}
              >
                {selectedAnswer === question.correct ? "¡Correcto!" : `La respuesta correcta es: ${question.correct}`}
              </p>
              <p className="text-white">{question.explanation}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {question.options.map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`h-20 text-lg font-bold rounded-2xl transition-all duration-300 ${
                  selectedAnswer === option
                    ? option === question.correct
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 scale-105"
                      : "bg-gradient-to-r from-red-500 to-rose-500 scale-95"
                    : showExplanation && option === question.correct
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 ring-4 ring-green-300"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105"
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
