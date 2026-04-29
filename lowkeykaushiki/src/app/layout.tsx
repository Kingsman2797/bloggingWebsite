import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "lowkeykaushiki",
  description: "Personal essays, notes, and quiet internet corners by Kaushiki.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
