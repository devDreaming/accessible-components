import { useState, useEffect, useRef } from 'react'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const announceRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      setIsDark(saved === 'dark')
      document.documentElement.setAttribute('data-theme', saved)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(prefersDark)
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
    }
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    const theme = next ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)

    if (announceRef.current) {
      announceRef.current.textContent = `Switched to ${theme} theme`
    }
  }

  return (
    <>
      <button
        className={styles.toggle}
        onClick={toggle}
        aria-pressed={isDark}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        <span className={styles.icon} aria-hidden="true">
          {isDark ? '☀' : '☾'}
        </span>
        <span className={styles.label}>{isDark ? 'Light' : 'Dark'}</span>
      </button>
      <span
        ref={announceRef}
        className={styles.srOnly}
        role="status"
        aria-live="polite"
      />
    </>
  )
}
