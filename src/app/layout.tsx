import { Suspense } from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from '@/components/Layout/ThemeProvider';
import AppContextProvider from '@/context/AppContext';
import "@/styles/globals.scss";
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import SmoothScrollProvider from "@/components/Layout/SmoothScrollProvider";
import { AccessibilityProvider, AccessibilityWidget } from "@/modules/accessibility";
import "lenis/dist/lenis.css";

import { getMenuData } from "@/lib/getMenuData";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});


export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: "Jindal Projects",
  description: "Jindal Projects is a leading group of projects, offering high-quality development, engineering, and infrastructure solutions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { headerMenu, footerMenu } = await getMenuData();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${poppins.variable}`}
        suppressHydrationWarning={true}
      >
        <Suspense fallback={null}>
          <AccessibilityProvider>
            <AppContextProvider initialHeaderMenu={headerMenu} initialFooterMenu={footerMenu}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <SmoothScrollProvider>
                  <Header />
                  <main>
                    {children}
                  </main>
                  <Footer />
                  <AccessibilityWidget />
                </SmoothScrollProvider>
              </ThemeProvider>
            </AppContextProvider>
          </AccessibilityProvider>
        </Suspense>
      </body>
    </html>
  );
}
