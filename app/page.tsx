"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Search, Shield, Zap, ArrowRight, BookMarked, Download, Star } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, FadeIn, SlideIn, ScaleIn } from "@/components/animations";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Gradient and Pattern */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-grid-slate-400/[0.05] bg-[size:20px_20px] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-600/[0.05]" />
        <div className="container relative">
          <div className="flex flex-col items-center justify-center px-4 py-20 md:py-32 text-center">
            <SlideIn>
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium mb-8 bg-background/60 backdrop-blur-sm hover-lift">
                🎓 For Students, By Students
              </div>
            </SlideIn>
            <FadeIn delay={0.2}>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Your Ultimate Study
                <span className="block text-primary gradient-hover">Material Platform</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="mt-6 max-w-[600px] text-muted-foreground md:text-xl">
                Access high-quality study materials, notes, and previous year&apos;s question papers to excel in your bachelor&apos;s degree.
              </p>
            </FadeIn>
            <ScaleIn delay={0.6}>
              <div className="mt-8 flex flex-col gap-4 min-[400px]:flex-row justify-center">
                <Button size="lg" className="gap-2 hover-lift gradient-hover" asChild>
                  <Link href="/materials">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="hover-lift" asChild>
                  <Link href="/premium">View Premium Notes</Link>
                </Button>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Features Grid */}
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

      {/* Stats Section */}
      <section className="border-y bg-primary/5">
        <div className="container py-20">
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { number: "50K+", label: "Active Students" },
              { number: "100K+", label: "Downloads" },
              { number: "10K+", label: "Study Materials" },
              { number: "4.9/5", label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="text-center hover-lift"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold tracking-tight text-primary">{stat.number}</div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container py-20">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Trusted by Students from Top Universities
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Join thousands of students who are already excelling with Bachelor-Mate
            </p>
          </div>
        </FadeIn>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-3 py-4"
        >
          {[
            {
              quote: "Bachelor-Mate helped me score top grades in my exams. The premium notes are worth every penny!",
              author: "Sarah Johnson",
              role: "Computer Science Student",
              rating: 5,
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            },
            {
              quote: "The best platform for finding quality study materials. Saved me countless hours of note-taking.",
              author: "Michael Chen",
              role: "Engineering Student",
              rating: 5,
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
            },
            {
              quote: "Incredible resource for exam preparation. The previous year papers were exactly what I needed.",
              author: "Priya Sharma",
              role: "Economics Student",
              rating: 5,
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="feature-card p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating).fill(null).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">{testimonial.quote}</p>
              <div className="mt-6 flex items-center gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
                  width={300}
                  height={300}
                />
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="border-t">
        <div className="container py-20">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl gradient-primary px-6 py-20 text-primary-foreground hover-glow">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
              <div className="relative mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Academic Journey?
                </h2>
                <p className="mt-4 text-lg opacity-90">
                  Join thousands of students who are already benefiting from our comprehensive study resources.
                </p>
                <div className="mt-8 flex flex-col gap-4 min-[400px]:flex-row justify-center">
                  <Button size="lg" variant="secondary" className="gap-2 hover-lift" asChild>
                    <Link href="/register">
                      Get Started Now <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 hover-lift" asChild>
                    <Link href="/materials">Browse Materials</Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}