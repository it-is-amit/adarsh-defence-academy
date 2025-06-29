"use client"

import { CarouselItem, CarouselApi } from "@/components/ui/carousel"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
// import { useLanguage } from "@/contexts/language-context"

interface FeaturedCarouselItem {
  title: string
  description: string
  image: string
}

interface FeaturedCarouselProps {
  items: FeaturedCarouselItem[]
  className?: string
}

export default function FeaturedCarousel({ items, className }: FeaturedCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  // const { t } = useLanguage()

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className={cn("relative px-4 py-10", className)}>
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <div
                className={cn(
                  "relative overflow-hidden rounded-xl transition-all duration-300 h-[400px]",
                  current === index ? "scale-105 shadow-xl z-10" : "scale-90 opacity-70",
                )}
              >
                {/* Image */}
                <Image
                  src={item.image || "/placeholder.svg?height=400&width=300"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500"
                />

                {/* Gradient overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300",
                    current === index ? "opacity-100" : "opacity-60",
                  )}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3
                    className={cn(
                      "font-bold mb-2 text-white transition-all duration-300",
                      current === index ? "text-xl" : "text-lg",
                    )}
                  >
                    {item.title}
                  </h3>
                  <div
                    className={cn(
                      "bg-black/30 backdrop-blur-sm rounded-lg p-4 transition-all duration-300",
                      current === index ? "opacity-100" : "opacity-80",
                    )}
                  >
                    <p className="text-sm text-white/90 line-clamp-3">{item.description}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom navigation buttons */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-2 md:px-4 z-20">
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white"
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white"
            onClick={() => api?.scrollNext()}
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </Button>
        </div>
      </Carousel>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "transition-all duration-300 rounded-full focus:outline-none",
              index === current ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-gray-300 hover:bg-gray-400",
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
