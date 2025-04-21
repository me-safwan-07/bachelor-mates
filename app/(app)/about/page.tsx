import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Award, Lightbulb, Target, Heart } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-12">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About Bachelor-Mate</h1>
          <p className="max-w-[700px] text-muted-foreground text-lg">
            We&apos;re on a mission to make high-quality study materials accessible to all bachelor&apos;s students.
          </p>
        </section>

        {/* Our Story */}
        <section className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
          <div>
            <Image
              alt="Students studying together"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
              height="310"
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
              width="550"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
            <p className="text-muted-foreground">
              Bachelor-Mate was founded in 2023 by a group of university graduates who experienced firsthand the challenges of finding quality study materials during their academic journey.
            </p>
            <p className="text-muted-foreground">
              What started as a small collection of notes shared among friends has grown into a comprehensive platform serving thousands of students across multiple disciplines. Our team is dedicated to curating, creating, and delivering the best study resources to help students excel in their bachelor&apos;s degrees.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="flex flex-col space-y-4 items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
          <p className="max-w-[700px] text-muted-foreground text-lg">
            To democratize access to high-quality educational resources and empower students to achieve academic excellence.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card>
              <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                <Target className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Accessibility</h3>
                <p className="text-muted-foreground">
                  Making quality study materials available to all students regardless of financial constraints.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                <Award className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Quality</h3>
                <p className="text-muted-foreground">
                  Ensuring all materials meet high standards of accuracy, clarity, and educational value.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                <Lightbulb className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Innovation</h3>
                <p className="text-muted-foreground">
                  Continuously improving our platform to better serve the evolving needs of students.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="flex flex-col space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Meet Our Team</h2>
            <p className="mt-2 text-muted-foreground">
              The passionate individuals behind Bachelor-Mate
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Alex Johnson",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
                bio: "Former Computer Science TA with a passion for education technology.",
              },
              {
                name: "Sarah Chen",
                role: "Content Director",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
                bio: "PhD in Education with 8+ years of experience in curriculum development.",
              },
              {
                name: "Michael Rodriguez",
                role: "Tech Lead",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
                bio: "Full-stack developer with a background in educational platforms.",
              },
              {
                name: "Priya Sharma",
                role: "Community Manager",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
                bio: "Former student ambassador with a degree in Communications.",
              },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <Image
                  alt={member.name}
                  className="rounded-full object-cover mb-4"
                  height="120"
                  src={member.image}
                  style={{
                    aspectRatio: "120/120",
                    objectFit: "cover",
                  }}
                  width="120"
                />
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Join Us Section */}
        <section className="bg-muted rounded-xl p-8 text-center">
          <div className="flex flex-col items-center space-y-4 max-w-[700px] mx-auto">
            <Heart className="h-12 w-12 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight">Join Our Community</h2>
            <p className="text-muted-foreground text-lg">
              Become part of the Bachelor-Mate community and help us make quality education accessible to all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg"   >
                <Link href="/register">Sign Up Now</Link>
              </Button>
              <Button   size="lg"   >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}