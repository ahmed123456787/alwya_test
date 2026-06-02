"use client";

import { usePathname } from "next/navigation";
import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "./ScrollProgress";
import AmbientField from "./AmbientField";
import ScrollSpine from "./ScrollSpine";

/**
 * SiteShell renders the heavy landing-page chrome (Navbar, smooth scroll,
 * custom cursor, scroll-progress bar) only on routes that want it.
 *
 * The /booking flow has its own slim header — so we skip everything here for
 * any route under /booking to avoid the double-header collision and to keep
 * the booking page lightweight (no Lenis, no cursor follower, no scroll bar).
 */
export default function SiteShell({ children }) {
  const pathname = usePathname() || "/";
  const isBooking = pathname.startsWith("/booking");

  return (
    <>
      {!isBooking && (
        <>
          {/* Ambient atmosphere — single page-wide aurora that morphs as you
              scroll. This is the THROUGH-LINE that ties section cuts together. */}
          <AmbientField />
          <SmoothScroll />
          <ScrollProgress />
          <ScrollSpine />
          <CustomCursor />
          <Navbar />
        </>
      )}
      {children}
    </>
  );
}
