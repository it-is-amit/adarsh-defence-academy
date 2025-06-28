"use client"

import { Shield, Target, Users, Lightbulb, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const valuesData = [
  {
    titleKey: "integrity",
    descriptionKey: "integrityDesc",
    icon: Shield,
  },
  {
    titleKey: "excellence",
    descriptionKey: "excellenceDesc",
    icon: Target,
  },
  {
    titleKey: "respect",
    descriptionKey: "respectDesc",
    icon: Heart,
  },
  {
    titleKey: "teamwork",
    descriptionKey: "teamworkDesc",
    icon: Users,
  },
  {
    titleKey: "innovation",
    descriptionKey: "innovationDesc",
    icon: Lightbulb,
  },
]

export default function ValuesSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("coreValues")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("coreValuesSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valuesData.map((value, index) => (
            <div
              key={index}
              className="group bg-background p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t(value.titleKey)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(value.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
