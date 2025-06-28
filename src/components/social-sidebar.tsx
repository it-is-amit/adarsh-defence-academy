"use client"

import { Instagram, MessageCircle, Facebook, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  { icon: Instagram, href: "#", color: "bg-gradient-to-br from-purple-600 to-pink-500" },
  { icon: MessageCircle, href: "#", color: "bg-green-500" },
  { icon: Facebook, href: "#", color: "bg-blue-600" },
  { icon: Send, href: "#", color: "bg-blue-400" },
]

export default function SocialSidebar() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
      {socialLinks.map((social, index) => (
        <Button
          key={index}
          size="icon"
          className={`h-12 w-12 rounded-full ${social.color} hover:scale-110 transition-transform duration-200 shadow-lg`}
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
