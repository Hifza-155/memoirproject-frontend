/**
 * @file Navbar.tsx
 * @description Component rendering the site navigation bar,
 */

import Logo from "./Logo";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 md:px-16 py-2 bg-memory-bg border-b border-memory-border">
      <Logo />

      <ul className="flex items-center gap-8 text-sm md:text-base font-medium text-memory-primary tracking-[0.2px]">
        <li>
          <Link href="/" className="hover:text-memory-muted transition">
            Home
          </Link>
        </li>

        <li>
          <Link href="/plans" className="hover:text-memory-muted transition">
            Plans
          </Link>
        </li>

        <li>
          <Link
            href="/#our-story"
            className="hover:text-memory-muted transition"
          >
            Our Story
          </Link>
        </li>

        <li>
          <Link
            href="/#faqs"
            className="hover:text-memory-muted transition"
          >
            FAQs
          </Link>
        </li>

        <li>
          <Link href="/login" className="hover:text-memory-muted transition">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}