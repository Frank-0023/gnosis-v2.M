"use client"

import { useState, useEffect } from "react"
import { Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [userName, setUserName] = useState("")
  const [inputName, setInputName] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const storedName = localStorage.getItem("gnosisUserName")
    if (storedName) {
      setUserName(storedName)
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = () => {
    if (inputName.trim()) {
      localStorage.setItem("gnosisUserName", inputName.trim())
      setUserName(inputName.trim())
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("gnosisUserName")
    setUserName("")
    setIsLoggedIn(false)
    setInputName("")
  }

  if (isLoggedIn) {
    return <Dashboard userName={userName} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Space background with animated particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-cyan-900/30" />
      <div className="absolute inset-0 bg-[url('/cosmic-nebula-stars.png')] bg-cover bg-center opacity-40" />

      {/* Animated stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
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

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 p-8">
          {/* Rocket icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-full p-6 shadow-lg shadow-purple-500/50">
              <Rocket className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-center mb-2">
            <span className="text-cyan-400">Gnosis</span> <span className="text-purple-400">v2</span>
          </h1>

          <p className="text-gray-300 text-center mb-8 text-lg">Aventura Matematica Espacial!!</p>

          {/* Input form */}
          <div className="space-y-6">
            <div>
              <label className="text-white text-lg mb-3 block font-medium">Como te llamas, explorador?</label>
              <Input
                type="text"
                placeholder="Tu nombre"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="bg-black/50 border-2 border-purple-500/50 text-white placeholder:text-gray-500 h-14 text-lg rounded-2xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
              />
            </div>

            <Button
              onClick={handleLogin}
              disabled={!inputName.trim()}
              className="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white shadow-lg shadow-pink-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Comenzar Aventura!
            </Button>

            <p className="text-cyan-400 text-center text-sm">Unete a Foxi el Astronauta en un viaje matematico</p>
          </div>
        </div>
      </div>
    </div>
  )
}
