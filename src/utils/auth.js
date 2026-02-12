// Auth utility functions for localStorage

const USERS_KEY = 'army_nexus_users'
const SESSION_KEY = 'army_nexus_session'

// Get all users from localStorage
export function getUsers() {
  try {
    const users = localStorage.getItem(USERS_KEY)
    return users ? JSON.parse(users) : []
  } catch (error) {
    return []
  }
}

// Save users to localStorage
function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    return true
  } catch (error) {
    return false
  }
}

// Register a new user
export function registerUser(userData) {
  const users = getUsers()
  
  // Check if email already exists
  if (users.some(user => user.email === userData.email)) {
    return { success: false, error: 'Email already registered' }
  }

  // Create user object
  const newUser = {
    id: Date.now().toString(),
    name: userData.name.trim(),
    email: userData.email.trim().toLowerCase(),
    password: userData.password, // In production, this would be hashed
    rank: userData.rank,
    profileImage: userData.profileImage || null,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  
  if (saveUsers(users)) {
    return { success: true, user: newUser }
  }
  
  return { success: false, error: 'Failed to save user' }
}

// Login user
export function loginUser(email, password) {
  const users = getUsers()
  const user = users.find(
    u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
  )

  if (!user) {
    return { success: false, error: 'Invalid email or password' }
  }

  // Create session (exclude password)
  const session = {
    userId: user.id,
    email: user.email,
    name: user.name,
    rank: user.rank,
    profileImage: user.profileImage,
    loginTime: new Date().toISOString(),
  }

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    return { success: true, user: session }
  } catch (error) {
    return { success: false, error: 'Failed to create session' }
  }
}

// Get current session
export function getSession() {
  try {
    const session = localStorage.getItem(SESSION_KEY)
    return session ? JSON.parse(session) : null
  } catch (error) {
    return null
  }
}

// Logout user
export function logout() {
  try {
    localStorage.removeItem(SESSION_KEY)
    return true
  } catch (error) {
    return false
  }
}

// Check if user is authenticated
export function isAuthenticated() {
  return getSession() !== null
}

// Update profile image
export function updateProfileImage(userId, profileImage) {
  try {
    const users = getUsers()
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      return { success: false, error: 'User not found' }
    }

    // Update user profile image
    users[userIndex].profileImage = profileImage
    saveUsers(users)

    // Update session if it exists
    const session = getSession()
    if (session && session.userId === userId) {
      session.profileImage = profileImage
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to update profile image' }
  }
}
