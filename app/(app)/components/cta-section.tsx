import { FadeIn } from "@/components/animations"
import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const CTASection = () => {
    return (
        <section className="border-t">
            <div className="container py-20">
                <FadeIn>
                    <div className="relative overflow-hidden rounded-3xl gradient-primary px-6 py-20 text-primary-foreground hover-glow ">
                        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                        <div className="relative mx-auto max-w-2xl text-center dark:text-white text-black">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Ready to Transform Your Academic Journey?
                            </h2>
                            <p className="mt-4 text-lg opacity-90">
                                Join thousands of students who are already benefiting from our comprehensive study resources.
                            </p>
                            <div className="mt-8 flex flex-col gap-4 min-[400px]:flex-row justify-center ">
                                <Button size="lg" className="gap-1 flex flex-row">
                                    <Link href="/notes" className="flex gap-2">
                                        Get Started Now <ArrowRight className="h-4 w-4 mt-1" />
                                    </Link>
                                </Button>
                                <Button size="lg" >
                                    <Link href="/notes">Browse Materials</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
      </section>
    )
}