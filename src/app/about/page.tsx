import Image from "next/image"
import { aboutPageData } from "@/data/about-page"
import { Eye, TargetIcon } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://placehold.co/1200x600/png?text=."
          alt="About Adarsh Defence and Sports Academy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4 max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold">{aboutPageData.hero.title}</h1>
            <p className="text-lg md:text-xl text-gray-200">{aboutPageData.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-background container mx-auto">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">{aboutPageData.welcome.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{aboutPageData.welcome.description}</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-muted/30 container mx-auto">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Adarsh Defence and Sports Academy was established in 2024, a passionate organisation with a vision to
                create a platform where young aspirants can pursue their dreams in defence and sports. Our organisation
                aimed to bridge the gap between talent and opportunity, providing comprehensive training and guidance to
                help students achieve their goals.
              </p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image src="https://placehold.co/400x600/png" alt="Our Story" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-16 bg-background container mx-auto">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Philosophy</h2>

            <div className="space-y-8">
              <div className="bg-muted/30 p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">Identifying and nurturing talent</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We recognize the unique strengths and abilities of each student and provide personalized attention to
                  help them grow.
                </p>
              </div>

              <div className="bg-muted/30 p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">Fostering a culture of excellence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We strive for excellence in everything we do, from training and coaching to academics and character
                  development.
                </p>
              </div>

              <div className="bg-muted/30 p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">Building character and values</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We instil essential life skills, values, and discipline in our students, preparing them for success
                  beyond their chosen fields.
                </p>
              </div>

              <div className="bg-primary/10 p-8 rounded-xl shadow-sm">
                <p className="text-lg font-medium text-center">
                  If you're passionate about defence and sports, and eager to achieve excellence, join us at Adarsh
                  Defence and Sports Academy. Together, let's shape the future of India's defence and sports landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 bg-muted/30 container mx-auto">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <TargetIcon className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">{aboutPageData.sections[0].title}</h3>
              <p className="text-muted-foreground leading-relaxed">{aboutPageData.sections[0].description}</p>
            </div>

            <div className="bg-background p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Eye className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">{aboutPageData.sections[1].title}</h3>
              <p className="text-muted-foreground leading-relaxed">{aboutPageData.sections[1].description}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
