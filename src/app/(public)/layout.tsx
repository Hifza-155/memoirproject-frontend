// src/app/(public)/layout.tsx
import AnnouncementBar from "../../components/ui/AnnouncementBar";
import Navbar from "../../components/ui/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>{children}</main>
    </>
  );
}