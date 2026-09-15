import type { Metadata } from "next";
import { Outfit, Roboto_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Civicmatch",
  description: "Connecting Citizens to Schemes",
};

import { AuthProvider } from "@/components/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { SplashScreen } from "@/components/SplashScreen";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${robotoMono.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col">
        <SplashScreen>
          <AuthProvider>
            {children}
            <AuthModal />
          </AuthProvider>
        </SplashScreen>
      </body>
    </html>
  );
}
