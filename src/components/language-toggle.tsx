"use client"

import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-10 h-10 bg-accent hover:bg-accent/80 hover:scale-105 border border-primary/40 transition-all"
          aria-label="Toggle language"
        >
          <Languages className="h-5 w-5 text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale("en")} className={locale === "en" ? "bg-primary/10" : ""}>
          <span className="mr-2">🇺🇸</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("hi")} className={locale === "hi" ? "bg-primary/10" : ""}>
          <span className="mr-2">🇮🇳</span>
          हिंदी
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
