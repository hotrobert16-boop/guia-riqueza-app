import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Guia da Riqueza - Transforme Sua Vida Financeira",
  description: "Descubra os segredos dos milionários e construa sua riqueza com estratégias comprovadas. Mais de 50.000 pessoas já transformaram suas vidas financeiras conosco.",
  keywords: "investimentos, riqueza, educação financeira, milionário, estratégias de investimento",
  authors: [{ name: "Guia da Riqueza" }],
  openGraph: {
    title: "Guia da Riqueza - Transforme Sua Vida Financeira",
    description: "Descubra os segredos dos milionários e construa sua riqueza com estratégias comprovadas.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guia da Riqueza - Transforme Sua Vida Financeira",
    description: "Descubra os segredos dos milionários e construa sua riqueza com estratégias comprovadas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right" 
            richColors 
            theme="dark"
            toastOptions={{
              style: {
                background: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}