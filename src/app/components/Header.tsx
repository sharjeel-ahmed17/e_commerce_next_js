'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Heart, User, Clock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import { useShoppingContext } from '../contexts/ShoppingContext'

const Header = () => {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { cartItems, wishlistItems } = useShoppingContext()
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0))
      setWishlistCount(wishlistItems.length)
    }

    updateCounts()
    window.addEventListener('storage', updateCounts)
    return () => window.removeEventListener('storage', updateCounts)
  }, [cartItems, wishlistItems])

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">Bari-Shop</Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className={`${pathname === '/' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600`}>Home</Link>
          <Link href="/cart" className="text-gray-600 hover:text-blue-600 relative">
            <ShoppingCart className="inline-block w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/wishlist" className="text-gray-600 hover:text-blue-600 relative">
            <Heart className="inline-block w-6 h-6" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {wishlistCount}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link href="/profile" className="text-gray-600 hover:text-blue-600">
                <User className="inline-block w-6 h-6" />
              </Link>
              <Link href="/order-history" className="text-gray-600 hover:text-blue-600">
                <Clock className="inline-block w-6 h-6" />
              </Link>
              <button onClick={logout} className="text-gray-600 hover:text-blue-600">Logout</button>
            </>
          ) : (
            <Link href="/login" className="text-gray-600 hover:text-blue-600">
              <User className="inline-block w-6 h-6" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header

