import { Layout } from "@components/common";
import styles from "../styles/Home.module.css";
export default function About() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h3 className={styles.title}>About iSnatch!</h3>
        <p className={styles.description}>
          We are here in a mission to build next generation cashback system
          <br></br>
          <br></br>For You
          <br></br>Yes, World Wide!
        </p>
      </main>
    </div>
  );
}

About.Layout = Layout;
