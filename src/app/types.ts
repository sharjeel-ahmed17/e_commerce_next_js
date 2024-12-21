export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  token: string
}

export interface Order {
  id: string
  date: string
  items: CartItem[]
  total: number
  shippingAddress: {
    name: string
    address: string
    city: string
    country: string
    zipCode: string
  }
}

