import { fadeIn, FadeIn, staggerContainer } from "@/components/animations"
import { motion } from "framer-motion";
import { BookMarked, Download, FileText, Search, Shield, Zap } from "lucide-react";

export const FeaturesSection = () => {
    return (
        <section className="container py-20">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need to Excel
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Comprehensive tools and resources designed for academic success
            </p>
          </div>
        </FadeIn>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4"
        >
          {[
            {
              title: "Free Study Materials",
              description: "Access a vast library of free notes and question papers",
              icon: FileText,
            },
            {
              title: "Premium Handwritten Notes",
              description: "High-quality, detailed notes from top students",
              icon: BookMarked,
            },
            {
              title: "Smart Search",
              description: "Find exactly what you need with powerful filters",
              icon: Search,
            },
            {
              title: "Secure Platform",
              description: "Your data and payments are always protected",
              icon: Shield,
            },
            {
              title: "Fast Downloads",
              description: "Instant access to all your study materials",
              icon: Download,
            },
            {
              title: "Smart Recommendations",
              description: "Personalized content based on your interests",
              icon: Zap,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg p-3 bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="mt-4 text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    )
}