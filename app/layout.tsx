import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Engida Lishan | Full-stack engineer",
  description: "Portfolio of Engida Lishan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
