"use client"

import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export default function AboutSection() {
  const { t } = useLanguage()

  const values = [
    {
      titleKey: "nationalPride",
      descriptionKey: "nationalPrideDesc",
    },
    {
      titleKey: "sportsmanship",
      descriptionKey: "sportsmanshipDesc",
    },
    {
      titleKey: "holisticDevelopment",
      descriptionKey: "holisticDevelopmentDesc",
    },
  ]

  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Defence Logo Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36">
              <Image
                src="/assets/defence.png"
                alt="Adarsh Defence Academy Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-balance">{t("aboutTitle")}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-2 mt-4">{t("aboutSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-secondary p-4 sm:p-6 rounded-lg space-y-3 sm:space-y-4 hover:bg-muted/70 transition-colors duration-300"
            >
              <h3 className="text-lg sm:text-xl font-bold">{t(value.titleKey)}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t(value.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
