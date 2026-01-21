import type { Metadata, Viewport } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "ScrumPlan - Sprint Planning Made Simple",
  description:
    "A modern, mobile-responsive web application for Scrum teams to conduct Sprint Planning and manage their Product Backlog.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
      </head>
      <body className="overflow-hidden bg-slate-50">
        <div className="h-screen w-screen overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
