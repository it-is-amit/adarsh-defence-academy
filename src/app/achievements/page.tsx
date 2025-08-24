"use client"

import Image from "next/image"
import { Trophy, Medal } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export default function AchievementsPage() {
  const { t } = useLanguage()

  // Alumni data using translations
  // const alumniData = [
  //   {
  //     name: t("alumniRajeshKumarName") as string,
  //     achievement: t("alumniRajeshKumarAchievement") as string,
  //     brief: t("alumniRajeshKumarBrief") as string,
  //     photo: "https://placehold.co/200x200/png",
  //   },
  //   {
  //     name: t("alumniPriyaSharmaName") as string,
  //     achievement: t("alumniPriyaSharmaAchievement") as string,
  //     brief: t("alumniPriyaSharmaBrief") as string,
  //     photo: "https://placehold.co/200x200/png",
  //   },
  //   {
  //     name: t("alumniArjunSinghName") as string,
  //     achievement: t("alumniArjunSinghAchievement") as string,
  //     brief: t("alumniArjunSinghBrief") as string,
  //     photo: "https://placehold.co/200x200/png",
  //   },
  //   {
  //     name: t("alumniMeeraPatelName") as string,
  //     achievement: t("alumniMeeraPatelAchievement") as string,
  //     brief: t("alumniMeeraPatelBrief") as string,
  //     photo: "https://placehold.co/200x200/png",
  //   },
  // ]

  // Awards data using translations
  // const awardsData = [
  //   {
  //     title: t("awardsBestDefenceAcademyTitle") as string,
  //     description: t("awardsBestDefenceAcademyDescription") as string,
  //     image: "https://placehold.co/200x200/png",
  //   },
  //   {
  //     title: t("awardsSportsExcellenceTitle") as string,
  //     description: t("awardsSportsExcellenceDescription") as string,
  //     image: "https://placehold.co/200x200/png",
  //   },
  //   {
  //     title: t("awardsEducationalInnovationTitle") as string,
  //     description: t("awardsEducationalInnovationDescription") as string,
  //     image: "https://placehold.co/200x200/png",
  //   },
  //   {
  //     title: t("awardsCommunityServiceTitle") as string,
  //     description: t("awardsCommunityServiceDescription") as string,
  //     image: "https://placehold.co/200x200/png",
  //   },
  // ]

  // Notable achievements data using translations
  // const notableAchievementsData = [
  //   {
  //     title: t("notableCricketChampionshipTitle") as string,
  //     brief: t("notableCricketChampionshipBrief") as string,
  //     photo: "https://placehold.co/200x200/png",
  //   },
  //   {
  //     title: t("notableNdaSelectionTitle") as string,
  //     brief: t("notableNdaSelectionBrief") as string,
  //     photo: "https://placehold.co/200x200/png",
  //   },
  //   {
  //     title: t("notableAthleticsMedalTitle") as string,
  //     brief: t("notableAthleticsMedalBrief") as string,
  //     photo: "https://placehold.co/200x200/png",
  //   },
  //   {
  //     title: t("notableDefenceExcellenceTitle") as string,
  //     brief: t("notableDefenceExcellenceBrief") as string,
  //     photo: "https://placehold.co/200x200/png",
  //   },
  // ]

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            {t("breadcrumbHome")} {">"} {t("breadcrumbAchievement")}
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-amber-50 to-background dark:from-amber-950/20 dark:to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center my-12 sm:my-16 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
              <Trophy className="h-32 sm:h-48 w-32 sm:w-48 text-amber-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
              {t("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">{t("heroSubtitle")}</p>
          </div>
        </div>
      </section>

      {/* Student Achievements - Images Only */}
      <section className="py-12 sm:py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
              <Medal className="h-24 sm:h-32 w-24 sm:w-32 text-amber-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 inline-flex items-center gap-2 sm:gap-3">
              <Medal className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500" />
              {t("studentAchievementsTitle") || "Student Achievements"}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              {t("studentAchievementsSubtitle") || "Celebrating our students' success in awards, medals, and certifications"}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 7 }, (_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative aspect-square overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <Image
                  src={`/assets/student-achievements/${index + 1}.png`}
                  alt={`Student Achievement ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories of Alumni */}
      {/* <section className="py-12 sm:py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
              <Star className="h-24 sm:h-32 w-24 sm:w-32 text-amber-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 inline-flex items-center gap-2 sm:gap-3">
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500" />
              {t("successStoriesTitle")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">{t("successStoriesSubtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {alumniData.map((alumnus, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative h-40 sm:h-48">
                  <div className="absolute top-0 right-0 bg-amber-500 text-white px-2 sm:px-3 py-1 rounded-bl-lg z-10">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <Image
                    src={alumnus.photo || "/placeholder.svg?height=200&width=200"}
                    alt={alumnus.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                  <h3 className="font-bold text-base sm:text-lg">{alumnus.name}</h3>
                  <p className="text-amber-600 dark:text-amber-400 font-medium text-sm sm:text-base">{alumnus.achievement}</p>
                  <div className="bg-muted/50 p-2 sm:p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">{alumnus.brief}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Awards and Recognition */}
      {/* <section className="py-12 sm:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
              <Award className="h-24 sm:h-32 w-24 sm:w-32 text-amber-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 inline-flex items-center gap-2 sm:gap-3">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500" />
              {t("awardsTitle")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">{t("awardsSubtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {awardsData.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/10 rounded-xl p-4 sm:p-6 text-center space-y-3 sm:space-y-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-amber-200/50 dark:border-amber-800/20"
              >
                <div className="relative h-24 sm:h-32 mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <Award className="h-16 w-16 sm:h-24 sm:w-24 text-amber-500" />
                  </div>
                  <Image
                    src={award.image || "/placeholder.svg?height=150&width=150"}
                    alt={award.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-amber-800 dark:text-amber-300 text-sm sm:text-base">{award.title}</h3>
                <div className="bg-white/50 dark:bg-black/20 p-2 sm:p-3 rounded-lg">
                  <p className="text-xs sm:text-sm text-muted-foreground">{award.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Notable Achievements */}
      {/* <section className="py-12 sm:py-16 bg-gradient-to-b from-muted/20 to-amber-50/30 dark:from-muted/20 dark:to-amber-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
              <Medal className="h-24 sm:h-32 w-24 sm:w-32 text-amber-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 inline-flex items-center gap-2 sm:gap-3">
              <Medal className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500" />
              {t("notableAchievementsTitle")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">{t("notableAchievementsSubtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {notableAchievementsData.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group border border-amber-200/50 dark:border-amber-800/20"
              >
                <div className="relative h-40 sm:h-48">
                  <div className="absolute top-0 right-0 bg-amber-500 text-white px-2 sm:px-3 py-1 rounded-bl-lg z-10 flex items-center gap-1">
                    <Star className="h-2 w-2 sm:h-3 sm:w-3" />
                    <span className="text-xs font-medium">Achievement</span>
                  </div>
                  <Image
                    src={achievement.photo || "/placeholder.svg?height=200&width=200"}
                    alt={achievement.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                  <h3 className="font-bold text-base sm:text-lg text-amber-800 dark:text-amber-300">{achievement.title}</h3>
                  <div className="bg-amber-50 dark:bg-amber-950/30 p-2 sm:p-3 rounded-lg border border-amber-100 dark:border-amber-800/30">
                    <p className="text-xs sm:text-sm text-muted-foreground">{achievement.brief}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
    </main>
  )
}
