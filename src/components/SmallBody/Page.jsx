"use client";

import React, { useEffect, useState , useRef } from "react";
import styles from "./SmallBody.module.css";

const SmallBody = () => {

    const [canRun, setCanRun] = useState(false);
    
    const [num1 , setNum1] = useState(0);
    const [num2 , setNum2] = useState(0);
    const [num3 , setNum3] = useState(0);



    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY >= 120) {
            setCanRun(true);
            window.removeEventListener("scroll", handleScroll);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

     
      useEffect(() => {
        if (!canRun){
             return;
        }

        setTimeout(() => {
            if(num1 != 29){
            setNum1(prev => prev + 1);
            }
            if(num2 != 79){
            setNum2(prev => prev + 1);
            }
            if(num3 != 45){
            setNum3(prev => prev + 1);
            }
        },30)
    },);

  return (
    <section className={styles.wrapper}>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <div className={styles.card}>
          <h2>{num1}+</h2>
          <p>Active users organizing tasks every day</p>

        </div>

        <div className={styles.card}>
          <h2>{num2}+</h2>
          <p>Tasks created, tracked, and completed daily</p>

        </div>

        <div className={styles.card}>
          <h2>{num3}+</h2>
          <p>Users staying productive and on schedule</p>

        </div>
      </div>
    </section>
  );
};

export default SmallBody;
