"use client";

import React, { useEffect, useState } from "react";
import styles from "./tasks.module.css";
import Navbar from "@/components/Navbar/page";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const getTaskData = async () => {
    try {
      const res = await fetch("/api/addtask");
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskData();
  }, []);

  const formatSmartDate = (date) => {
    const d = new Date(date);
    const today = new Date();

    const diff = Math.floor((d - today) / (1000 * 60 * 60 * 24));

    if (diff === -1) return "Today";
    if (diff === 0) return "Tomorrow";
    if (diff === -2) return "Yesterday";

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <Navbar />
      <div className={styles.page}>
        <h1 className={styles.heading}>Your Tasks</h1>

        <div className={styles.grid}>
          {tasks.map((task) => (
            <div key={task.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.category}>{task.category}</span>
                <span
                  className={`${styles.status} ${
                    task.status === "completed"
                      ? styles.completed
                      : styles.pending
                  }`}
                >
                  {task.status || "pending"}
                </span>
              </div>

              <h3 className={styles.title}>{task.title}</h3>
              <p className={styles.subtitle}>{task.subtitle}</p>

              <p className={styles.description}>{task.description}</p>

              <div className={styles.footer}>
                <span className={styles.deadline}>
                  📅 {formatSmartDate(task.deadline)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
