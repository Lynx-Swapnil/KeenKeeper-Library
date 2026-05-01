import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "animate.css";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KeenKeeper Library",
  description: "A modern digital library for exploring, filtering, and borrowing books online.",
};

export const viewport = "width=device-width, initial-scale=1.0, maximum-scale=5.0";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_34%),linear-gradient(180deg,#fffaf5_0%,#fffdfb_42%,#fff7ed_100%)] text-slate-900 overflow-x-hidden">
        <SiteHeader />
        <main className="flex-1 w-full">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
