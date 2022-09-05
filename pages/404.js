import Link from "next/link";
import React from "react";
import * as FaIcons from "react-icons/fa";
import Layout from "../components/Layout";
import styles from "../styles/404.module.css";

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
