"use client";

import React, { useEffect, useState } from "react";
import styles from "./tasks.module.css";
import Navbar from "@/components/Navbar/page";
import Image from "next/image";
import Footer from "@/components/Footer/page";
import toast from "react-hot-toast";

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

  const deleteUserTask = async(id) => {

    if (!confirm("Are you sure you want to delete this Task?")){
      return;
    }

    try {
      const res = await fetch(`/api/addtask/${id}`,{
        method : "DELETE",
      });

      if (!res.ok) {
        console.log("Failed to delete Comment");
        return;
      }

     toast.success("Task deleted Successfully");
      getTaskData();
      
    } catch (error) {
      console.log(error);
    }
  }

  const updateStatus = async(id) => {

    try {
      
      const res = await fetch(`/api/addtask/${id}`,{
        method : "PATCH",
      });

      if(!res.ok){
        console.log("Failed to update");
        return;
      }

      toast.success("Updated Successfully");
      getTaskData();

    } catch (error) {
      console.log(error);
    }
  }

  if(tasks.length === 0){
    return(
      <div>
        <Navbar/>
 <div className={styles.emptyState}>
      <div>
        <h2>No Tasks Available</h2>
        <p>Create your first task and start staying organized.</p>
      </div>
    </div>
      </div>
     
    
    
    );
  }
  else{
    return (
      <div>
        <Navbar />
        <div className={styles.page}>
          <h1 className={styles.heading}>Your Tasks</h1>
  
          <div className={styles.grid}>
            {tasks.map((task) => (
              <div key={task.id} className={styles.card}>
                {/* TOP ROW */}
                <div className={styles.cardHeader}>
                  <div className={styles.left}>
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
  
                  <Image
                  onClick={ () => deleteUserTask(task.id)}
                    src="/bin.png"
                    alt="bin"
                    width={22}
                    height={22}
                    className={styles.icon}
                  />
                </div>
  
                <h3 className={styles.title}>{task.title}</h3>
                <p className={styles.subtitle}>{task.subtitle}</p>
  
                <p className={styles.description}>{task.description}</p>
  
                {/* BOTTOM ROW */}
                <div className={styles.footer}>
                  <span className={styles.deadline}>
                    📅 {formatSmartDate(task.deadline)}
                  </span>
  
                  <button onClick={() =>updateStatus(task.id)} className={styles.toggleBtn}>
                    Change Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
  
};

export default Tasks;
