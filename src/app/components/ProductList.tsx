'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Product } from '../types'

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <Link href={`/product/${product.id}`} key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">${product.price}</p>
            <p className="text-sm text-gray-500">{product.description.slice(0, 100)}...</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductList

