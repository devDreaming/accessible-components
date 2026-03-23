import { useState } from 'react'
import styles from './App.module.css'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import Button from './components/Button/Button'
import Modal from './components/Modal/Modal'
import Accordion from './components/Accordion/Accordion'
import FormField from './components/FormField/FormField'
import ToastContainer, { useToast } from './components/Toast/Toast'
import ComponentCard from './sections/ComponentCard'

function ButtonDemo() {
  const [loading, setLoading] = useState(false)

  const handleLoad = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'center' }}>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="primary" size="lg">Large</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button disabled>Disabled</Button>
      <Button loading={loading} onClick={handleLoad}>
        {loading ? 'Loading…' : 'Click to load'}
      </Button>
    </div>
  )
}

function ModalDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Example Modal">
        <p>This modal traps focus, closes on Escape and backdrop click, and returns focus to the trigger on close.</p>
        <div style={{ marginTop: 'var(--space-5)' }}>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  )
}

function AccordionDemo() {
  const items = [
    { id: 'a1', title: 'What is accessibility?', content: 'Accessibility ensures that digital content is usable by people with diverse abilities, including those using assistive technologies like screen readers, keyboard-only navigation, and voice control.' },
    { id: 'a2', title: 'Why use semantic HTML?', content: 'Semantic HTML provides meaning and structure, allowing browsers and assistive technologies to correctly interpret and present content without extra ARIA attributes.' },
    { id: 'a3', title: 'What is WCAG?', content: 'The Web Content Accessibility Guidelines (WCAG) are a set of recommendations for making web content more accessible, organized around four principles: Perceivable, Operable, Understandable, and Robust.' },
  ]

  return <Accordion items={items} />
}

function FormFieldDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <FormField
        label="Email address"
        type="email"
        hint="We'll never share your email"
        required
      />
      <FormField
        label="Username"
        type="text"
        error="Username is already taken"
        required
      />
      <FormField
        label="Bio"
        type="textarea"
        hint="Tell us about yourself"
        maxLength={150}
      />
    </div>
  )
}

function ToastDemo() {
  const { toasts, addToast, dismissToast } = useToast()

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <Button variant="primary" onClick={() => addToast('This is an informational message.', 'info')}>
          Info Toast
        </Button>
        <Button variant="secondary" onClick={() => addToast('Action completed successfully!', 'success')}>
          Success Toast
        </Button>
        <Button variant="ghost" onClick={() => addToast('Something went wrong.', 'error')}>
          Error Toast
        </Button>
      </div>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  )
}

export default function App() {
  return (
    <div className={styles.page}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>

      <div className={styles.themeToggleWrapper}>
        <ThemeToggle />
      </div>

      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.siteTitle}>
            Accessible Components
          </h1>
          <p className={styles.siteDescription}>
            A showcase of accessible UI components built with semantic HTML, ARIA attributes, and keyboard navigation.
          </p>
        </div>
      </header>

      <main id="main-content" className={styles.main}>
        <ComponentCard
          title="Button"
          description="Interactive button with variants, sizes, loading state, and disabled state."
          a11yTags={['aria-busy', 'aria-disabled', 'focus-visible', 'WCAG AA']}
          keyboardHints={[
            { key: 'Enter', action: 'Activate button' },
            { key: 'Space', action: 'Activate button' },
          ]}
        >
          <ButtonDemo />
        </ComponentCard>

        <ComponentCard
          title="Modal"
          description="Dialog overlay with focus trap, backdrop dismiss, and keyboard support."
          a11yTags={['aria-modal', 'focus trap', 'role=dialog', 'WCAG AA', 'Escape to close']}
          keyboardHints={[
            { key: 'Esc', action: 'Close modal' },
            { key: 'Tab', action: 'Cycle focus inside' },
          ]}
        >
          <ModalDemo />
        </ComponentCard>

        <ComponentCard
          title="Accordion"
          description="Expandable content panels with roving tabindex and keyboard navigation."
          a11yTags={['aria-expanded', 'aria-controls', 'roving tabindex', 'WCAG AA']}
          keyboardHints={[
            { key: '↑', action: 'Previous item' },
            { key: '↓', action: 'Next item' },
            { key: 'Home', action: 'First item' },
            { key: 'End', action: 'Last item' },
          ]}
        >
          <AccordionDemo />
        </ComponentCard>

        <ComponentCard
          title="Form Field"
          description="Accessible form input with hints, validation errors, and character counting."
          a11yTags={['aria-describedby', 'aria-required', 'aria-invalid', 'role=alert', 'aria-live', 'WCAG AA']}
          keyboardHints={[
            { key: 'Tab', action: 'Move between fields' },
          ]}
        >
          <FormFieldDemo />
        </ComponentCard>

        <ComponentCard
          title="Toast"
          description="Notification toasts with auto-dismiss, pause on hover, and live region announcements."
          a11yTags={['aria-live', 'role=status', 'auto-dismiss', 'WCAG AA']}
          keyboardHints={[
            { key: 'Tab', action: 'Focus dismiss button' },
          ]}
        >
          <ToastDemo />
        </ComponentCard>
      </main>
    </div>
  )
}
