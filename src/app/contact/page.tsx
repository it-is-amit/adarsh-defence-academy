"use client"

import { MapPin, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"
import ContactForm from "@/components/contact-form"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function ContactPage() {
  const { t } = useLanguage()

  // Contact data using footer translations
  const contactData = {
    centralOffice: {
      name: t("footerAcademyName") as string,
      address: t("footerAddress") as string,
      phone: t("footerPhone") as string,
      email: t("footerEmail") as string,
    },
    registeredOffice: {
      name: t("footerAcademyName") as string,
      address: t("footerAddress") as string,
      phone: t("footerPhone") as string,
      email: t("footerEmail") as string,
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            Home {">"} {t("breadcrumb")}
          </p>
        </div>
      </div>

      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 text-primary">{t("title")}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg px-2">{t("subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Map and Form Section */}
          <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8">
            {/* Map Section */}
            <div className="bg-card border border-border rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl flex flex-col">
              <div className="relative h-48 sm:h-64 w-full">
                {/* Dummy Map (Google Maps iframe or static image) */}
                <iframe
                  title="Academy Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=73.0033%2C26.2389%2C73.0533%2C26.2889&amp;layer=mapnik"
                  className="absolute inset-0 w-full h-full border-0 rounded-t-2xl sm:rounded-t-3xl"
                  loading="lazy"
                  style={{ filter: "grayscale(0.2) contrast(1.1)" }}
                  allowFullScreen
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-primary/90 text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-semibold text-xs sm:text-sm">{t("mapTitle")}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-5 text-white rounded-b-2xl sm:rounded-b-3xl">
                  <h3 className="font-semibold text-base sm:text-lg">{t("footerAcademyName")}</h3>
                  <p className="text-xs sm:text-sm opacity-90">{t("footerAddress")}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8">
              <ContactForm />
            </div>
          </motion.div>

          {/* Address Section */}
          <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8">
            {/* Central Office */}
            <div className="bg-card border border-border rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
              <div className="bg-primary/10 p-4 sm:p-6 flex items-center gap-3 border-b border-border">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <h3 className="text-lg sm:text-xl font-bold text-foreground">{t("centralOfficeTitle")}</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-muted/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">{contactData.centralOffice.name}</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">{contactData.centralOffice.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-muted/70 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm">{contactData.centralOffice.phone}</p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-muted/70 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm">{contactData.centralOffice.email}</p>
                </div>
              </div>
            </div>

            {/* Registered Office */}
            <div className="bg-card border border-border rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
              <div className="bg-primary/10 p-4 sm:p-6 flex items-center gap-3 border-b border-border">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <h3 className="text-lg sm:text-xl font-bold text-foreground">{t("registeredOfficeTitle")}</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-muted/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">{contactData.registeredOffice.name}</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">{contactData.registeredOffice.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-muted/70 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm">{contactData.registeredOffice.phone}</p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-muted/70 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm">{contactData.registeredOffice.email}</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="tel:+916376784539" target="_blank">
                <div className="bg-card border border-border p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center cursor-pointer group flex flex-col items-center">
                  <Phone className="h-7 w-7 sm:h-9 sm:w-9 text-primary mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold mb-1 text-foreground text-sm sm:text-base">{t("quickContactCallUsTitle")}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{t("quickContactCallUsDescription")}</p>
                </div>
              </Link>
              <Link href="mailto:adsajodhpur@gmail.com" target="_blank">
                <div className="bg-card border border-border p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center cursor-pointer group flex flex-col items-center">
                  <Mail className="h-7 w-7 sm:h-9 sm:w-9 text-primary mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold mb-1 text-foreground text-sm sm:text-base">{t("quickContactEmailUsTitle")}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{t("quickContactEmailUsDescription")}</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
