export const metadata = {
  title: "تحديد موعد · Ibsar Center",
  description: "Book an appointment at Ibsar Center · Ophthalmology Group, Blida.",
};

/**
 * Booking layout — intentionally a passthrough.
 * The main site Navbar / SmoothScroll / CustomCursor / ScrollProgress are
 * skipped here via SiteShell in app/layout.jsx (which checks pathname).
 * The page renders its own slim header inside BookingWizard.
 */
export default function BookingLayout({ children }) {
  return children;
}
