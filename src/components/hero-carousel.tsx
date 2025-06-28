"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const heroSlides = [
  {
    titleKey: "heroTitle1",
    subtitleKey: "heroSubtitle1",
    buttonTextKey: "explore",
    image: "https://placehold.co/1200x600/png",
  },
  {
    titleKey: "heroTitle2",
    subtitleKey: "heroSubtitle2",
    buttonTextKey: "learnMore",
    image: "https://placehold.co/1200x600/png",
  },
  {
    titleKey: "heroTitle3",
    subtitleKey: "heroSubtitle3",
    buttonTextKey: "joinNow",
    image: "https://placehold.co/1200x600/png",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={t(slide.titleKey)}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white space-y-6 max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">{t(slide.titleKey)}</h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">{t(slide.subtitleKey)}</p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
              >
                {t(slide.buttonTextKey)}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
