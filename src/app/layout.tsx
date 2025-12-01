import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "next-themes";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "BHRK Codelabs - Engineering experiences that inspire.",
    description: "It's not just a software consulting, where a lab that build and craft ideas with love and passion ",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased rubik-300`}
        >
        <ThemeProvider attribute="class" enableSystem={true} defaultTheme="dark">
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
