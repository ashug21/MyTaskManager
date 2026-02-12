'use client'

import React, { useEffect, useState, useContext } from 'react'
import Navbar from '@/components/Navbar/page'
import styles from './analytics.module.css'
import Footer from '@/components/Footer/page'
import { ThemeContext } from '@/Context/Theme'

const Analytics = () => {
  const { dark } = useContext(ThemeContext)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const [totalTask, setTotalTask] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [pending, setPending] = useState(0)

  const getTotalTasks = async () => {
    try {
      const res = await fetch('/api/analytics')
      if (!res.ok){
        console.log('Failed to fetch analytics');
      } 

      const data = await res.json()

      setTotalTask(data.total ?? 0)
      setCompleted(data.completed ?? 0)
      setPending(data.pending ?? 0)
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  useEffect(() => {
    getTotalTasks()
  }, [])

  const completionRate =
    totalTask > 0 ? Math.round((completed / totalTask) * 100) : 0

  return (
    <div>
      <Navbar />

      <div
        className={`${styles.analyticsContainer} ${
          mounted && dark === 'dark' ? styles.dark : ''
        }`}
      >
        <div className={styles.analyticsCard}>
          <h2 className={styles.analyticsTitle}>Task Analytics</h2>

          <div className={styles.analyticsStats}>
            <p className={`${styles.analyticsItem} ${styles.total}`}>
              Total Tasks: <span>{totalTask}</span>
            </p>
            <p className={`${styles.analyticsItem} ${styles.completed}`}>
              Completed: <span>{completed}</span>
            </p>
            <p className={`${styles.analyticsItem} ${styles.pending}`}>
              Pending: <span>{totalTask - completed}</span>
            </p>
          </div>
        </div>

        <div className={styles.progressContainer}>
          <p>Task Completion Rate</p>

          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${completionRate}%` }}
            />
          </div>

          <p>{completionRate}% completed</p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Analytics
