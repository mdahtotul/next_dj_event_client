import styles from "@/styles/Layout.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";
import Showcase from "./Showcase";

const Layout = ({ title, keywords, description, children }) => {
  const pageTitle = title ? `DJ Events - ${title}` : "DJ Events";

  const { pathname } = useRouter();

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      {pathname === "/" && <Showcase />}

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
