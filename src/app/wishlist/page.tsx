'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { Product } from '../types'
import AddToCartButton from '../components/AddToCartButton'
import { useShoppingContext } from '../contexts/ShoppingContext'

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useShoppingContext()

  // useEffect(() => {
  //   const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
  //   setWishlistItems(wishlist)
  // }, [])

  const removeItem = (id: number) => {
    // const updatedWishlist = wishlistItems.filter(item => item.id !== id)
    // setWishlistItems(updatedWishlist)
    // localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
    const itemToRemove = wishlistItems.find(item => item.id === id);
    if (itemToRemove) {
      toggleWishlist(itemToRemove);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map(item => (
            <div key={item.id} className="border rounded-lg overflow-hidden">
              <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600 mb-2">${item.price}</p>
                <div className="flex justify-between items-center mt-4">
                  <AddToCartButton product={item} />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


