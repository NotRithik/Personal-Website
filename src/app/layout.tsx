import type { Metadata } from "next";
import { Inter, Jacquard_12, Jim_Nightshade } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jacquard12 = Jacquard_12({
  weight: "400",
  variable: "--font-jacquard-12",
  subsets: ["latin"],
});

const jimNightshade = Jim_Nightshade({
  weight: "400",
  variable: "--font-jim-nightshade",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rithik Kumar S",
  description: "Proof Of Mind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jacquard12.variable} ${jimNightshade.variable} antialiased h-full w-full`}
      >
        {children}
      </body>
    </html>
  );
}
