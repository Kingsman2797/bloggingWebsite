import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var key='lowkeykaushiki-theme';var saved=localStorage.getItem(key);var theme=saved||(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=theme;document.documentElement.classList.toggle('dark',theme==='dark');}catch(e){document.documentElement.dataset.theme='light';document.documentElement.classList.remove('dark');}})();`,
          }}
        />
      </head>
      <body className="min-h-full">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
