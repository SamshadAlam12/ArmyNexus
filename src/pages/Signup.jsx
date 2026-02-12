import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../utils/auth'

export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rank: '',
    profileImage: null,
  })
  const [preview, setPreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) {
      setFormData((prev) => ({ ...prev, profileImage: null }))
      setPreview(null)
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, profileImage: 'Please select an image file' }))
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, profileImage: 'Image size must be less than 5MB' }))
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
      setFormData((prev) => ({ ...prev, profileImage: reader.result }))
      setErrors((prev) => ({ ...prev, profileImage: '' }))
    }
    reader.readAsDataURL(file)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.rank) {
      newErrors.rank = 'Please select your rank'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    const result = registerUser(formData)

    if (result.success) {
      navigate('/login', { replace: true })
    } else {
      setErrors((prev) => ({ ...prev, submit: result.error || 'Registration failed' }))
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-w-[320px] w-full max-w-full overflow-x-hidden px-4 sm:px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold text-army-sand text-center mb-2">Sign Up</h1>
        <p className="text-gray-400 text-center mb-8">Create your Army Nexus account.</p>

        <form onSubmit={handleSubmit} className="card space-y-5">
          {errors.submit && (
            <div className="p-3 rounded-md bg-red-900/30 border border-red-700 text-red-200 text-sm">
              {errors.submit}
            </div>
          )}

          <div>
            <label htmlFor="signup-name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              id="signup-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`input-field ${errors.name ? 'border-red-600 focus:ring-red-500' : ''}`}
              placeholder="Full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-300 mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'border-red-600 focus:ring-red-500' : ''}`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-300 mb-2">
              Password <span className="text-red-400">*</span>
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? 'border-red-600 focus:ring-red-500' : ''}`}
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="signup-rank" className="block text-sm font-medium text-gray-300 mb-2">
              Rank <span className="text-red-400">*</span>
            </label>
            <select
              id="signup-rank"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              className={`input-field ${errors.rank ? 'border-red-600 focus:ring-red-500' : ''}`}
            >
              <option value="">Select rank</option>
              <option value="Captain">Captain</option>
              <option value="Major">Major</option>
              <option value="Commander">Commander</option>
            </select>
            {errors.rank && <p className="mt-1 text-sm text-red-400">{errors.rank}</p>}
          </div>

          <div>
            <label htmlFor="signup-image" className="block text-sm font-medium text-gray-300 mb-2">
              Profile Image (Optional)
            </label>
            <input
              id="signup-image"
              name="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="signup-image"
              className="block w-full px-4 py-3 rounded-md bg-surface-dark border border-army-primary text-gray-300 cursor-pointer hover:border-army-olive transition-colors text-center"
            >
              {preview ? 'Change Image' : 'Choose Image'}
            </label>
            {preview && (
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={preview}
                  alt="Profile preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-army-olive"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null)
                    setFormData((prev) => ({ ...prev, profileImage: null }))
                    const fileInput = document.getElementById('signup-image')
                    if (fileInput) fileInput.value = ''
                  }}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            )}
            {errors.profileImage && <p className="mt-1 text-sm text-red-400">{errors.profileImage}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-army-olive font-semibold hover:text-army-oliveLight">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
