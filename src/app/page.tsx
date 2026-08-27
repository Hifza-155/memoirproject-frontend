'use client';

import React, { useState, useEffect } from "react";
import Hero from "../features/landingPage/Hero";
import LandingPageScroll from "../features/landingPage/LandingPageScroll";
import OwnerDashboard from "../features/dashboard/OwnerDashboard";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Lazily check local storage for session and active memoir
  const [token] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  });

  const [activeMemoir] = useState(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("active_memoir");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // Prevent server/client hydration mismatch by showing a loading state initially
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50/20 text-amber-900 font-serif">
        Loading Memoir...
      </div>
    );
  }

  // 1. If the user is logged in and has an active memoir, show their Owner Dashboard
  if (token && activeMemoir) {
    return <OwnerDashboard />;
  }

  // 2. Otherwise, show your original public landing page & onboarding flow
  return (
    <main>
      <Hero />
      <LandingPageScroll />
    </main>
  );
}