"use client"

import { MapPin, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"
import ContactForm from "@/components/contact-form"
import { useLanguage } from "@/contexts/language-context"

export default function ContactPage() {
  const { t } = useLanguage()

  // Contact data using translations
  const contactData = {
    centralOffice: {
      name: t("centralOfficeName") as string,
      address: t("centralOfficeAddress") as string,
      phone: t("centralOfficePhone") as string,
      email: t("centralOfficeEmail") as string,
    },
    registeredOffice: {
      name: t("registeredOfficeName") as string,
      address: t("registeredOfficeAddress") as string,
      phone: t("registeredOfficePhone") as string,
      email: t("registeredOfficeEmail") as string,
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
      <div className="bg-muted/30 py-4 container mx-auto">
        <div className="container px-4">
          <p className="text-sm text-muted-foreground">
            Home {">"} {t("breadcrumb")}
          </p>
        </div>
      </div>

      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="container mx-auto py-20">
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">{t("title")}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Map and Form Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Map Section */}
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl flex flex-col">
              <div className="relative h-64 w-full">
                {/* Dummy Map (Google Maps iframe or static image) */}
                <iframe
                  title="Academy Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=73.0033%2C26.2389%2C73.0533%2C26.2889&amp;layer=mapnik"
                  className="absolute inset-0 w-full h-full border-0 rounded-t-3xl"
                  loading="lazy"
                  style={{ filter: "grayscale(0.2) contrast(1.1)" }}
                  allowFullScreen
                />
                <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span className="font-semibold text-sm">{t("mapTitle")}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white rounded-b-3xl">
                  <h3 className="font-semibold text-lg">Adarsh Defence & Sports Academy</h3>
                  <p className="text-sm opacity-90">Jodhpur, Rajasthan</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border rounded-3xl shadow-xl p-8">
              <ContactForm />
            </div>
          </motion.div>

          {/* Address Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Central Office */}
            <div className="bg-card border border-border rounded-3xl shadow-lg overflow-hidden">
              <div className="bg-primary/10 p-6 flex items-center gap-3 border-b border-border">
                <MapPin className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">{t("centralOfficeTitle")}</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-muted/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{contactData.centralOffice.name}</p>
                    <p className="text-muted-foreground text-sm">{contactData.centralOffice.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-muted/70 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">{contactData.centralOffice.phone}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-muted/70 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">{contactData.centralOffice.email}</p>
                </div>
              </div>
            </div>

            {/* Registered Office */}
            <div className="bg-card border border-border rounded-3xl shadow-lg overflow-hidden">
              <div className="bg-primary/10 p-6 flex items-center gap-3 border-b border-border">
                <MapPin className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">{t("registeredOfficeTitle")}</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-muted/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{contactData.registeredOffice.name}</p>
                    <p className="text-muted-foreground text-sm">{contactData.registeredOffice.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-muted/70 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">{contactData.registeredOffice.phone}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-muted/70 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">{contactData.registeredOffice.email}</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center cursor-pointer group flex flex-col items-center">
                <Phone className="h-9 w-9 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-1 text-foreground">{t("quickContactCallUsTitle")}</h4>
                <p className="text-sm text-muted-foreground">{t("quickContactCallUsDescription")}</p>
              </div>
              <div className="bg-card border border-border p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center cursor-pointer group flex flex-col items-center">
                <Mail className="h-9 w-9 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-1 text-foreground">{t("quickContactEmailUsTitle")}</h4>
                <p className="text-sm text-muted-foreground">{t("quickContactEmailUsDescription")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
