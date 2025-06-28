"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Locale, defaultLocale, translations } from "@/lib/i18n"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale
    if (savedLocale && ["en", "hi"].includes(savedLocale)) {
      setLocale(savedLocale)
    }
  }, [])

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem("locale", newLocale)
  }

  const t = (key: string): string => {
    return (
      translations[locale]?.[key as keyof typeof translations.en] ||
      translations.en[key as keyof typeof translations.en] ||
      key
    )
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
