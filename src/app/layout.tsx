import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "CashBook - UPI Wallet for Business Expenses",
  description:
    "Join the waitlist for CashBook, the UPI wallet designed for businesses. Simplify your business expenses with our smart expense management solution.",
  keywords: [
    "UPI wallet",
    "business expenses",
    "expense management",
    "fintech",
    "CashBook",
  ],
  openGraph: {
    title: "CashBook - UPI Wallet for Business Expenses",
    description:
      "Join the waitlist for CashBook, the UPI wallet designed for businesses.",
    type: "website",
    siteName: "CashBook",
  },
  twitter: {
    card: "summary_large_image",
    title: "CashBook - UPI Wallet for Business Expenses",
    description:
      "Join the waitlist for CashBook, the UPI wallet designed for businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
