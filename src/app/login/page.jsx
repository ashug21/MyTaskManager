import React from "react";
import styles from "./login.module.css";
import Navbar from "../../components/Navbar/page";

const Login = () => {
  return (
    <div>
        <Navbar/>
 <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <h2 className={styles.loginHeading}>Welcome Back 👋</h2>
        <p className={styles.loginSubtext}>Please login to your account</p>

        <form className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <button className={styles.loginBtn} type="button">
            Login
          </button>
        </form>

        <p className={styles.loginSignup}>
          Don&apos;t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
    </div>
   
  );
};

export default Login;
