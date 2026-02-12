// User data utility for bio and social links

const USER_DATA_KEY = 'army_nexus_user_data'

// Get user data (bio, social links)
export function getUserData(userId) {
  try {
    const allData = localStorage.getItem(USER_DATA_KEY)
    const data = allData ? JSON.parse(allData) : {}
    return data[userId] || {
      bio: '',
      socialLinks: {
        linkedin: '',
        instagram: '',
        facebook: '',
        x: '',
      },
    }
  } catch (error) {
    return {
      bio: '',
      socialLinks: {
        linkedin: '',
        instagram: '',
        facebook: '',
        x: '',
      },
    }
  }
}

// Save user data
export function saveUserData(userId, data) {
  try {
    const allData = localStorage.getItem(USER_DATA_KEY)
    const parsed = allData ? JSON.parse(allData) : {}
    parsed[userId] = {
      ...parsed[userId],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(parsed))
    return true
  } catch (error) {
    return false
  }
}

// Update bio
export function updateBio(userId, bio) {
  return saveUserData(userId, { bio })
}

// Update social links
export function updateSocialLinks(userId, socialLinks) {
  return saveUserData(userId, { socialLinks })
}
