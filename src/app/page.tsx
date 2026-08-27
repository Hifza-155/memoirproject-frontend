'use client';

import Hero from "../features/landingPage/Hero";
import LandingPageScroll from "../features/landingPage/LandingPageScroll";
import OwnerDashboard from "../features/dashboard/OwnerDashboard";

export default function Home() {
  return (
    <main>
      <Hero />
      <LandingPageScroll />
      <OwnerDashboard />
    </main>
  );
}