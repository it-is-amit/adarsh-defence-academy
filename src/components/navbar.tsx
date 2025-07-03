"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { navigationData } from "@/data/navigation"
import ThemeToggle from "@/components/theme-toggle"
import LanguageToggle from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <nav className="sticky top-0 z-50 w-full border-b backdrop-blur bg-muted/40">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/assets/logo.png" alt="Logo" width={32} height={48} />
          <div className="hidden sm:block">
            <div className="text-sm font-bold">{t("adarshDefence")}</div>
            <div className="text-xs text-muted-foreground">{t("academyJodhpur")}</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationData.map((item) => (
                <NavigationMenuItem key={item.href}>
                  {item.subItems ? (
                    <>
                      <NavigationMenuTrigger className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {t(item.labelKey)}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="flex items-center gap-2">
                                    <subItem.icon className="h-4 w-4" />
                                    <div className="text-sm font-medium leading-none">{t(subItem.labelKey)}</div>
                                  </div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {t(subItem.descriptionKey)}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link 
                        href={item.href}
                        className="group flex flex-row h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      >
                        <item.icon className="mr-1 h-4 w-4" />
                        {t(item.labelKey)}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <LanguageToggle />
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-2 lg:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] p-0 bg-background border-l border-border rounded-l-2xl shadow-2xl"
            >
              <div className="flex flex-col space-y-4 mt-8 px-4 pb-6">
                {navigationData.map((item) => (
                  <div key={item.href} className="">
                    {item.subItems ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 font-semibold text-foreground px-2 py-2 rounded-lg bg-muted/60">
                          <item.icon className="h-5 w-5 text-primary" />
                          <span>{t(item.labelKey)}</span>
                        </div>
                        <div className="ml-6 mt-1 space-y-1 border-l-2 border-muted pl-3">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-2 py-2 rounded-md hover:bg-accent/60"
                              onClick={() => setIsOpen(false)}
                            >
                              <subItem.icon className="h-4 w-4 text-primary" />
                              {t(subItem.labelKey)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors px-2 py-2 rounded-lg hover:bg-accent/60"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-5 w-5 text-primary" />
                        {t(item.labelKey)}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
