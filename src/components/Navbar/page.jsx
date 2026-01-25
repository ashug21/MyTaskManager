import Link from 'next/link'
import styles from './navbar.module.css'


const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>

        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>T</div>
          <Link href="/" className={styles.logoText}>MyTaskManager</Link>
        </div>

        {/* Links */}
        <div className={styles.links}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/tasks">Tasks</Link>
          <span className={styles.hideOnMobile}>Analytics</span>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Link href="/login" className={styles.signIn}>Sign in</Link>
          <Link href="/addTask" className={styles.primary}>New Task</Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
