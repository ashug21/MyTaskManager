"use client"

import React, { useState } from "react";
import styles from "./signup.module.css";
import Navbar from "@/components/Navbar/page";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const Signup = () => {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [reEnterPassword , setReEnterPassword] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All Fields are required");
      return;
    }

    if(password.length < 8){
      toast.error("Password should be of 8 digits");
      return;
    }

    if(password === "12345678" || password === "password" || password === "00000000" || password === "11111111"
      || password === "qwertyui"){
      toast("Choose a Strong Password");
      return;
    }

    if(password != reEnterPassword){
      toast.error("Both Passwords should be equal");
      return;
    }

    const loadingToast = toast.loading("Creating account...");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
     finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div>
        <Navbar/>
<div className={styles.signupWrapper}>
      <div className={styles.signupBox}>
        <h2 className={styles.signupHeading}>Create Account</h2>
        <p className={styles.signupSubtext}>
          Join now to start managing your tasks.
        </p>

        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input  onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter your name" />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input  onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email" />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter password" />
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input onChange={(e) => setReEnterPassword(e.target.value)} value={reEnterPassword} type="password" placeholder="Re-enter password" />
          </div>

          <button type="submit" className={styles.signupBtn}>
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
