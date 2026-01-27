import React from 'react'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand */}
        <div className={styles.brand}>
          <h2 className={styles.logo}>TaskFlow</h2>
          <p className={styles.description}>
            TaskFlow helps you organize work, track progress, and gain insights
            through powerful analytics — all in one place.
          </p>
        </div>

        {/* Product */}
        <div className={styles.column}>
          <h4>Product</h4>
          <a href="/dashboard">Dashboard</a>
          <a href="/analytics">Analytics</a>
          <a href="/tasks">Task Manager</a>
          <a href="/roadmap">Roadmap</a>
        </div>

        {/* Company */}
        <div className={styles.column}>
          <h4>Company</h4>
          <a href="/about">About</a>
          <a href="/careers">Careers</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
        </div>

        {/* Resources */}
        <div className={styles.column}>
          <h4>Resources</h4>
          <a href="/docs">Documentation</a>
          <a href="/support">Support</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
