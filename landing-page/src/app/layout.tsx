import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import PageLoadShutter from "@/components/PageLoadShutter";
import LazyMetaPixel from "@/components/LazyMetaPixel";
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
      <head>
        {/* Google Tag Manager — beforeInteractive so it's in the initial
            server-rendered <head>, exactly where GTM expects it, and fires
            before hydration instead of being injected afterwards. */}
        {/* <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5KKSMN7L');`}
        </Script> */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NJKTX87Z');`}
        </Script>

        {/* Meta Pixel — loads lazily on first interaction (or after 5s idle) */}
        <LazyMetaPixel />
      </head>
      <body className="min-h-full flex flex-col bg-background">
        {/* Google Tag Manager (noscript) — must be right after <body> opens */}
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5KKSMN7L"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NJKTX87Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Meta Pixel (noscript) — the script itself loads lazily via LazyMetaPixel */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=1118179970941898&ev=PageView&noscript=1"
          />
        </noscript>

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
