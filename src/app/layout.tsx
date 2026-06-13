import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/shared/navbar/page";
import Footer from "@/components/shared/footer/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LUXE STORE",
  description: "Premium modern ecommerce experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}