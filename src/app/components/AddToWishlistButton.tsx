'use client'

import { useState, useEffect } from 'react'
import { Product } from '../types'
import { Heart } from 'lucide-react'
import { useShoppingContext } from '../contexts/ShoppingContext'
import toast from 'react-hot-toast'

interface AddToWishlistButtonProps {
  product: Product
}

const AddToWishlistButton: React.FC<AddToWishlistButtonProps> = ({ product }) => {
  const { wishlistItems, toggleWishlist } = useShoppingContext()
  const [isInWishlist, setIsInWishlist] = useState(false)

  useEffect(() => {
    setIsInWishlist(wishlistItems.some((item: Product) => item.id === product.id))
  }, [product.id, wishlistItems])

  const handleToggleWishlist = () => {
    toggleWishlist(product)
    if (isInWishlist) {
      toast.success(`${product.title} removed from wishlist`)
    } else {
      toast.success(`${product.title} added to wishlist`)
    }
    setIsInWishlist(!isInWishlist)
  }

  return (
    <button
      onClick={handleToggleWishlist}
      className={`px-4 py-2 rounded-md border ${
        isInWishlist ? 'bg-red-100 border-red-500 text-red-500' : 'bg-white border-gray-300 text-gray-600'
      }`}
    >
      <Heart className={`inline-block w-5 h-5 mr-2 ${isInWishlist ? 'fill-red-500' : ''}`} />
      {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
    </button>
  )
}

export default AddToWishlistButton

