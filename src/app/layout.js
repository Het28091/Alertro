import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Professional CCTV & Security Camera Installation in Vadodara | Alertro",
  description: "Alertro by HP Infotech provides enterprise-grade CCTV, IP, and PTZ camera installation for households, societies, and corporate offices in Vadodara, Gujarat.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Alertro",
  "parentOrganization": {
    "@type": "Organization",
    "name": "HP Infotech"
  },
  "description": "Professional CCTV & Security Camera Installation in Vadodara",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Vadodara",
    "addressRegion": "Gujarat",
    "addressCountry": "IN"
  },
  "areaServed": "Vadodara",
  "telephone": "+91-9999999999",
  "url": "https://www.alertro.com",
  "priceRange": "$$"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener('contextmenu', event => event.preventDefault());`
          }}
        />
        {children}
      </body>
    </html>
  );
}
