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
  title: "Free Web Tools Converter & Utilities Online | WebToolKit",
  description: "WebToolKit is your all-in-one free web tools converter. Compress and convert images, merge PDFs, and transform developer formats securely in your browser.",
  keywords: "web tools converter, image converter, free online tools, pdf merger, image compressor, format converter, browser tools, privacy first tools, web toolkit",
  verification: {
    google: "VpUWZ3f6QsX19nLHd0bM-YV10c4DS9me28PjFxlMPe8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
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
