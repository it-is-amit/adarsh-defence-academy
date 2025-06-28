"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FacilityCard {
  title: string
  description: string
  image: string
}

interface FacilitiesSliderProps {
  data: FacilityCard[]
}

export default function FacilitiesSlider({ data }: FacilitiesSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(1) // Start with center card active
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right, 0 for initial

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % data.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length)
  }

  const getVisibleCards = () => {
    const cards = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex - 1 + i + data.length) % data.length
      cards.push({ ...data[index], index })
    }
    return cards
  }

  const cardVariants = {
    center: {
      scale: 1.1,
      y: 0,
      opacity: 1,
      zIndex: 10,
      transition: { duration: 0.5, type: "spring", stiffness: 300, damping: 20 },
    },
    left: {
      scale: 0.9,
      y: 20,
      opacity: 0.7,
      zIndex: 5,
      transition: { duration: 0.5 },
    },
    right: {
      scale: 0.9,
      y: 20,
      opacity: 0.7,
      zIndex: 5,
      transition: { duration: 0.5 },
    },
    incoming: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
      transition: { duration: 0 },
    }),
    outgoing: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
      transition: { duration: 0.5 },
    }),
  }

  return (
    <div className="relative py-12">
      <div className="flex items-center justify-center gap-8 overflow-visible h-[500px]">
        <AnimatePresence initial={false} mode="popLayout">
          {getVisibleCards().map((card, position) => {
            const isCenter = position === 1
            const positionClass = position === 0 ? "left" : position === 2 ? "right" : "center"

            return (
              <motion.div
                key={`${card.index}-${position}`}
                custom={direction}
                variants={cardVariants}
                initial={direction === 0 ? positionClass : "incoming"}
                animate={positionClass}
                exit="outgoing"
                className="absolute"
                style={{
                  left: position === 0 ? "calc(50% - 300px)" : position === 1 ? "calc(50% - 150px)" : "calc(50% + 0px)",
                }}
              >
                <div
                  className={`bg-muted/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isCenter ? "w-[300px]" : "w-[280px]"
                  }`}
                >
                  <div className="relative h-[250px]">
                    <Image
                      src={card.image || "/placeholder.svg?height=300&width=400"}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 min-h-[200px] flex flex-col justify-center">
                    <h3 className="font-bold text-lg mb-4 text-center">{card.title}</h3>
                    <div className="bg-muted/70 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground text-center leading-relaxed line-clamp-4">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-lg h-12 w-12 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-lg h-12 w-12 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {data.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}
