import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import ContextProvider from "./context-provider";

const Libre = Libre_Franklin({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-libre-franklin",
});

export const metadata: Metadata = {
  title: "Inkredible",
  description: "Everyone favourite drip clothing store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={Libre.className}>
        <ContextProvider>
          <Header />
          {children}
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
}

