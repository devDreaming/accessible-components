import styles from './ComponentCard.module.css'

export default function ComponentCard({
  title,
  description,
  a11yTags = [],
  keyboardHints = [],
  children,
}) {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </header>

      <div className={styles.demo}>{children}</div>

      {a11yTags.length > 0 && (
        <div className={styles.tags}>
          {a11yTags.map((tag) => (
            <code key={tag} className={styles.tag}>
              {tag}
            </code>
          ))}
        </div>
      )}

      {keyboardHints.length > 0 && (
        <div className={styles.hints}>
          {keyboardHints.map(({ key, action }) => (
            <div key={key} className={styles.hint}>
              <kbd className={styles.kbd}>{key}</kbd>
              <span className={styles.action}>{action}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
