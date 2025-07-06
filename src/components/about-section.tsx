"use client"

import { useLanguage } from "@/contexts/language-context"

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
        <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{t("aboutTitle")}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-2">{t("aboutSubtitle")}</p>
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
