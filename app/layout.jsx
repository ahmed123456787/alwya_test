import "./globals.css";
import SiteShell from "./components/SiteShell";
import { LanguageProvider } from "./components/LanguageProvider";

export const metadata = {
  title: "Ibsar Center — Ophthalmology Group | مركز الإبصار",
  description:
    "Specialized ophthalmology clinic in Blida — Ibsar Center · Ophthalmology Group. SMILE PRO, LASIK, cataract, keratoconus, glaucoma, pediatric eye care, and the latest smart-lens technology.",
  keywords: [
    "ophthalmology",
    "Ibsar Center",
    "Centre Ibsar",
    "SMILE PRO",
    "LASIK",
    "cataract surgery",
    "Blida",
    "Algeria",
    "eye clinic",
    "مركز الإبصار",
    "البليدة",
  ],
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@300;400;500;600;700&family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise antialiased">
        <LanguageProvider>
          <SiteShell>{children}</SiteShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
