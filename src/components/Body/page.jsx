import React from "react";
import styles from "./body.module.css";

const Body = () => {
  return (
    <section className={styles.features}>
      <h2 className={styles.heading}>Why TaskFlow?</h2>

      <div className={styles.cards}>
        <div className={styles.feature}>
          <h3>✅ Create & Manage Tasks</h3>
          <p>
            Quickly add, edit, and organize your tasks with clean and intuitive
            controls.
          </p>
        </div>

        <div className={styles.feature}>
          <h3>📅 Set Deadlines & Reminders</h3>
          <p>
            Never miss a task with automatic reminders and due-date tracking.
          </p>
        </div>

        <div className={styles.feature}>
          <h3>📊 Track Your Progress</h3>
          <p>
            Visualize your task completion and productivity stats over time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Body;
