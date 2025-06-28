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
    <section className="py-16 bg-background container mx-auto">
      <div className="container px-4">
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t("aboutTitle")}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t("aboutSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-secondary p-6 rounded-lg space-y-4 hover:bg-muted/70 transition-colors duration-300"
            >
              <h3 className="text-xl font-bold">{t(value.titleKey)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(value.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
