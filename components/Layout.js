import styles from "@/styles/Layout.module.css";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ title, keywords, description, children }) => {
  const pageTitle = title ? `DJ Events - ${title}` : "DJ Events";
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      <div className={styles.container}>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  description: "Find the latest DJ and other musical events",
  keywords: "music, dj, edm, events",
};
