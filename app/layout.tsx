import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Afield & Afloat — Your Hunting & Fishing Journal",
  description:
    "Log every hunt and every catch. Afield for hunters, Afloat for anglers. Sign up to get early access.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
