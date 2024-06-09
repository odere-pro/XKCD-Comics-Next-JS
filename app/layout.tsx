import BreadCrumbs from '@/components/Breadcrumbs'
import clsx from 'clsx'
import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'XKCD Webcomic',
    description:
        'This is a simple UI to explore XKCD strips - https://xkcd.com. It is built using Next.js and TypeScript.',
}

type RootLayoutProps = Readonly<{
    children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={clsx(inter.className, 'flex min-h-screen flex-col items-center')}>
                <header className="content-bg w-full max-w-5xl px-4 md:px-8 lg:px-16">
                    <div className="flex flex-col-reverse items-start justify-between gap-2 border-b border-gray-400 py-4 text-sm md:flex md:flex-row md:items-center md:gap-0 md:text-base">
                        <BreadCrumbs />
                        <h1>
                            XKCD - A webcomic
                            <span className="hidden md:inline">
                                {' '}
                                of romance, sarcasm, math, and language
                            </span>
                            .
                        </h1>
                    </div>
                </header>
                <main className="content-bg flex h-fit w-full max-w-5xl grow flex-col items-center px-4 pb-4 md:px-8 md:pb-8 lg:px-16 lg:pb-16">
                    {children}
                </main>
            </body>
        </html>
    )
}
