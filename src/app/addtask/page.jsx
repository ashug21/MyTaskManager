"use client";

import Navbar from "@/components/Navbar/page";
import styles from "./addtask.module.css";
import { useState, useEffect, useContext } from "react";
import Footer from "@/components/Footer/page";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/Context/Theme";

const TaskForm = () => {
  const { dark } = useContext(ThemeContext);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!title || !subtitle || !category || !description || !deadline) {
      toast.error("All fields are required!");
      return;
    }

    try {
      if (!session) {
        toast.error("Please login to Add Task");
        router.push("/login");
        return;
      }

      const res = await fetch("/api/addtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          subtitle,
          category,
          description,
          deadline,
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Error adding task");
        return;
      }

      toast.success("Task Added Successfully");

      setTitle("");
      setSubTitle("");
      setCategory("");
      setDescription("");
      setStatus("");
      setDeadline("");
    } catch (error) {
      toast.error("Error Adding Task" + error);
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />

      <div
        className={`${styles.wrap} ${
          mounted && dark === "dark" ? styles.dark : ""
        }`}
      >
        <div className={styles.card}>
          <h2 className={styles.title}>Create Task</h2>
          <p className={styles.subtitle}>
            Organize your work with clarity and deadlines
          </p>

          <form className={styles.form} onSubmit={handleAddTask}>
            <div className={styles.field}>
              <label>Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Task title"
              />
            </div>

            <div className={styles.field}>
              <label>Subtitle</label>
              <input
                onChange={(e) => setSubTitle(e.target.value)}
                value={subtitle}
                type="text"
                placeholder="Short task summary"
              />
            </div>

            <div className={styles.field}>
              <label>Category</label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option>Select category</option>
                <option>Work</option>
                <option>Personal</option>
                <option>Study</option>
                <option>Urgent</option>
                <option>Travel</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Description</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Detailed task description"
              ></textarea>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Deadline</label>
                <input
                  onChange={(e) => setDeadline(e.target.value)}
                  value={deadline}
                  type="date"
                />
              </div>

              <div className={styles.field}>
                <label>Status</label>
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <button type="submit" className={styles.button}>
              Create Task
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TaskForm;
