"use client";

import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import Navbar from "../../components/Navbar/page";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import google_icon from "../../../public/google.png";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "@/Context/Theme";

const Login = () => {
  const { dark } = useContext(ThemeContext);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleGoogleLogin() {
    await signIn("google", {
      callbackUrl: "/",
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Both Fields are required");
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log(result.error);
    } else {
      toast.success("Logged In successfully!");
      router.push("/");
    }
  };

  return (
    <div>
      <Navbar />

      <div
        className={`${styles.loginWrapper} ${
          mounted && dark === "dark" ? styles.dark : ""
        }`}
      >
        <div className={styles.loginBox}>
          <h2 className={styles.loginHeading}>Welcome Back 👋</h2>
          <p className={styles.loginSubtext}>Please login to your account</p>

          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <button className={styles.loginBtn} type="submit">
              Login
            </button>

            <button
              onClick={handleGoogleLogin}
              className={`${styles.loginBtn} ${styles.googleBtn}`}
              type="button"
            >
              <Image
                src={google_icon}
                alt="Google"
                width={20}
                height={20}
                className={styles.googleIcon}
              />
              <span>Login with Google</span>
            </button>
          </form>

          <p className={styles.loginSignup}>
            Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
