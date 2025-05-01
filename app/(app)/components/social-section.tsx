import { fadeIn, FadeIn, staggerContainer } from "@/components/animations";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";


export const SocialProofSection = () => {
    return (
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
    )
}