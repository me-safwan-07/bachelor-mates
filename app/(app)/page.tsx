"use client";

import { HeroSection } from "./components/HeroSection";
import { StatSection } from "./components/stat-section";
import { FeaturesSection } from "./components/features-section";
import { SocialProofSection } from "./components/social-section";
import { CTASection } from "./components/cta-section";
// const staggerContainer = {
//   initial: {},
//   animate: {
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

// const fadeIn = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: 20 }
// };


export default function Home() {

  
  return (
    <div className="flex flex-col">
      {/* Hero Section with Gradient and Pattern */}
      <HeroSection />

      {/* Features Grid */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatSection />

      {/* Social Proof */}
      <SocialProofSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}