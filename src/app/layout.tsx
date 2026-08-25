// A wrapper file that defines layout elements shared accross webpages
import type { Metadata } from "next";
import { Playfair_Display, Inter, Caveat } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "../components/ui/AnnouncementBar";
import Navbar from "../components/ui/Navbar";

// Configure fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

// Configure Caveat globally to fix the Next.js warning
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Memoir Archive",
  description: "Preserve your life's legacy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased bg-[#FAF8F5] text-[#1D1D1D]">
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}