'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Product } from '../../types'
import AddToCartButton from '../../components/AddToCartButton'
import AddToWishlistButton from '../../components/AddToWishlistButton'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [id])

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <img src={product.thumbnail} alt={product.title} className="w-full h-auto rounded-lg" />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-bold mb-4">${product.price}</p>
        <div className="flex space-x-4 mb-4">
          <AddToCartButton product={product} />
          <AddToWishlistButton product={product} />
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Product Details</h2>
          <ul className="list-disc list-inside">
            <li>Brand: {product.brand}</li>
            <li>Category: {product.category}</li>
            <li>Rating: {product.rating}</li>
            <li>Stock: {product.stock}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

