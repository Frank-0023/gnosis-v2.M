"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameMusicPlayerProps {
  theme?: "space" | "jungle" | "dinosaur" | "default";
  musicUrl?: string;
}

export default function GameMusicPlayer({
  theme = "default",
  musicUrl,
}: GameMusicPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (musicUrl) {
      const audio = new Audio(musicUrl);
      audio.loop = true;
      audio.volume = 0.3;
      audioRef.current = audio;

      if (!isMuted) {
        audio.play().catch((error) => {
          console.log("[v0] Audio autoplay prevented:", error);
        });
      }

      return () => {
        audio.pause();
        audio.src = "";
      };
    }

    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const audioContext = new AudioContext();
    const gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = isMuted ? 0 : 0.1; // Very soft volume

    const playNote = (
      frequency: number,
      startTime: number,
      duration: number
    ) => {
      const oscillator = audioContext.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.connect(gainNode);
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const melodies: Record<string, number[]> = {
      space: [523.25, 587.33, 659.25, 783.99, 880.0], // C5, D5, E5, G5, A5
      jungle: [392.0, 440.0, 493.88, 523.25, 587.33], // G4, A4, B4, C5, D5
      dinosaur: [329.63, 369.99, 415.3, 466.16, 523.25], // E4, F#4, G#4, A#4, C5
      default: [440.0, 493.88, 523.25, 587.33, 659.25], // A4, B4, C5, D5, E5
    };

    const melody = melodies[theme] || melodies.default;
    let currentTime = audioContext.currentTime;

    const playMelody = () => {
      melody.forEach((freq, index) => {
        playNote(freq, currentTime + index * 0.8, 0.6);
      });
      currentTime += melody.length * 0.8 + 2; // Add pause between loops
    };

    const intervalId = setInterval(() => {
      if (!isMuted && audioContext.state === "running") {
        playMelody();
      }
    }, (melody.length * 0.8 + 2) * 1000);

    if (!isMuted) {
      playMelody();
    }

    return () => {
      clearInterval(intervalId);
      audioContext.close();
    };
  }, [isMuted, theme, musicUrl]);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.log("[v0] Audio play prevented:", error);
        });
      }
    }
  }, [isMuted]);

  return (
    <Button
      onClick={() => setIsMuted(!isMuted)}
      variant="outline"
      size="icon"
      className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full"
      title={isMuted ? "Activar música" : "Silenciar música"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </Button>
  );
}
