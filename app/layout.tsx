import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ConvexClientProvider } from '@/components/providers/convex-provider'
import { ToastT, Toaster } from 'sonner'
import { ModalProvider } from '@/components/providers/modal-provider'
import { EdgeStoreProvider } from '../lib/edgestore';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Noter | Home',
  description: 'This is the Noter | Home',
  icons:{
    icon:[{
      media:"(prefers-color-scheme:light)",
      url:"/black_logo.svg",
      type:"image/svg+xml",
      href:"/black_logo.svg",
    },
    {
      media:"(prefers-color-scheme:dark)",
      url:"/white_logo.svg",
      type:"image/svg+xml",
      href:"/white_logo.svg",
    }
  
  ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider 
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
              storageKey='noter-app'>
                <Toaster position='bottom-center'/>
                <ModalProvider/>
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
