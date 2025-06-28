import { Home, Users, Building, BookOpen, Trophy, Phone, UserPlus, Shield } from "lucide-react"

export const navigationData = [
  {
    label: "Home",
    labelKey: "home",
    href: "/",
    icon: Home,
  },
  {
    label: "About us",
    labelKey: "about",
    href: "/about",
    icon: Users,
  },
  {
    label: "Facilities",
    labelKey: "facilities",
    href: "/facilities",
    icon: Building,
    subItems: [
      {
        label: "Facilities",
        labelKey: "facilities",
        href: "/facilities#facilities",
        icon: Building,
        description: "Modern classrooms, sports facilities, and training grounds",
        descriptionKey: "facilitiesDesc",
      },
      {
        label: "Our Infrastructure",
        labelKey: "infrastructureTitle",
        href: "/facilities#infrastructure",
        icon: Shield,
        description: "State-of-the-art infrastructure and equipment",
        descriptionKey: "infrastructureDesc",
      },
      {
        label: "Our Team",
        labelKey: "teamTitle",
        href: "/facilities#team",
        icon: Users,
        description: "Experienced defence experts and sports coaches",
        descriptionKey: "teamDesc",
      },
    ],
  },
  {
    label: "Programs",
    labelKey: "programs",
    href: "/programs",
    icon: BookOpen,
  },
  {
    label: "Achievements",
    labelKey: "achievements",
    href: "/achievements",
    icon: Trophy,
  },
  {
    label: "Contact us",
    labelKey: "contact",
    href: "/contact",
    icon: Phone,
  },
  {
    label: "Register",
    labelKey: "register",
    href: "/register",
    icon: UserPlus,
  },
]
