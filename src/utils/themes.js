// Theme configurations

export const themes = {
  'tactical-green': {
    name: 'Tactical Green',
    colors: {
      dark: '#0a1612',
      primary: '#1b4332',
      green: '#2d6a4f',
      olive: '#40916c',
      oliveLight: '#52b788',
      sand: '#d4a574',
      sandLight: '#e9c46a',
      surfaceDark: '#0d1f17',
      surfaceCard: '#132a21',
      surfaceCardHover: '#1a3529',
    },
  },
  'desert-mode': {
    name: 'Desert Mode',
    colors: {
      dark: '#2a2419',
      primary: '#4a3d2a',
      green: '#6b5d47',
      olive: '#8b7a5f',
      oliveLight: '#a8967a',
      sand: '#d4a574',
      sandLight: '#e9c46a',
      surfaceDark: '#1f1a12',
      surfaceCard: '#352d20',
      surfaceCardHover: '#3f3526',
    },
  },
  'night-ops': {
    name: 'Night Ops',
    colors: {
      dark: '#0a0a0f',
      primary: '#1a1a2e',
      green: '#2a2a3e',
      olive: '#3a3a4e',
      oliveLight: '#4a4a5e',
      sand: '#a0a0b0',
      sandLight: '#c0c0d0',
      surfaceDark: '#0f0f15',
      surfaceCard: '#151520',
      surfaceCardHover: '#1a1a2a',
    },
  },
}

const THEME_KEY = 'army_nexus_theme'

export function getTheme() {
  try {
    const theme = localStorage.getItem(THEME_KEY)
    return theme && themes[theme] ? theme : 'tactical-green'
  } catch (error) {
    return 'tactical-green'
  }
}

export function setTheme(themeName) {
  if (!themes[themeName]) {
    return false
  }
  try {
    localStorage.setItem(THEME_KEY, themeName)
    applyTheme(themeName)
    return true
  } catch (error) {
    return false
  }
}

export function applyTheme(themeName) {
  const theme = themes[themeName]
  if (!theme) return

  const root = document.documentElement
  const colors = theme.colors

  root.style.setProperty('--army-dark', colors.dark)
  root.style.setProperty('--army-primary', colors.primary)
  root.style.setProperty('--army-green', colors.green)
  root.style.setProperty('--army-olive', colors.olive)
  root.style.setProperty('--army-oliveLight', colors.oliveLight)
  root.style.setProperty('--army-sand', colors.sand)
  root.style.setProperty('--army-sandLight', colors.sandLight)
  root.style.setProperty('--surface-dark', colors.surfaceDark)
  root.style.setProperty('--surface-card', colors.surfaceCard)
  root.style.setProperty('--surface-cardHover', colors.surfaceCardHover)
}

// Initialize theme on load
if (typeof document !== 'undefined') {
  const savedTheme = getTheme()
  applyTheme(savedTheme)
}
