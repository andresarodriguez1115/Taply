import './globals.css';
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google"
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Taply",
  description: "Taply profile",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&family=Poppins&family=Playfair+Display&family=DM+Sans&display=swap" rel="stylesheet" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}