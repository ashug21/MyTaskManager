"use client";

import Link from 'next/link'
import styles from './navbar.module.css'
import { useSession , signOut , signIn } from 'next-auth/react';


const Navbar = () => {
  const { data: session, status } = useSession();

  const logoutUser = async() => {
    signOut();
  }

  if(!session){
    return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
  
  
          <div className={styles.logo}>
            <div className={styles.logoIcon}>T</div>
            <Link href="/" className={styles.logoText}>MyTaskManager</Link>
          </div>
  
  
          <div className={styles.links}>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/tasks">Tasks</Link>
            <Link href="/analytics" className={styles.hideOnMobile}>Analytics</Link>
          </div>
  
  
          <div className={styles.actions}>
            <Link href="/login" className={styles.signIn}>Sign in</Link>
            <Link href="/addtask" className={styles.primary}>New Task</Link>
          </div>
  
        </div>
      </nav>
    )
  }

  else{
    return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
  
  
          <div className={styles.logo}>
            <div className={styles.logoIcon}>T</div>
            <Link href="/" className={styles.logoText}>MyTaskManager</Link>
          </div>
  
  
          <div className={styles.links}>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/tasks">Tasks</Link>
            <Link href="/analytics" className={styles.hideOnMobile}>Analytics</Link>
          </div>
  
  
          <div className={styles.actions}>
            <button onClick={logoutUser} className={styles.signIn}>LogOut</button>
            <Link href="/addtask" className={styles.primary}>New Task</Link>
          </div>
  
        </div>
      </nav>
    )
  }
  
}

export default Navbar
