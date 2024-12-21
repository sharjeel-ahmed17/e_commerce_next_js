'use client'

import { useState, useEffect } from 'react'
import { Product, CartItem } from '../types'
import { useShoppingContext } from '../contexts/ShoppingContext'
import toast from 'react-hot-toast'

interface AddToCartButtonProps {
  product: Product
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart } = useShoppingContext()
  const [isInCart, setIsInCart] = useState(false)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setIsInCart(cart.some((item: CartItem) => item.id === product.id))
  }, [product.id])

  const handleAddToCart = () => {
    addToCart(product)
    setIsInCart(true)
    toast.success(`${product.title} added to cart!`)
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`px-4 py-2 rounded-md ${
        isInCart ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
      }`}
    >
      {isInCart ? 'In Cart' : 'Add to Cart'}
    </button>
  )
}

export default AddToCartButton

