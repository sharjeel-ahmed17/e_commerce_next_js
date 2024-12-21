'use client'

import { useShoppingContext } from '../contexts/ShoppingContext'
import PrivateRoute from '../components/PrivateRoute'

export default function OrderHistoryPage() {
  const { orders } = useShoppingContext()

  return (
    <PrivateRoute>
      <div>
        <h1 className="text-3xl font-bold mb-6">Order History</h1>
        {orders.length === 0 ? (
        <p>You haven&apos;t placed any orders yet.</p>
        ) : (
          <div className="space-y-8">
            {orders.map(order => (
              <div key={order.id} className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
                <p className="text-gray-600 mb-2">Date: {new Date(order.date).toLocaleDateString()}</p>
                <p className="font-bold mb-2">Total: ${order.total.toFixed(2)}</p>
                <h3 className="text-lg font-semibold mb-2">Items:</h3>
                <ul className="list-disc list-inside">
                  {order.items.map(item => (
                    <li key={item.id}>
                      {item.title} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <h3 className="text-lg font-semibold mt-4 mb-2">Shipping Address:</h3>
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.country} {order.shippingAddress.zipCode}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </PrivateRoute>
  )
}

