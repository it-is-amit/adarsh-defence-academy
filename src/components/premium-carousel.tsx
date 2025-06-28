"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarouselItem {
  title: string
  description: string
  image: string
}

interface PremiumCarouselProps {
  items: CarouselItem[]
  className?: string
}

export default function PremiumCarousel({ items, className }: PremiumCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const controls = useAnimation()
  const x = useMotionValue(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [carouselWidth, setCarouselWidth] = useState(0)

  // Update carousel width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  const nextSlide = async () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(1)
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
    await controls.start({ x: "-100%", transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } })
    controls.set({ x: "100%" })
    await controls.start({ x: "0%", transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } })
    setIsAnimating(false)
  }

  const prevSlide = async () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
    await controls.start({ x: "100%", transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } })
    controls.set({ x: "-100%" })
    await controls.start({ x: "0%", transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } })
    setIsAnimating(false)
  }

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (isAnimating) return
    setIsDragging(true)
    if ("touches" in e) {
      setStartX(e.touches[0].clientX)
    } else {
      setStartX(e.clientX)
    }
  }

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const deltaX = clientX - startX
    x.set(deltaX)
  }

  const handleDragEnd = async (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setIsDragging(false)
    const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX
    const deltaX = clientX - startX

    if (Math.abs(deltaX) > 100) {
      if (deltaX > 0) {
        await prevSlide()
      } else {
        await nextSlide()
      }
    } else {
      controls.start({ x: 0, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } })
    }
  }

  // Get visible cards (previous, current, next)
  const getVisibleCards = () => {
    const cards = []
    const totalItems = items.length

    // Previous card
    const prevIndex = (currentIndex - 1 + totalItems) % totalItems
    cards.push({ ...items[prevIndex], position: "previous", index: prevIndex })

    // Current card
    cards.push({ ...items[currentIndex], position: "current", index: currentIndex })

    // Next card
    const nextIndex = (currentIndex + 1) % totalItems
    cards.push({ ...items[nextIndex], position: "next", index: nextIndex })

    return cards
  }

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating && !isDragging && hoveredIndex === null) {
        nextSlide()
      }
    }, 5000)
    return () => clearInterval(timer)
  }, [isAnimating, isDragging, hoveredIndex])

  const visibleCards = getVisibleCards()

  return (
    <div className={cn("relative w-full py-16", className)}>
      {/* Main carousel container */}
      <div
        ref={carouselRef}
        className="relative h-[500px] overflow-hidden"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <motion.div className="absolute inset-0 flex items-center justify-center" animate={controls} style={{ x }}>
          <div className="relative w-full h-full flex items-center justify-center">
            {visibleCards.map((card, idx) => {
              const isCenter = card.position === "current"
              const isPrev = card.position === "previous"
              const isNext = card.position === "next"

              return (
                <motion.div
                  key={`card-${card.index}`}
                  className="absolute top-0 flex items-center justify-center h-full"
                  initial={false}
                  animate={{
                    left: isPrev ? "10%" : isCenter ? "50%" : "90%",
                    x: isPrev ? "-50%" : isCenter ? "-50%" : "-50%",
                    scale: isPrev || isNext ? 0.8 : 1,
                    opacity: isPrev || isNext ? 0.7 : 1,
                    zIndex: isPrev || isNext ? 0 : 10,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 1,
                  }}
                  onMouseEnter={() => setHoveredIndex(card.index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className={cn(
                      "relative w-[320px] h-[450px] rounded-2xl overflow-hidden shadow-lg transition-all duration-300",
                      isCenter ? "shadow-xl" : "shadow-md",
                      hoveredIndex === card.index && !isCenter && "scale-105 shadow-xl z-20",
                    )}
                  >
                    {/* Card background with gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />

                    {/* Card image */}
                    <Image
                      src={card.image || "/placeholder.svg?height=450&width=320"}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />

                    {/* Card content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <motion.h3
                        className="text-xl font-bold mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                      >
                        {card.title}
                      </motion.h3>
                      <motion.div
                        className="bg-black/40 backdrop-blur-sm rounded-lg p-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <p className="text-sm text-gray-100 line-clamp-3">{card.description}</p>
                      </motion.div>

                      {/* View details button (only visible on hover for center card) */}
                      {isCenter && (
                        <motion.button
                          className="mt-4 bg-primary text-white px-4 py-2 rounded-lg opacity-0 hover:bg-primary/90 transition-all duration-300"
                          initial={{ y: 20, opacity: 0 }}
                          animate={hoveredIndex === card.index ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                          transition={{ delay: 0.3, duration: 0.3 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                      )}
                    </div>

                    {/* Card shine effect on hover */}
                    {hoveredIndex === card.index && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 pointer-events-none"
                        initial={{ opacity: 0, rotate: -45 }}
                        animate={{
                          opacity: [0, 1, 0],
                          left: ["-100%", "100%", "100%"],
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Navigation controls */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 md:px-10 z-30 pointer-events-none">
        <motion.button
          className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-300 pointer-events-auto"
          onClick={prevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isAnimating}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>
        <motion.button
          className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-300 pointer-events-auto"
          onClick={nextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isAnimating}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <motion.button
            key={index}
            className={cn(
              "h-2 rounded-full bg-gray-300 cursor-pointer transition-all duration-300",
              index === currentIndex ? "w-8 bg-primary" : "w-2 hover:bg-gray-400",
            )}
            onClick={() => {
              if (isAnimating) return
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}
