import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SidebarLayout from "@/components/SidebarLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webutilities-xi.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: "Free Web Tools Converter & Utilities Online | WebToolKit",
  description: "WebToolKit is your all-in-one free web tools converter. Compress and convert images, merge PDFs, and transform developer formats securely in your browser.",
  keywords: "web tools converter, image converter, free online tools, pdf merger, image compressor, format converter, browser tools, privacy first tools, web toolkit",
  verification: {
    google: "tj4MPVmQ3ejeVkczAiLf-9SrBrj25XFO1vyepAG_Jek",
  },
  other: {
    "msvalidate.01": "7D83AFF11C3029CB762E579A6793EC2C",
  },
  openGraph: {
    title: "Free Web Tools Converter & Utilities Online | WebToolKit",
    description: "WebToolKit is your all-in-one free web tools converter. Compress and convert images, merge PDFs, and transform developer formats securely in your browser.",
    url: "https://webutilities-xi.vercel.app",
    siteName: "WebToolKit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Web Tools Converter & Utilities Online | WebToolKit",
    description: "WebToolKit is your all-in-one free web tools converter. 100% privacy-first and client-side.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <meta name="msvalidate.01" content="7D83AFF11C3029CB762E579A6793EC2C" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "WebToolKit",
              url: "https://webutilities-xi.vercel.app",
              description: "Free web tools converter, image compressor, PDF merger, and developer format utilities running locally in your browser.",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 relative">
        {/* Global Background Decor */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-60"></div>
        <div className="fixed top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-400/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="fixed top-[-5%] right-[-5%] w-[600px] h-[600px] bg-fuchsia-400/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="fixed bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-blue-400/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <SidebarLayout>
          {children}
        </SidebarLayout>
      </body>
    </html>
  );
}
