import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import SiteEffects from "../components/site/SiteEffects";
import { siteInfo } from "../data/site";
import "./globals.css";

const inter = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-heading", subsets: ["latin"], display: "swap" });

const description =
  "Train for strength, power, speed and agility at Plyobox Performance Gym in Mahayag, Zamboanga del Sur.";

export const metadata: Metadata = {
  title: "Plyobox Performance Gym | Train explosive. Move better.",
  description,
  openGraph: {
    title: "Plyobox Performance Gym",
    description,
    type: "website",
    locale: "en_PH",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0e0b",
  colorScheme: "dark",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: siteInfo.name,
  description,
  ...(siteInfo.phone ? { telephone: siteInfo.phone } : {}),
  ...(siteInfo.hours ? { openingHours: siteInfo.hours } : {}),
  ...(siteInfo.lat !== null && siteInfo.lng !== null ? { geo: {
    "@type": "GeoCoordinates",
    latitude: siteInfo.lat,
    longitude: siteInfo.lng,
  } } : {}),
  address: {
    "@type": "PostalAddress",
    ...(siteInfo.address ? { streetAddress: siteInfo.address } : {}),
    ...(siteInfo.locality ? { addressLocality: siteInfo.locality } : {}),
    ...(siteInfo.region ? { addressRegion: siteInfo.region } : {}),
    ...(siteInfo.country ? { addressCountry: siteInfo.country } : {}),
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${inter.variable} ${spaceGrotesk.variable}`} lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div aria-hidden="true" className="scroll-progress" />
        {children}
        <SiteEffects />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
