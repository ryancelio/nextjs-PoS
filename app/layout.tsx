import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./ui/navbar";
import { Providers } from "./providers";
import VerticalNavbar from "./ui/verticalNavbar/verticalNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Célio Móveis",
  description: "Ponto de Venda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="text-foreground bg-background">
      <body className={`${inter.className} antialiased min-h-fit`}>
        <Providers>
          <div className="flex transition-colors">
            <VerticalNavbar />
            <div className="w-full">
            {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
