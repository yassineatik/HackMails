import Header from '@/components/layout/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './themeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hack Mails',
  description: "Hack Mails is a free, open-source, and privacy-focused email service.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " "}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
