import styles from "@/styles/404.module.css";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const LoginFirst = () => {
  return (
    <div className={styles.error}>
      <h1>
        {" "}
        <FaExclamationTriangle /> 401
      </h1>
      <h4>Sorry, You are not authorized for this page</h4>
      <Link href="/account/login">Please login first</Link>
    </div>
  );
};

export default LoginFirst;
