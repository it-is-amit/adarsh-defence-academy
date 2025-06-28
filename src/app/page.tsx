import HeroCarousel from "@/components/hero-carousel"
import AboutSection from "@/components/about-section"
import ValuesSection from "@/components/values-section"
import ImageGallery from "@/components/image-gallery"
import HomeContactSection from "@/components/home-contact-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroCarousel />
      <AboutSection />
      <ValuesSection />
      <ImageGallery />
      <HomeContactSection />
    </main>
  )
}
