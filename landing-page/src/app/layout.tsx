import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import PageLoadShutter from "@/components/PageLoadShutter";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vipprow Academy — Where Futures Are Built",
  description:
    "Master in-demand tech skills with India's most immersive learning experience. Real projects, elite mentors, guaranteed placement.",
  keywords: [
    "coding bootcamp",
    "tech education",
    "full stack",
    "data science",
    "placement guarantee",
    "India",
  ],
  openGraph: {
    title: "Vipprow Academy",
    description: "Where Futures Are Built.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${inter.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
