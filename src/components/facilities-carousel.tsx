"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface FacilityCard {
  title: string
  description: string
  image: string
}

interface FacilitiesCarouselProps {
  data: FacilityCard[]
}

export default function FacilitiesCarousel({ data }: FacilitiesCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [data])

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1))
  }

  const getCardClass = (index: number) => {
    // Calculate the relative position to the active card
    const position = (index - activeIndex + data.length) % data.length

    // Determine if the card is visible (center, left, or right)
    if (position === 0) return "center" // Active card
    if (position === 1 || position === data.length - 1) return "adjacent" // Cards adjacent to active
    return "hidden" // Other cards
  }

  return (
    <div className="relative py-12 overflow-hidden">
      <motion.div ref={carousel} className="overflow-hidden cursor-grab" whileTap={{ cursor: "grabbing" }}>
        <motion.div
          className="flex items-center justify-center"
          animate={{ x: -activeIndex * 320 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {data.map((card, index) => {
            const cardType = getCardClass(index)

            return (
              <motion.div
                key={index}
                className={`min-w-[280px] mx-4 transition-all duration-500 ${
                  cardType === "center"
                    ? "scale-110 z-10 opacity-100"
                    : cardType === "adjacent"
                      ? "scale-90 opacity-70 z-0"
                      : "scale-75 opacity-40 z-0"
                }`}
                initial={false}
                animate={{
                  scale: cardType === "center" ? 1.1 : cardType === "adjacent" ? 0.9 : 0.75,
                  opacity: cardType === "center" ? 1 : cardType === "adjacent" ? 0.7 : 0.4,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-[450px]">
                  <div className="relative h-[250px]">
                    <Image
                      src={card.image || "/placeholder.svg?height=300&width=400"}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 h-[200px] flex flex-col justify-center">
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
        </motion.div>
      </motion.div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-lg h-12 w-12 rounded-full cursor-pointer z-20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-lg h-12 w-12 rounded-full cursor-pointer z-20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {data.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === activeIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
