'use client';

import Hero from "../features/landingPage/Hero";
import LandingPageScroll from "../features/landingPage/LandingPageScroll";
import AnnouncementBar from "../components/ui/AnnouncementBar";
import Navbar from "../components/ui/Navbar";

export default function Home() {
  return (
    <main>
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <LandingPageScroll />
    </main>
  );
}