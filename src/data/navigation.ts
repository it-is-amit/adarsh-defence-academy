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
    icon: Users
  },
  {
    label: "Facilities",
    labelKey: "facilities",
    href: "/facilities",
    icon: Building,
    subItems: [
      {
        label: "Infrastructure",
        labelKey: "infrastructure",
        href: "/facilities#infrastructure",
        icon: Building,
        description: "Modern facilities for training and education",
        descriptionKey: "infrastructureDesc",
      },
      {
        label: "Equipment",
        labelKey: "equipment",
        href: "/facilities#equipment",
        icon: Shield,
        description: "State-of-the-art sports and training equipment",
        descriptionKey: "equipmentDesc",
      },
      {
        label: "Our Team",
        labelKey: "ourTeam",
        href: "/facilities#team",
        icon: Users,
        description: "Meet our experienced faculty and staff",
        descriptionKey: "ourTeamDesc",
      },
    ],
  },
  {
    label: "Programs",
    labelKey: "programs",
    href: "/programs",
    icon: BookOpen,
    subItems: [
      {
        label: "Defence Training",
        labelKey: "defenceTraining",
        href: "/programs#defence",
        icon: Shield,
        description: "NDA, CDA and SSB preparation programs",
        descriptionKey: "defenceTrainingDesc",
      },
      {
        label: "Sports Coaching",
        labelKey: "sportsCoaching",
        href: "/programs#sports",
        icon: Trophy,
        description: "Professional coaching in multiple sports",
        descriptionKey: "sportsCoachingDesc",
      },
    ],
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
