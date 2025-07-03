"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function ProgramsPage() {
  const { t } = useLanguage()

  // Program data using translations
  const programsData = [
    {
      title: t("programsDefenceTrainingNdaTitle") as string,
      description: t("programsDefenceTrainingNdaDescription") as string,
      image: "/assets/hero/hero3.png",
      learningPoints: t("programsDefenceTrainingNdaLearningPoints") as readonly string[],
    },
    {
      title: t("programsSportsCoachingTitle") as string,
      description: t("programsSportsCoachingDescription") as string,
      image: "/assets/hero/hero1.png",
      learningPoints: t("programsSportsCoachingLearningPoints") as readonly string[],
    },
  ]

  // Core values data using translations
  const coreValuesData = [
    {
      title: t("programsCoreValuesIntegrityTitle") as string,
      description: t("programsCoreValuesIntegrityDescription") as string,
      image: "/assets/core-values/integrity.png",
    },
    {
      title: t("programsCoreValuesExcellenceTitle") as string,
      description: t("programsCoreValuesExcellenceDescription") as string,
      image: "/assets/core-values/excellence.png",
    },
    {
      title: t("programsCoreValuesRespectTitle") as string,
      description: t("programsCoreValuesRespectDescription") as string,
      image: "/assets/core-values/respect.png",
    },
    {
      title: t("programsCoreValuesTeamworkTitle") as string,
      description: t("programsCoreValuesTeamworkDescription") as string,
      image: "/assets/core-values/teamwork.png",
    },
    {
      title: t("programsCoreValuesInnovationTitle") as string,
      description: t("programsCoreValuesInnovationDescription") as string,
      image: "/assets/core-values/innovation.png",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4 container mx-auto">
        <div className="container px-4">
          <p className="text-sm text-muted-foreground">Home {">"} Programs</p>
        </div>
      </div>

      {/* Programs Section */}
      <section className="py-16 bg-background container mx-auto">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("programsPageTitle")}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("programsPageSubtitle")}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {programsData.map((program, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={program.image || "/placeholder.svg?height=300&width=500"}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-8 space-y-6">
                  <h3 className="text-2xl font-bold">{program.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{program.description}</p>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">{t("programsWhatYouLearnTitle")}</h4>
                    <ul className="space-y-2">
                      {program.learningPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                      {t("programsGetDetails")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-muted/30 container mx-auto">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("programsProgramFeaturesTitle")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("programsPageSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {coreValuesData.map((value, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-xl text-center space-y-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-32 mx-auto">
                  <Image
                    src={value.image || "/placeholder.svg?height=150&width=150"}
                    alt={value.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
