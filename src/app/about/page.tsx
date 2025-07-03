"use client"

import Image from "next/image"
import { Eye, TargetIcon } from 'lucide-react'
import { useLanguage } from "@/contexts/language-context"

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="/assets/hero/hero2.png"
          alt="About Adarsh Defence and Sports Academy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4 max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold">{t("aboutHeroTitle")}</h1>
            <p className="text-lg md:text-xl text-gray-200">{t("aboutHeroSubtitle")}</p>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-background container mx-auto">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">{t("welcomeTitle")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{t("welcomeDescription")}</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-muted/30 container mx-auto">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">{t("ourStoryTitle")}</h2>
              <p className="text-muted-foreground leading-relaxed">{t("ourStoryDescription")}</p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image src="/assets/our-story.png" alt="Our Story" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-16 bg-background container mx-auto">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{t("philosophyTitle")}</h2>

            <div className="space-y-8">
              <div className="bg-muted/30 p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">{t("identifyingTalent")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("identifyingTalentDesc")}</p>
              </div>

              <div className="bg-muted/30 p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">{t("fosteringExcellence")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("fosteringExcellenceDesc")}</p>
              </div>

              <div className="bg-muted/30 p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">{t("buildingCharacter")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("buildingCharacterDesc")}</p>
              </div>

              <div className="bg-primary/10 p-8 rounded-xl shadow-sm">
                <p className="text-lg font-medium text-center">{t("joinUsMessage")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 bg-muted/30 container mx-auto">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <TargetIcon className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t("missionTitle")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("missionDescription")}</p>
            </div>

            <div className="bg-background p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Eye className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t("visionTitle")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("visionDescription")}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
