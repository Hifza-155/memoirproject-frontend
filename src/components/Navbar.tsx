/**
 * @file Navbar.tsx
 * @description Component rendering the site navigation bar.
 */

import Logo from "./Logo";
import Link from "next/link";

interface NavbarProps {
  onOurStoryClick?: () => void;
}

export default function Navbar({ onOurStoryClick }: NavbarProps) {
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
          <Link
            href="/pricing"
            className="hover:text-memory-muted transition"
          >
            Plans
          </Link>
        </li>

        <li>
          <button
            type="button"
            onClick={onOurStoryClick}
            className="hover:text-memory-muted transition cursor-pointer"
          >
            Our Story
          </button>
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