import type React from "react"
import type { Metadata } from "next"
import { Inter, Bebas_Neue } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
})

// Note: PP Neue Montreal needs to be added to your project as a local font
// Add this CSS to your globals.css file:
// @font-face {
//   font-family: 'PP Neue Montreal';
//   src: url('/fonts/PPNeueMontreal-Regular.woff2') format('woff2');
//   font-weight: 400;
//   font-style: normal;
//   font-display: swap;
// }
// @font-face {
//   font-family: 'PP Neue Montreal';
//   src: url('/fonts/PPNeueMontreal-Medium.woff2') format('woff2');
//   font-weight: 500;
//   font-style: normal;
//   font-display: swap;
// }

export const metadata: Metadata = {
  title: "Nigeria Fitness Awards | NFAWARD",
  description: "The premier celebration of fitness excellence in Nigeria",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${bebasNeue.variable}`}>{children}</body>
    </html>
  )
}
