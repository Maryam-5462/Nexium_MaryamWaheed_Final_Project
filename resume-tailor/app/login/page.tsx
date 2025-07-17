'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import React from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setMessage('Error sending link: ' + error.message)
    } else {
      setMessage('Check your email for the login link!')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Login with Magic Link</h1>
      <input
        type="email"
        placeholder="Enter your email"
        className="p-2 border rounded mb-2 w-full max-w-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={handleLogin}
      >
        Send Login Link
      </button>
      {message && <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">{message}</p>}
    </div>
  )
}
