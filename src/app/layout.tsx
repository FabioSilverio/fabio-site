import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "fabio",
    template: "%s | fabio",
  },
  description:
    "Site autoral com transições suaves, tipografia marcante e navegação cinematográfica para Fabio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${sans.variable} ${serif.variable}`}>
        <div className="page-orb page-orb-left" aria-hidden="true" />
        <div className="page-orb page-orb-right" aria-hidden="true" />
        <SiteNav />
        <main className="site-shell">{children}</main>
        <footer className="site-footer">
          <p>fabio</p>
          <p>site em Next.js com navegação suave e deploy pronto para Vercel.</p>
        </footer>
      </body>
    </html>
  );
}
