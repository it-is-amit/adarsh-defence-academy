"use client";

import ContactForm from "@/components/contact-form"
import { MapPin, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export default function HomeContactSection() {
  const { t } = useLanguage()

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-primary"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2"
          >
            Have questions about our programs? Reach out to us and our team will get back to you shortly.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          <div className="space-y-6 sm:space-y-8">
            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl flex flex-col"
            >
              <div className="relative h-48 sm:h-64 w-full">
                <iframe
                  title="Academy Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=73.0033%2C26.2389%2C73.0533%2C26.2889&amp;layer=mapnik"
                  className="absolute inset-0 w-full h-full border-0 rounded-t-2xl sm:rounded-t-3xl"
                  loading="lazy"
                  style={{ filter: 'grayscale(0.2) contrast(1.1)' }}
                  allowFullScreen
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-primary/90 text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-semibold text-xs sm:text-sm">Our Location</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-5 text-white rounded-b-2xl sm:rounded-b-3xl">
                  <h3 className="font-semibold text-base sm:text-lg">{t("footerAcademyName")}</h3>
                  <p className="text-xs sm:text-sm opacity-90">{t("footerAddress")}</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden"
            >
              <div className="bg-primary/10 p-4 sm:p-6 flex items-center gap-3 border-b border-border">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <h3 className="text-lg sm:text-xl font-bold text-foreground">Contact Information</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-muted/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">{t("footerAcademyName")}</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">{t("footerAddress")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-muted/70 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm">{t("footerPhone")}</p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-muted/70 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm">{t("footerEmail")}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
