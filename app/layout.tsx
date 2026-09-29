import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neil Justin Marcelo | Full-Stack Web Developer",
  description:
    "Portfolio of Neil Justin Marcelo, Computer Science student and aspiring Full-Stack Web Developer building practical, scalable, user-focused web applications.",
  openGraph: {
    title: "Neil Justin Marcelo | Full-Stack Web Developer",
    description:
      "Computer Science student and aspiring Full-Stack Web Developer open to internships, OJT, and entry-level opportunities.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full overflow-x-clip antialiased`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');var d=document.documentElement;d.classList.remove('dark','light');d.classList.add(t==='light'?'light':'dark');}catch(e){}})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
