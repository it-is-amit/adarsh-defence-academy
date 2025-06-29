"use client"

import { useEffect, useRef } from "react"
import FeaturedCarousel from "@/components/featured-carousel"
import { facilitiesData, teamData, infrastructureData } from "@/data/facilities"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export default function FacilitiesPage() {
  const facilitiesRef = useRef<HTMLElement>(null)
  const infrastructureRef = useRef<HTMLElement>(null)
  const teamRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const hash = window.location.hash
    if (hash === "#infrastructure" && infrastructureRef.current) {
      infrastructureRef.current.scrollIntoView({ behavior: "smooth" })
    } else if (hash === "#team" && teamRef.current) {
      teamRef.current.scrollIntoView({ behavior: "smooth" })
    } else if (hash === "#facilities" && facilitiesRef.current) {
      facilitiesRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4 container mx-auto">
        <div className="container px-4">
          <p className="text-sm text-muted-foreground">
            Home {">"} {t("facilitiesPageTitle")}
          </p>
        </div>
      </div>

      {/* Facilities Section */}
      <motion.section
        ref={facilitiesRef}
        id="facilities"
        className="py-16 bg-background container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("facilitiesPageTitle")}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("facilitiesPageSubtitle")}</p>
          </div>
          <FeaturedCarousel items={facilitiesData} />
        </div>
      </motion.section>

      {/* Infrastructure Section */}
      <motion.section
        ref={infrastructureRef}
        id="infrastructure"
        className="py-16 bg-muted/30 container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("facilitiesInfrastructureTitle")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("facilitiesInfrastructureSubtitle")}</p>
          </div>
          <FeaturedCarousel items={infrastructureData} />
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        ref={teamRef}
        id="team"
        className="py-16 bg-background container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("facilitiesTeamTitle")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("facilitiesTeamSubtitle")}</p>
          </div>
          <FeaturedCarousel items={teamData} />
        </div>
      </motion.section>
    </main>
  )
}
