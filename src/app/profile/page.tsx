'use client'

import { useAuth } from '../contexts/AuthContext'
import PrivateRoute from '../components/PrivateRoute'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <PrivateRoute>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        {user && (
          <div className="space-y-4">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
          </div>
        )}
      </div>
    </PrivateRoute>
  )
}

