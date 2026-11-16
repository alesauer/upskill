import type { Metadata } from "next";
import { Young_Serif, Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-young-serif",
  display: "swap",
});

const nunito = Nunito({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-museo-fallback",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Universo Narrado | Física e matemática pra tornar você mais inteligente",
    template: "%s | Universo Narrado",
  },
  description:
    "Física e matemática ensinadas pelo porquê. Cursos do zero absoluto ao Cálculo do ITA e IME: Desvendando a Matemática, Lições de Matemática, Lições de Física e Lições de Cálculo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${youngSerif.variable} ${nunito.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#ffffff] text-[#1c3752] antialiased">
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo principal
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

