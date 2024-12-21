import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './contexts/AuthContext'
import { ShoppingProvider } from './contexts/ShoppingContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'E-commerce Website',
  description: 'An e-commerce website using dummyjson.com API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ShoppingProvider>
            <Header />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
            <Toaster position="bottom-right" />
          </ShoppingProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

