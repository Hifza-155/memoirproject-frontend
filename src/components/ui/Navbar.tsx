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
          Plans
        </li>
        <li>
          Our Story
        </li>
        <li>
          FAQs
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