import { fadeIn, staggerContainer } from "@/components/animations";
import { motion } from "framer-motion";


export const StatSection = () => {
    return (
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
    )
}