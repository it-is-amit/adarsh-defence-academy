"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

const galleryImages = [
  {
    src: "/assets/gallery/gallery1.png",
    alt: "Training Ground",
    blurHash:"LaG+qDxVb{IpA#s,bcW=S*M|i]xt"
  },
  {
    src: "/assets/gallery/gallery2.png",
    alt: "Classroom",
    blurHash:"LaG+qDxVb{IpA#s,bcW=S*M|i]xt"
  },
  {
    src: "/assets/gallery/gallery3.png",
    alt: "Sports Facility",
    blurHash:"LaG+qDxVb{IpA#s,bcW=S*M|i]xt"
  },
  {
    src: "/assets/gallery/gallery4.png",
    alt: "Students Training",
    blurHash:"LaG+qDxVb{IpA#s,bcW=S*M|i]xt"
  },
  {
    src: "/assets/gallery/gallery5.png",
    alt: "Achievement Ceremony",
    blurHash:"LaG+qDxVb{IpA#s,bcW=S*M|i]xt"
  },
  {
    src: "/assets/gallery/gallery6.png",
    alt: "Team Building",
    blurHash:"LaG+qDxVb{IpA#s,bcW=S*M|i]xt"
  },
  {
    src: "/assets/gallery/gallery7.png",
    alt: "Physical Training",
    blurHash:"LaG+qDxVb{IpA#s,bcW=S*M|i]xt"
  },
  {
    src: "/assets/gallery/gallery8.png",
    alt: "Academic Session",
    blurHash:"LaG+qDxVb{IpA#s,bcW=S*M|i]xt"
  },
]

export default function ImageGallery() {
  const { t } = useLanguage()

  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t("galleryTitle")}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">{t("gallerySubtitle")}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                placeholder="blur"
                blurDataURL={image.blurHash}
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
