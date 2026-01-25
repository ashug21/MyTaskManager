import React from "react";
import styles from "./signup.module.css";
import Navbar from "@/components/Navbar/page";


const Signup = () => {

  return (
    <div>
        <Navbar/>
<div className={styles.signupWrapper}>
      <div className={styles.signupBox}>
        <h2 className={styles.signupHeading}>Create Account</h2>
        <p className={styles.signupSubtext}>
          Join now to start managing your tasks.
        </p>

        <form className={styles.signupForm}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input type="password" placeholder="Enter password" />
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input type="password" placeholder="Re-enter password" />
          </div>

          <button type="button" className={styles.signupBtn}>
            Sign Up
          </button>
        </form>

        <p className={styles.signupLogin}>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
    </div>
    
  );
};

export default Signup;
