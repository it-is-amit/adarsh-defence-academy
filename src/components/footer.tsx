"use client";

import Link from "next/link"
import { Phone, MapPin, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { label: t("footerHome"), href: "/" },
    { label: t("footerAboutUs"), href: "/about" },
    { label: t("footerFacilities"), href: "/facilities" },
    { label: t("footerContactUs"), href: "/contact" },
  ]

  const programs = [
    { label: t("footerDefenceTraining"), href: "/programs#defence" },
    { label: t("footerSportsCoaching"), href: "/programs#sports" },
    { label: t("footerAcademicSupport"), href: "/programs#academic" },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-20 bg-primary rounded flex items-center justify-center text-sm font-bold text-primary-foreground">
                LOGO
              </div>
            </div>
            <h3 className="font-bold text-white">{t("footerAcademyName")}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{t("footerDescription")}</p>

            <div className="flex space-x-3 pt-4">
              <Link
                href="#"
                className="h-8 w-8 bg-slate-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="h-8 w-8 bg-slate-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="h-8 w-8 bg-slate-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="h-8 w-8 bg-slate-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg border-b border-slate-700 pb-2">{t("footerQuickLinks")}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 bg-primary rounded-full group-hover:w-2 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg border-b border-slate-700 pb-2">{t("footerPrograms")}</h4>
            <ul className="space-y-2">
              {programs.map((program) => (
                <li key={program.href}>
                  <Link
                    href={program.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 bg-primary rounded-full group-hover:w-2 transition-all"></span>
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg border-b border-slate-700 pb-2">{t("footerContact")}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-300">{t("footerAddress")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-slate-300">{t("footerPhone")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-slate-300">{t("footerEmail")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} {t("footerAcademyName")}. {t("footerCopyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
