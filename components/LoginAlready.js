import styles from "@/styles/404.module.css";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const LoginAlready = ({ text }) => {
  return (
    <div className={styles.error}>
      <h1>
        {" "}
        <FaExclamationTriangle /> Authorized!
      </h1>
      <h4>You are already Logged in. No need to {text} again</h4>
      <Link href="/account/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default LoginAlready;
