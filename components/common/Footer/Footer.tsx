import { FC } from "react";
import styles from "./Footer.module.css"

const FooterComponent: FC = () => {
  return (
      <footer className={styles.footer}>
        <a
          href="https://www.linkedin.com/in/zamanhasib/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by Hasib
        </a>
      </footer>
  );
};

export default FooterComponent;
