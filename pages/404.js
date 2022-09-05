import Layout from "@/components/Layout";
import styles from "@/styles/404.module.css";
import Link from "next/link";
import * as FaIcons from "react-icons/fa";

const NotFound = () => {
  return (
    <Layout title="Page Not Found">
      <div className={styles.error}>
        <h1>
          {" "}
          <FaIcons.FaExclamationTriangle /> 404
        </h1>
        <h4>Sorry, there is nothing here</h4>
        <Link href="/">Go Back home</Link>
      </div>
    </Layout>
  );
};

export default NotFound;
