import DashboardEvents from "@/components/DashboardEvents";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { useAuthContext } from "@/context/AuthContext";
import { parseCookies } from "@/helpers/index";
import styles from "@/styles/Dashboard.module.css";
import { FaRegEnvelope, FaUserCheck } from "react-icons/fa";

const DashboardPage = ({ events }) => {
  const { user } = useAuthContext();

  const deleteEvent = (id) => {
    console.log("delete", id);
  };

  return (
    <Layout title="Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <div className={styles.owner}>
          <p>
            <FaUserCheck /> <span>{user?.username}</span>
          </p>
          <p>
            <FaRegEnvelope /> <span>{user?.email}</span>
          </p>
        </div>
      </div>
      <h3 className={styles.h3}>My Events</h3>
      {events.map((event, idx) => (
        <DashboardEvents
          key={idx}
          eventProps={event}
          handleDelete={() => deleteEvent(event?.id)}
        />
      ))}
    </Layout>
  );
};

export default DashboardPage;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/event/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: { events: events.data },
  };
}
