import Image from "next/image";
import styles from "./tasklook.module.css";

const TaskLook = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Image
            src="/Tasks.jpg"
            alt="Task manager interface preview"
            width={620}
            height={420}
            className={styles.image}
            priority
          />
        </div>

        <div className={styles.right}>
          <h1>Organize Work Without Overthinking</h1>
          <p className={styles.lead}>
            A clean task manager designed to help you focus on execution, not
            clutter.
          </p>

          <div className={styles.points}>
            <div className={styles.point}>
              <h3>Clear Task Cards</h3>
              <p>
                Each task is presented with clear status, category, and deadlines
                so nothing gets lost.
              </p>
            </div>

            <div className={styles.point}>
              <h3>Status-Driven Workflow</h3>
              <p>
                Instantly see what’s pending, completed, or urgent at a glance
                without digging through lists.
              </p>
            </div>

            <div className={styles.point}>
              <h3>Minimal & Professional UI</h3>
              <p>
                Designed to stay out of your way and help you stay consistent
                across work and personal goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskLook;
