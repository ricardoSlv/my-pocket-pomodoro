import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const digital7 = localFont({
  src: [
    {
      path: "../../public/fonts/digital-7 (mono).ttf",
      weight: "400",
    },
  ],
  variable: "--font-digital-7",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Pocket Pomodoro",
  description: "Minimal time and task managing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${digital7.variable} antialiased bg-[url('/background.avif')] bg-cover bg-no-repeat bg-center bg-fixed
`}
      >
        {children}
      </body>
    </html>
  );
}
