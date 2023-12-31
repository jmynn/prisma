import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import axios from 'axios'
const inter = Inter({ subsets: ['latin'] })
axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
