'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useShoppingState } from '../hooks/useShoppingState'
import { Order } from '../types'

interface ShoppingContextType extends ReturnType<typeof useShoppingState> {
  orders: Order[]
  addOrder: (order: Order) => void
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined)

export const ShoppingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const shoppingState = useShoppingState()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders')
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }
  }, [])

  const addOrder = (order: Order) => {
    const updatedOrders = [...orders, order]
    setOrders(updatedOrders)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
  }

  return (
    <ShoppingContext.Provider value={{ ...shoppingState, orders, addOrder }}>
      {children}
    </ShoppingContext.Provider>
  )
}

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext)
  if (context === undefined) {
    throw new Error('useShoppingContext must be used within a ShoppingProvider')
  }
  return context
}

