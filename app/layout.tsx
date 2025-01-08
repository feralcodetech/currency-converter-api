import type { Metadata } from "next"
import Image from "next/image"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "OpenRTCC by Feral Code Technologies",
    description: "Real-time currency converter API.",
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
    const bodyClassName = `antialiased text-center select-none`
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${bodyClassName}`}
            >
                <Image
                    id="logo"
                    className="dark:invert m-8 inline-block"
                    src="/logo.png"
                    alt="OpenRTCC logo"
                    width={635}
                    height={135}
                    priority
                />
                <br />
                {children}
                <footer>&copy; 2025 Omer Drkić. Licensed under the MIT License.</footer>
                <Toaster
                    position="bottom-left"
                />
            </body>
        </html>
    )
}
