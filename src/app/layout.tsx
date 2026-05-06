import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Serif_KR } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Providers from "@/components/Providers";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import AmbientBackground from "@/components/AmbientBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Lunel | 향기로 기억되는 순간",
  description: "하이엔드 향수 쇼케이스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${playfair.variable} ${notoSerifKR.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <AmbientBackground />
          <div className="fixed top-8 left-6 md:left-12 z-[100] pointer-events-auto">
            <div className="relative w-24 md:w-32 h-8 md:h-10">
              <Image 
                src="/images/logo.png" 
                alt="Lunel Logo" 
                fill 
                className="object-contain object-left"
              />
            </div>
          </div>
          <LanguageSwitcher />
          {children}
        </Providers>
      </body>
    </html>
  );
}
