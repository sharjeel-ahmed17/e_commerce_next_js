import { useState, useEffect } from 'react'
import { CartItem, Product } from '../types'

export const useShoppingState = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setCartItems(storedCart)
    setWishlistItems(storedWishlist)
  }, [])

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const updateWishlist = (newWishlist: Product[]) => {
    setWishlistItems(newWishlist)
    localStorage.setItem('wishlist', JSON.stringify(newWishlist))
  }

  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    if (existingItem) {
      const updatedCart = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      )
      updateCart(updatedCart)
    } else {
      updateCart([...cartItems, { ...product, quantity }])
    }
  }

  const removeFromCart = (productId: number) => {
    const updatedCart = cartItems.filter(item => item.id !== productId)
    updateCart(updatedCart)
  }

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    )
    updateCart(updatedCart)
  }

  const toggleWishlist = (product: Product) => {
    const existingItem = wishlistItems.find(item => item.id === product.id)
    if (existingItem) {
      const updatedWishlist = wishlistItems.filter(item => item.id !== product.id)
      updateWishlist(updatedWishlist)
    } else {
      updateWishlist([...wishlistItems, product])
    }
  }

  return {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    toggleWishlist
  }
}

