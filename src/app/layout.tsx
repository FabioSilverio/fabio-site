import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="pt-BR">
        <body className={sans.variable}>
          <main>{children}</main>
          <footer className="site-footer">
            <p>All Rights Reserved.</p>
          </footer>
        </body>
      </html>
    </ViewTransitions>
  );
}
