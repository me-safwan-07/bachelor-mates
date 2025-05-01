import { FadeIn, ScaleIn, SlideIn } from "@/components/animations"
import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const HeroSection = () => {
    return (
        <section className="relative overflow-hidden border-b">
            <div className="absolute inset-0 bg-grid-slate-400/[0.05] bg-[size:20px_20px] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-600/[0.05]" />

            <div className="container relative px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center">
                <SlideIn>
                <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-6 md:mb-8 bg-background/60 backdrop-blur-sm hover-lift">
                    🎓 For Students, By Students
                </div>
                </SlideIn>
                <FadeIn delay={0.2}>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    Your Ultimate Study
                    <span className="block text-primary mt-2 md:mt-3 gradient-hover">Material Platform</span>
                </h1>
                </FadeIn>
                <FadeIn delay={0.4}>
                <p className="mt-4 md:mt-6 max-w-[600px] text-muted-foreground md:text-xl">
                    Access high-quality study materials, notes, and previous year&apos;s question papers to excel in your bachelor&apos;s degree.
                </p>
                </FadeIn>
                <ScaleIn delay={0.6}>
                <div className="mt-6 md:mt-8 flex flex-col gap-3 w-full min-[400px]:w-auto min-[400px]:flex-row justify-center">
                    <Button size="lg" className="gap-2 w-full min-[400px]:w-auto hover-lift gradient-hover">
                    <Link href="/materials" className="flex items-center">
                        Get Started <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                    </Button>
                    <Button size="lg" variant="darkCTA" className="w-full min-[400px]:w-auto hover-lift">
                    <Link href="/premium">View Premium Notes</Link>
                    </Button>
                </div>
                </ScaleIn>
            </div>
            </div>
        </section>
    )
}