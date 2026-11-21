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
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mahayag",
    addressRegion: "Zamboanga del Sur",
    addressCountry: "PH",
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
