import { Geist, Geist_Mono } from "next/font/google";
import PageLoader from "../components/Loader";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://portfolio.digitalpaaji.com'),
  title: {
    default: "Digital Paaji | Full Stack Developer & Creative Technologist Portfolio",
    template: "%s | Digital Paaji"
  },
  description: "Explore the portfolio of Digital Paaji — showcasing high-impact full-stack web applications, immersive UI/UX design, generative AI videos, and creative motion graphics built with Next.js, React, GSAP, and Tailwind CSS.",
  keywords: [
    "Digital Paaji",
    "Full Stack Developer",
    "Web Development Portfolio",
    "Next.js Developer",
    "React Developer",
    "UI/UX Design",
    "Generative AI Videos",
    "Motion Graphics",
    "GSAP Animation",
    "Tailwind CSS"
  ],
  authors: [{ name: "Digital Paaji" }],
  creator: "Digital Paaji",
  publisher: "Digital Paaji",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.digitalpaaji.com",
    title: "Digital Paaji | Full Stack Developer & Creative Technologist Portfolio",
    description: "Immersive web experiences, generative motion, and high-end full-stack applications.",
    siteName: "Digital Paaji Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Make sure to place an og-image.jpg file in your public folder
        width: 1200,
        height: 630,
        alt: "Digital Paaji Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Paaji | Full Stack Developer & Creative Technologist Portfolio",
    description: "Immersive web experiences, generative motion, and high-end full-stack applications.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Full screen Grainient loader that slides up on load */}
        <PageLoader />
        <CustomCursor />
  
        {children}

      </body>
    </html>
  );
}