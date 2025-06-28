"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

const galleryImages = [
  {
    src: "https://placehold.co/300x300/png",
    alt: "Training Ground",
  },
  {
    src: "https://placehold.co/300x300/png",
    alt: "Classroom",
  },
  {
    src: "https://placehold.co/300x300/png",
    alt: "Sports Facility",
  },
  {
    src: "https://placehold.co/300x300/png",
    alt: "Students Training",
  },
  {
    src: "https://placehold.co/300x300/png",
    alt: "Achievement Ceremony",
  },
  {
    src: "https://placehold.co/300x300/png",
    alt: "Team Building",
  },
  {
    src: "https://placehold.co/300x300/png",
    alt: "Physical Training",
  },
  {
    src: "https://placehold.co/300x300/png",
    alt: "Academic Session",
  },
]

export default function ImageGallery() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-background container mx-auto">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("galleryTitle")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("gallerySubtitle")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
