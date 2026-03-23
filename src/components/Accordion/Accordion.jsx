import { useState, useRef } from 'react'
import styles from './Accordion.module.css'

export default function Accordion({ items }) {
  const [expandedId, setExpandedId] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const triggersRef = useRef([])

  const toggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  const handleKeyDown = (e, index) => {
    let nextIndex = index

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        nextIndex = (index + 1) % items.length
        break
      case 'ArrowUp':
        e.preventDefault()
        nextIndex = (index - 1 + items.length) % items.length
        break
      case 'Home':
        e.preventDefault()
        nextIndex = 0
        break
      case 'End':
        e.preventDefault()
        nextIndex = items.length - 1
        break
      default:
        return
    }

    setActiveIndex(nextIndex)
    triggersRef.current[nextIndex]?.focus()
  }

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isExpanded = expandedId === item.id
        const triggerId = `accordion-trigger-${item.id}`
        const panelId = `accordion-panel-${item.id}`

        return (
          <div key={item.id} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                id={triggerId}
                ref={(el) => (triggersRef.current[index] = el)}
                className={styles.trigger}
                aria-expanded={isExpanded}
                aria-controls={panelId}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => toggle(item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                <span>{item.title}</span>
                <span className={`${styles.icon} ${isExpanded ? styles.iconOpen : ''}`} aria-hidden="true">
                  ▸
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={styles.panel}
              hidden={!isExpanded}
            >
              <div className={styles.panelContent}>{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
