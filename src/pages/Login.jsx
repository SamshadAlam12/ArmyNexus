import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../utils/auth'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.password) {
      setError('Password is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    const result = loginUser(formData.email, formData.password)

    if (result.success) {
      navigate('/dashboard', { replace: true })
    } else {
      setError(result.error || 'Login failed')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-w-[320px] w-full max-w-full overflow-x-hidden px-4 sm:px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold text-army-sand text-center mb-2">Log In</h1>
        <p className="text-gray-400 text-center mb-8">Sign in to Army Nexus.</p>

        <form onSubmit={handleSubmit} className="card space-y-5">
          {error && (
            <div className="p-3 rounded-md bg-red-900/30 border border-red-700 text-red-200 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${error && !formData.email ? 'border-red-600 focus:ring-red-500' : ''}`}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field ${error && !formData.password ? 'border-red-600 focus:ring-red-500' : ''}`}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-army-olive font-semibold hover:text-army-oliveLight">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
