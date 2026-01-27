import Image from "next/image";
import styles from "./analyticslook.module.css";

const AnalyticsLook = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>Track Progress With Clarity</h1>
          <p className={styles.lead}>
            Visual insights that help you understand how efficiently tasks are
            being completed over time.
          </p>

          <div className={styles.insights}>
            <div className={styles.insight}>
              <h3>Task Breakdown</h3>
              <p>
                Instantly view total tasks along with completed and pending
                counts in a clean summary.
              </p>
            </div>

            <div className={styles.insight}>
              <h3>Completion Rate</h3>
              <p>
                A simple progress indicator shows how close you are to clearing
                your workload.
              </p>
            </div>

            <div className={styles.insight}>
              <h3>Productivity Awareness</h3>
              <p>
                Identify slowdowns early and adjust priorities using real
                completion data.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <Image
            src="/Analytics.jpg"
            alt="Task analytics dashboard"
            width={520}
            height={420}
            className={styles.image}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default AnalyticsLook;
