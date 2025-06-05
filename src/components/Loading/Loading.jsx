import { Loader } from "lucide-react";
import styles from "./Loading.module.css";

function Loading() {
  return <Loader className={styles.circle}></Loader>;
}

export default Loading;
