import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RadialCursor from '@/components/cursor/RadialCursor';

const inter = Inter({ subsets: ['latin'] });

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
}

// Metadata configuration
export const metadata: Metadata = {
  title: 'Joshua - Software Engineer',
  description: 'Passionate software engineer specializing in full-stack development, creating digital experiences and solving complex problems through code.',
  keywords: 'software engineer, full-stack developer, web development, TypeScript, React, Next.js',
  authors: [{ name: 'Joshua' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Joshua - Software Engineer',
    description: 'Passionate software engineer specializing in full-stack development',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joshua - Software Engineer',
    description: 'Passionate software engineer specializing in full-stack development',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <RadialCursor />
      </body>
    </html>
  );
}