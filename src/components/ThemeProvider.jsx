import { useEffect } from 'react'
import { getTheme, applyTheme } from '../utils/themes'

export default function ThemeProvider({ children }) {
  useEffect(() => {
    // Apply saved theme on mount
    const savedTheme = getTheme()
    applyTheme(savedTheme)
  }, [])

  return <>{children}</>
}
