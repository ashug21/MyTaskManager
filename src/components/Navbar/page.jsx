"use client";

import Link from "next/link";
import styles from "./navbar.module.css";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import default_profile_icon from "../../../public/account.png";

const Navbar = () => {
  const { data: session } = useSession();

  const logoutUser = async () => {
    signOut();
  };

  if (!session) {
    return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>T</div>
            <Link href="/" className={styles.logoText}>
              TaskFlow
            </Link>
          </div>

          <div className={styles.links}>
            <Link href="/">Home</Link>
            <Link href="/tasks">Tasks</Link>
            <Link href="/analytics" className={styles.hideOnMobile}>
              Analytics
            </Link>
          </div>

          <div className={styles.rightEnd}>
            <div className={styles.actions}>
              <Link href="/login" className={styles.signIn}>
                Sign in
              </Link>
              <Link href="/addtask" className={styles.primary}>
                New Task
              </Link>
            </div>

            <Image
              src={default_profile_icon}
              alt="Profile"
              width={36}
              height={36}
              className={styles.profileIcon}
            />
          </div>
        </div>
      </nav>
    );
  }

  else {
    return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>T</div>
            <Link href="/" className={styles.logoText}>
              TaskFlow
            </Link>
          </div>

          <div className={styles.links}>
            <Link href="/">Home</Link>
            <Link href="/tasks">Tasks</Link>
            <Link href="/analytics" className={styles.hideOnMobile}>
              Analytics
            </Link>
          </div>

          <div className={styles.rightEnd}>
            <div className={styles.actions}>
              <button onClick={logoutUser} className={styles.signIn}>
                LogOut
              </button>
              <Link href="/addtask" className={styles.primary}>
                New Task
              </Link>
            </div>

            <Image
              src={
                session.user.image
                  ? session.user.image
                  : default_profile_icon
              }
              alt="Profile"
              width={36}
              height={36}
              className={styles.profileIcon}
            />
            
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
