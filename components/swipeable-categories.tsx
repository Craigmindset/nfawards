"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Category {
  title: string
  description: string
}

interface SwipeableCategoriesProps {
  categories: Category[]
}

export default function SwipeableCategories({ categories }: SwipeableCategoriesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchEnd(null)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentIndex < categories.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }

    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const goToNext = () => {
    if (currentIndex < categories.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {categories.map((category, index) => (
            <div key={index} className="w-full flex-shrink-0 border p-4 sm:p-6 hover:shadow-lg transition">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#D4AF37]">{category.title}</h3>
              <p className="text-gray-700 text-sm sm:text-base">{category.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
          aria-label="Previous category"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${currentIndex === index ? "bg-[#D4AF37]" : "bg-gray-300"}`}
              aria-label={`Go to category ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={currentIndex === categories.length - 1}
          className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
          aria-label="Next category"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
