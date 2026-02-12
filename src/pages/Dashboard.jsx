import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSession, logout, updateProfileImage } from '../utils/auth'
import { getUserData, updateBio, updateSocialLinks } from '../utils/userData'
import { getTheme, setTheme, themes } from '../utils/themes'
import { getGreeting } from '../utils/greeting'
import { LinkedInIcon, InstagramIcon, FacebookIcon, XIcon } from '../components/SocialIcons'
import { ShieldIcon, BioIcon, LinkIcon, ThemeIcon, ChartIcon } from '../components/Icons'
import ScrollReveal from '../components/ScrollReveal'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState({
    bio: '',
    socialLinks: {
      linkedin: '',
      instagram: '',
      facebook: '',
      x: '',
    },
  })
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [isEditingSocial, setIsEditingSocial] = useState(false)
  const [isEditingImage, setIsEditingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [currentTheme, setCurrentTheme] = useState('tactical-green')

  useEffect(() => {
    const session = getSession()
    if (!session) {
      navigate('/login', { replace: true })
      return
    }
    setUser(session)
    setImagePreview(session.profileImage)
    const data = getUserData(session.userId)
    setUserData(data)

    const savedTheme = getTheme()
    setCurrentTheme(savedTheme)
  }, [navigate])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return
    if (file.size > 5 * 1024 * 1024) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleImageSave = () => {
    if (!user?.userId || !imagePreview) return
    const result = updateProfileImage(user.userId, imagePreview)
    if (result.success) {
      setUser((prev) => ({ ...prev, profileImage: imagePreview }))
      setIsEditingImage(false)
    }
  }

  const handleImageCancel = () => {
    setImagePreview(user?.profileImage || null)
    setIsEditingImage(false)
    const fileInput = document.getElementById('profile-image-input')
    if (fileInput) fileInput.value = ''
  }

  const handleImageRemove = () => {
    if (!user?.userId) return
    const result = updateProfileImage(user.userId, null)
    if (result.success) {
      setUser((prev) => ({ ...prev, profileImage: null }))
      setImagePreview(null)
      setIsEditingImage(false)
    }
  }

  const handleBioChange = (e) => {
    setUserData((prev) => ({ ...prev, bio: e.target.value }))
  }

  const handleBioSave = () => {
    if (!user?.userId) return
    updateBio(user.userId, userData.bio)
    setIsEditingBio(false)
  }

  const handleBioCancel = () => {
    if (!user?.userId) return
    const data = getUserData(user.userId)
    setUserData((prev) => ({ ...prev, bio: data.bio }))
    setIsEditingBio(false)
  }

  const handleSocialChange = (platform, value) => {
    setUserData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }))
  }

  const handleSocialSave = () => {
    if (!user?.userId) return
    updateSocialLinks(user.userId, userData.socialLinks)
    setIsEditingSocial(false)
  }

  const handleSocialCancel = () => {
    if (!user?.userId) return
    const data = getUserData(user.userId)
    setUserData((prev) => ({ ...prev, socialLinks: data.socialLinks }))
    setIsEditingSocial(false)
  }

  const handleThemeChange = (themeName) => {
    if (setTheme(themeName)) {
      setCurrentTheme(themeName)
    }
  }

  const formatSocialUrl = (platform, url) => {
    if (!url) return ''
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    const base = {
      linkedin: 'https://linkedin.com/in/',
      instagram: 'https://instagram.com/',
      facebook: 'https://facebook.com/',
      x: 'https://x.com/',
    }
    return (base[platform] || '') + url
  }

  const getSocialIcon = (platform) => {
    const cls = 'w-4 h-4'
    switch (platform) {
      case 'linkedin':
        return <LinkedInIcon className={cls} />
      case 'instagram':
        return <InstagramIcon className={cls} />
      case 'facebook':
        return <FacebookIcon className={cls} />
      case 'x':
        return <XIcon className={cls} />
      default:
        return null
    }
  }

  const handleSocialIconClick = (platform) => {
    const value = userData.socialLinks[platform]
    if (!value) return
    const url = formatSocialUrl(platform, value)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (!user) {
    return (
      <div className="min-w-[320px] w-full max-w-full overflow-x-hidden px-4 sm:px-6 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <ScrollReveal>
      <div className="min-w-[320px] w-full overflow-x-hidden px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-army-sand">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-army-primary/60 border border-army-olive/60 text-army-sand text-lg">
                  ◼︎
                </span>
                <span className="truncate">Command Dashboard</span>
              </h1>
              <p className="mt-1 text-gray-300 text-sm sm:text-base">
                Manage your profile, preferences, and command presence.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="btn-secondary w-full sm:w-auto transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Logout
            </button>
          </div>

          {/* Profile */}
          <div className="card mb-6 transition-all duration-300 hover:shadow-xl reveal reveal-up">
            <div className="flex flex-col items-center text-center gap-4 py-2 sm:py-3">
              <div className="relative">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={user.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 transition-all duration-300 hover:scale-105"
                    style={{ borderColor: 'var(--army-olive)' }}
                  />
                ) : (
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-army-sand border-2 transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: 'var(--army-primary)',
                      borderColor: 'var(--army-olive)',
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                {/* status dot */}
                <span className="absolute right-0 bottom-1 h-4 w-4 rounded-full border-2 border-army-dark bg-army-olive shadow-md" />
              </div>

              <div className="mt-2">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide text-army-sand">
                  {user.name.toUpperCase()}
                </h2>
                <p className="mt-1 text-sm sm:text-base text-army-sandLight">{user.rank}</p>
              </div>

              <button
                type="button"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-army-olive px-4 py-1.5 text-xs sm:text-sm font-semibold text-army-dark shadow-sm"
              >
                <ShieldIcon className="w-3.5 h-3.5" />
                Active Personnel
              </button>

              {/* image actions */}
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {!isEditingImage ? (
                  <button
                    type="button"
                    onClick={() => setIsEditingImage(true)}
                    className="text-xs sm:text-sm text-army-olive hover:text-army-oliveLight font-medium transition-colors duration-200 hover:underline"
                  >
                    Change Image
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleImageSave}
                      className="text-xs sm:text-sm text-army-olive hover:text-army-oliveLight font-medium transition-colors duration-200"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleImageCancel}
                      className="text-xs sm:text-sm text-gray-400 hover:text-gray-300 font-medium transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={handleImageRemove}
                        className="text-xs sm:text-sm text-red-400 hover:text-red-300 font-medium transition-colors duration-200"
                      >
                        Remove
                      </button>
                    )}
                  </>
                )}
              </div>

              {isEditingImage && (
                <div className="mt-2 w-full max-w-xs">
                  <input
                    id="profile-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="input-field text-sm transition-all duration-200"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Max file size: 5MB. Supported formats: JPG, PNG, GIF
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Bio */}
              <div className="card transition-all duration-300 hover:shadow-xl reveal reveal-up">
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 mb-4">
                  <h2 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-army-sand">
                    <BioIcon className="w-4 h-4 text-army-oliveLight" />
                    Bio
                  </h2>
                  {!isEditingBio ? (
                    <button
                      type="button"
                      onClick={() => setIsEditingBio(true)}
                      className="text-xs sm:text-sm text-army-olive hover:text-army-oliveLight font-medium transition-colors duration-200 hover:underline w-fit"
                    >
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleBioSave}
                        className="text-xs sm:text-sm text-army-olive hover:text-army-oliveLight font-medium transition-colors duration-200"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={handleBioCancel}
                        className="text-xs sm:text-sm text-gray-400 hover:text-gray-300 font-medium transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                {isEditingBio ? (
                  <textarea
                    value={userData.bio}
                    onChange={handleBioChange}
                    placeholder="Tell us about yourself..."
                    className="input-field min-h-[120px] resize-y transition-all duration-200 focus:ring-2 focus:ring-army-olive"
                    rows={5}
                  />
                ) : (
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {userData.bio || 'No bio added yet. Click Edit to add one.'}
                  </p>
                )}
              </div>

              {/* Social links */}
              <div className="card transition-all duration-300 hover:shadow-xl reveal reveal-up">
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 mb-4">
                  <h2 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-army-sand">
                    <LinkIcon className="w-4 h-4 text-army-oliveLight" />
                    Social Links
                  </h2>
                  {!isEditingSocial ? (
                    <button
                      type="button"
                      onClick={() => setIsEditingSocial(true)}
                      className="text-xs sm:text-sm text-army-olive hover:text-army-oliveLight font-medium transition-colors duration-200 hover:underline w-fit"
                    >
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleSocialSave}
                        className="text-xs sm:text-sm text-army-olive hover:text-army-oliveLight font-medium transition-colors duration-200"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={handleSocialCancel}
                        className="text-xs sm:text-sm text-gray-400 hover:text-gray-300 font-medium transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className={isEditingSocial ? 'space-y-3' : 'mt-1'}>
                  {isEditingSocial ? (
                    <>
                      {[
                        { key: 'linkedin', label: 'LinkedIn' },
                        { key: 'instagram', label: 'Instagram' },
                        { key: 'facebook', label: 'Facebook' },
                        { key: 'x', label: 'X (Twitter)' },
                      ].map(({ key, label }) => (
                        <div
                          key={key}
                          className="transition-all duration-200 hover:translate-x-1"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-army-olive flex-shrink-0 transition-transform duration-200 hover:scale-110">
                              {getSocialIcon(key)}
                            </div>
                            <input
                              type="text"
                              value={userData.socialLinks[key]}
                              onChange={(e) => handleSocialChange(key, e.target.value)}
                              placeholder={`Enter your ${label} username or URL`}
                              className="input-field flex-1 min-w-0 transition-all duration-200 focus:ring-2 focus:ring-army-olive"
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="flex items-center gap-3">
                      {[
                        { key: 'linkedin', label: 'LinkedIn' },
                        { key: 'instagram', label: 'Instagram' },
                        { key: 'facebook', label: 'Facebook' },
                        { key: 'x', label: 'X (Twitter)' },
                      ].map(({ key, label }) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleSocialIconClick(key)}
                          disabled={!userData.socialLinks[key]}
                          className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 ${
                            userData.socialLinks[key]
                              ? 'border-army-olive/60 text-army-olive bg-surface-card hover:bg-army-olive/15 hover:scale-110'
                              : 'border-army-primary/40 text-gray-600 cursor-not-allowed opacity-50'
                          }`}
                          aria-label={label}
                          title={
                            userData.socialLinks[key]
                              ? `${label} profile`
                              : `${label} link not set`
                          }
                        >
                          {getSocialIcon(key)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col space-y-4 sm:space-y-6 lg:h-full">
              {/* Theme selector */}
              <div className="card transition-all duration-300 hover:shadow-xl reveal reveal-up">
                <h2 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-army-sandLight mb-3 sm:mb-4">
                  <ThemeIcon className="w-4 h-4 text-army-oliveLight" />
                  Theme
                </h2>
                <div className="space-y-2">
                  {Object.entries(themes).map(([key, theme]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleThemeChange(key)}
                      className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-md border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                        currentTheme === key
                          ? 'border-army-olive bg-surface-cardHover shadow-md'
                          : 'border-army-primary/50 hover:border-army-olive/50 hover:bg-surface-cardHover/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm sm:text-base text-gray-300 font-medium">
                          {theme.name}
                        </span>
                        {currentTheme === key && (
                          <span className="text-army-olive text-lg transition-transform duration-200">
                            ✓
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div className="card transition-all duration-300 hover:shadow-xl lg:flex-1 flex flex-col reveal reveal-up">
                <h2 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-army-sandLight mb-3 sm:mb-4">
                  <ChartIcon className="w-4 h-4 text-army-oliveLight" />
                  Quick Stats
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full flex-1">
                  {[
                    { label: 'Overview', desc: 'Quick stats and alerts' },
                    { label: 'Messages', desc: 'Communications and updates' },
                    { label: 'Resources', desc: 'Documents and links' },
                  ].map((block) => (
                    <div
                      key={block.label}
                      className="p-3 rounded-md bg-surface-dark border border-army-primary/30 transition-all duration-200 hover:border-army-olive/50 hover:-translate-y-0.5 min-w-0 flex flex-col justify-between"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-army-sand truncate">
                        {block.label}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-snug">
                        {block.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="mt-6 sm:mt-8 card transition-all duration-300 hover:shadow-xl reveal reveal-up">
            <h2 className="text-base sm:text-lg font-semibold text-army-sandLight mb-3 sm:mb-4">
              Recent Activity
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">No activity to display.</p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

