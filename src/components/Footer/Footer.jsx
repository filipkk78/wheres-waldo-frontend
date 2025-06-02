import styles from "./Footer.module.css";
import { Github } from "lucide-react";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Github />
      <a href="https://github.com/filipkk78"> filipkk78</a>
    </footer>
  );
}

export default Footer;
