import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import PageLoadShutter from "@/components/PageLoadShutter";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { getAppConfig } from "@/lib/appConfig";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vipprow Academy — Where Futures Are Built",
  description:
    "Master in-demand digital marketing skills with India's most immersive learning experience. Real projects, elite mentors, guaranteed placement assistance.",
  keywords: [
    "coding bootcamp",
    "tech education",
    "full stack",
    "data science",
    "placement guarantee",
    "India",
  ],
  openGraph: {
    title: "Vipprow Digital Marketing Academy",
    description: "Where Futures Are Built.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appConfig = await getAppConfig();

  return (
    <html lang="en" className={`${bricolage.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background">
        <PageLoadShutter />

        <Providers>
          <Navbar />
          {children}
          <Footer appConfig={appConfig} />
        </Providers>
      </body>
    </html>
  );
}
