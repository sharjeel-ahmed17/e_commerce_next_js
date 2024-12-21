'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CartItem } from '../types'
import { Plus, Minus } from 'lucide-react'
import { useShoppingContext } from '../contexts/ShoppingContext'

export default function CartPage() {
  // const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { cartItems, updateCartItemQuantity, removeFromCart } = useShoppingContext()

  // useEffect(() => {
  //   const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  //   setCartItems(cart)
  // }, [])

  // const updateQuantity = (id: number, newQuantity: number) => {
  //   if (newQuantity < 1) return
  //   const updatedCart = cartItems.map(item =>
  //     item.id === id ? { ...item, quantity: newQuantity } : item
  //   )
  //   setCartItems(updatedCart)
  //   localStorage.setItem('cart', JSON.stringify(updatedCart))
  // }

  // const removeItem = (id: number) => {
  //   const updatedCart = cartItems.filter(item => item.id !== id)
  //   setCartItems(updatedCart)
  //   localStorage.setItem('cart', JSON.stringify(updatedCart))
  // }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                      className="p-1 bg-gray-200 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      className="p-1 bg-gray-200 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <Link href="/checkout" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-md">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

