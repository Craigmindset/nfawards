"use client"

import { useState, useEffect, useRef } from "react"
import { X, Minimize2, Play, Dumbbell } from "lucide-react"

interface AudioNotificationProps {
  audioUrl: string
  delay?: number // in milliseconds
}

export default function AudioNotification({ audioUrl, delay = 10000 }: AudioNotificationProps) {
  const [showPopup, setShowPopup] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(audioUrl)
    audioRef.current.loop = true

    // Show popup after delay
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, delay)

    return () => {
      clearTimeout(timer)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [audioUrl, delay])

  useEffect(() => {
    if (showPopup && !isMinimized) {
      document.body.classList.add("overflow-hidden")
      // Add blur backdrop with lower z-index than the popup
      const backdropDiv = document.createElement("div")
      backdropDiv.id = "audio-notification-backdrop"
      backdropDiv.className = "fixed inset-0 z-40 backdrop-blur-sm bg-black/30"
      document.body.appendChild(backdropDiv)
    } else {
      document.body.classList.remove("overflow-hidden")
      // Remove blur backdrop
      const backdropDiv = document.getElementById("audio-notification-backdrop")
      if (backdropDiv) {
        backdropDiv.remove()
      }
    }

    return () => {
      document.body.classList.remove("overflow-hidden")
      // Clean up backdrop on unmount
      const backdropDiv = document.getElementById("audio-notification-backdrop")
      if (backdropDiv) {
        backdropDiv.remove()
      }
    }
  }, [showPopup, isMinimized])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error)
      })
    }

    setIsPlaying(!isPlaying)
  }

  const handleMinimize = () => {
    setIsMinimized(true)
  }

  const handleMaximize = () => {
    setIsMinimized(false)
  }

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setIsPlaying(false)
    setShowPopup(false)
  }

  if (!showPopup) return null

  if (isMinimized) {
    return (
      <div
        className="fixed left-4 bottom-20 z-50 bg-[#D4AF37] text-black p-3 rounded-full shadow-lg cursor-pointer hover:bg-[#C4A030] transition-all"
        onClick={handleMaximize}
        title="Expand fitness notification"
      >
        <Dumbbell className={`w-6 h-6 ${isPlaying ? "animate-pulse" : ""}`} />
      </div>
    )
  }

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden mx-4">
        <div className="bg-[#D4AF37] px-4 py-3 flex justify-between items-center">
          <h3 className="font-bold text-black">Get Fitness, while you Surf</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMinimize}
              className="text-black hover:text-gray-700 transition"
              aria-label="Minimize notification"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleClose}
              className="text-black hover:text-gray-700 transition"
              aria-label="Close notification"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-4 flex items-center gap-4">
          <div className={`bg-gray-200 rounded-full p-3 ${isPlaying ? "animate-pulse bg-green-200" : ""}`}>
            <Dumbbell className="w-8 h-8 text-gray-700" />
          </div>
          <div className="flex-1">
            <p className="text-gray-700 text-sm mb-2">Play motivational workout music while you browse!</p>
            <button
              onClick={togglePlay}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
                isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"
              } transition`}
            >
              {isPlaying ? (
                <>
                  <span className="w-4 h-4 relative">
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="block w-1 h-3 bg-white mx-0.5"></span>
                      <span className="block w-1 h-3 bg-white mx-0.5"></span>
                    </span>
                  </span>
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Play Music
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
