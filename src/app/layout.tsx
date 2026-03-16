import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Kinetic - Drag & Drop App Builder",
  description: "Build AI-powered apps with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
