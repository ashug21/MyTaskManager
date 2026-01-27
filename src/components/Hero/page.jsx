import React from 'react'
import styles from './hero.module.css'
import Link from 'next/link'

const Hero = () => {
  return (
    <div>
      <section className={styles.hero}>
      <div className={styles.heroOverlay}></div>

      <div className={styles.heroContent}>
        <h1>
          Organize your tasks.
          <br />
          Focus on what matters.
        </h1>

        <p>
          A simple, fast, and powerful task manager to plan your day,
          track progress, and get things done.
        </p>

        <div className={styles.heroActions}>
          <Link href="/addtask" className={styles.primaryBtn}>Get Started</Link>
          <button className={styles.secondaryBtn}>View Demo</button>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Hero
