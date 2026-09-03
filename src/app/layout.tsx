import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Mars IT School - Noutbuk Tracker",
  description: "Mars IT School o'quvchilariga berilgan noutbuklarni nazorat qilish va monitoring tizimi",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className="antialiased min-h-screen bg-[#f4f7fb] text-slate-900 selection:bg-sky-500 selection:text-white">
        <Toaster position="top-right" richColors theme="light" />
        {children}
      </body>
    </html>
  );
}
