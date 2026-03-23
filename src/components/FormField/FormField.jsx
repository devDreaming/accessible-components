import { useState, useId } from 'react'
import styles from './FormField.module.css'

export default function FormField({
  label,
  type = 'text',
  hint,
  error,
  required = false,
  maxLength = 200,
}) {
  const [value, setValue] = useState('')
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const countId = `${id}-count`

  const isTextarea = type === 'textarea'

  const describedBy = [
    hint ? hintId : null,
    error ? errorId : null,
    isTextarea ? countId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined

  const inputProps = {
    id,
    className: `${styles.input} ${error ? styles.inputError : ''}`,
    value,
    onChange: (e) => setValue(e.target.value),
    'aria-describedby': describedBy,
    'aria-required': required ? 'true' : undefined,
    'aria-invalid': error ? 'true' : undefined,
    maxLength: isTextarea ? maxLength : undefined,
  }

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required} aria-hidden="true"> *</span>}
      </label>

      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}

      {isTextarea ? (
        <textarea {...inputProps} rows={4} />
      ) : (
        <input {...inputProps} type={type} />
      )}

      {isTextarea && (
        <p id={countId} className={styles.charCount} aria-live="polite">
          {value.length}/{maxLength} characters
        </p>
      )}

      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
