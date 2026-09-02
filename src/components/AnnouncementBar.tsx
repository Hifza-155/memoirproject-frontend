/**
 * @file AnnouncementBar.tsx
 * @description Component rendering the top site-wide announcement bar,
 */

export default function AnnouncementBar() {
  return (
    <div className="bg-memory-maroon text-memory-bg text-sm md:text-base font-medium text-center py-2.5 px-4 tracking-[0.3px]">
      Unlimited audio stories + A living comment layer to keep memories alive :
      {" "}
      Just $3 / month
    </div>
  );
}