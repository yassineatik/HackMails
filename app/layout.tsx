import Header from '@/components/layout/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './themeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hack Mails',
  description: "Effortlessly streamline your job application process with our personalized email tool. Send tailored emails to multiple companies using dynamic placeholders, eliminating the need for manual editing. Automate your outreach, save time, and make a lasting impression on potential employers. Simplify your job search today.",
  // set the image here to be used in meta tags for social sharing
  openGraph: {
    title: "HackMails - Reach More ",
    description:
      "Streamlined Job Application Email Tool .",
    url: "https://www.hackmails.com/",
    siteName: "HackMails",
    images: [
      {
        url: "/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },

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
