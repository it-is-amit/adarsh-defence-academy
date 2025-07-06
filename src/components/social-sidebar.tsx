"use client"

import { Instagram, Facebook, Youtube, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/adsa_jodhpur/", color: "bg-gradient-to-br from-purple-600 to-pink-500" },
  { icon: Phone, href: "tel:+916376784539", color: "bg-green-500" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61572417500871&ref=_ig_profile_ac", color: "bg-blue-600" },
  { icon: Youtube, href: "https://www.youtube.com/@ADSA_lalsagar", color: "bg-red-500" },
]

export default function SocialSidebar() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
      {socialLinks.map((social, index) => (
        <Button
          key={index}
          size="icon"
          className={`h-12 w-12 rounded-full ${social.color} hover:scale-110 transition-all duration-200 shadow-lg`}
          asChild
        >
          <a href={social.href} target="_blank" rel="noopener noreferrer">
            <social.icon className="h-5 w-5 text-white" />
          </a>
        </Button>
      ))}
    </div>
  )
}
