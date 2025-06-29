import { homeTranslations } from "./translations/home"
import { aboutTranslations } from "./translations/about"
import { achievementsTranslations } from "./translations/achievements"
import { facilitiesTranslations } from "./translations/facilities"
import { programsTranslations } from "./translations/programs"
import { contactTranslations } from "./translations/contact"
import { registerTranslations } from "./translations/register"
import { navigationTranslations } from "./translations/navigation"
import { commonTranslations } from "./translations/common"
import { footerTranslations } from "./translations/footer"

export const defaultLocale = "en"
export const locales = ["en", "hi"] as const
export type Locale = (typeof locales)[number]

export const translations = {
  en: {
    ...homeTranslations.en,
    ...aboutTranslations.en,
    ...achievementsTranslations.en,
    ...facilitiesTranslations.en,
    ...programsTranslations.en,
    ...contactTranslations.en,
    ...registerTranslations.en,
    ...navigationTranslations.en,
    ...commonTranslations.en,
    ...footerTranslations.en,
  },
  hi: {
    ...homeTranslations.hi,
    ...aboutTranslations.hi,
    ...achievementsTranslations.hi,
    ...facilitiesTranslations.hi,
    ...programsTranslations.hi,
    ...contactTranslations.hi,
    ...registerTranslations.hi,
    ...navigationTranslations.hi,
    ...commonTranslations.hi,
    ...footerTranslations.hi,
  },
} as const

export function getTranslation(locale: Locale, key: keyof typeof translations.en): string | readonly string[] {
  return translations[locale][key] || translations.en[key]
}
