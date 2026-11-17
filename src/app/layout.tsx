import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI automation agency",
  description: "We help businesses streamline their processes with AI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
