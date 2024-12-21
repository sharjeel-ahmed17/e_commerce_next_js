import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">Thank You for Your Order!</h1>
      <p className="mb-4">Your order has been received and is being processed.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Continue Shopping
      </Link>
    </div>
  )
}

