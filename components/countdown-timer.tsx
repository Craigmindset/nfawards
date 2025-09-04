"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  targetDate: string
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex items-center gap-2 sm:gap-4 scale-90 sm:scale-100 origin-left">
      <div className="text-center">
        <div className="text-xl sm:text-2xl font-bold">{String(timeLeft.days).padStart(2, "0")}</div>
        <div className="text-[10px] sm:text-xs">Days</div>
      </div>
      <div className="text-center">
        <div className="text-xl sm:text-2xl font-bold">{String(timeLeft.hours).padStart(2, "0")}</div>
        <div className="text-[10px] sm:text-xs">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-xl sm:text-2xl font-bold">{String(timeLeft.minutes).padStart(2, "0")}</div>
        <div className="text-[10px] sm:text-xs">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-xl sm:text-2xl font-bold">{String(timeLeft.seconds).padStart(2, "0")}</div>
        <div className="text-[10px] sm:text-xs">Seconds</div>
      </div>
    </div>
  )
}
