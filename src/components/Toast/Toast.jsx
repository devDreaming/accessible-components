import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './Toast.module.css'

function ToastItem({ id, message, type = 'info', duration = 4000, onDismiss }) {
  const [paused, setPaused] = useState(false)
  const elapsed = useRef(0)
  const lastTick = useRef(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) {
        lastTick.current = Date.now()
        return
      }
      elapsed.current += Date.now() - lastTick.current
      lastTick.current = Date.now()
      if (elapsed.current >= duration) {
        onDismiss(id)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [paused, duration, id, onDismiss])

  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'

  return (
    <div
      className={`${styles.toast} ${styles[type]}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); lastTick.current = Date.now() }}
      onFocus={() => setPaused(true)}
      onBlur={() => { setPaused(false); lastTick.current = Date.now() }}
    >
      <span className={styles.icon} aria-hidden="true">{icon}</span>
      <span className={styles.message}>{message}</span>
      <button
        className={styles.dismiss}
        onClick={() => onDismiss(id)}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  )
}

let toastCounter = 0

export function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++toastCounter
    setToasts((prev) => [...prev, { id, message, type, duration }])
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, addToast, dismissToast }
}

export default function ToastContainer({ toasts, onDismiss }) {
  return (
    <div
      className={styles.container}
      role="status"
      aria-live="polite"
      aria-relevant="additions removals"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
