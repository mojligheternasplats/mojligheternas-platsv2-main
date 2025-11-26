import type { Metadata } from 'next';
import './globals.css';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';

const siteUrl = 'https://www.mplats.se';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: 'Möjligheternas Plats – Youth Center & Community Hub',
  description:
    'Möjligheternas Plats är en modern fritidsgård och community-plattform där unga kan utvecklas, delta i program, event och internationella projekt.',

  alternates: {
    canonical: siteUrl,
    languages: {
      'sv-SE': siteUrl,
      'en-US': `${siteUrl}/en`,
    },
  },

icons: {
  icon: '/favicon.ico',
  shortcut: '/favicon.ico',
  apple: '/apple-touch-icon.png',
},


  openGraph: {
    title: 'Möjligheternas Plats – Youth Center & Community Hub',
    description:
      'En trygg plats för unga med aktiviteter, program, EU-projekt och evenemang.',
    url: siteUrl,
    siteName: 'Möjligheternas Plats',
    locale: 'sv_SE',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Möjligheternas Plats – Community Hub',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Möjligheternas Plats – Youth Center & Community Hub',
    description:
      'En trygg plats för unga med aktiviteter, program, EU-projekt och evenemang.',
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="font-body antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
