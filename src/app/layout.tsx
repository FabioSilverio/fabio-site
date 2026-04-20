import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { getSiteConfig } from "@/lib/cms";
import "./globals.css";

const sans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "fabio",
    template: "%s | fabio",
  },
  description:
    "Site escuro com logo central, navegação suave e transições inspiradas na referência enviada para Fabio.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();

  return (
    <ViewTransitions>
      <html lang="pt-BR">
        <body className={sans.variable}>
          <main>{children}</main>
          <footer className="site-footer">
            <p>{siteConfig.footerText}</p>
          </footer>
        </body>
      </html>
    </ViewTransitions>
  );
}
