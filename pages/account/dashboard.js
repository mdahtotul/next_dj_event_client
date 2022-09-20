import DashboardEvents from "@/components/DashboardEvents";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { useAuthContext } from "@/context/AuthContext";
import { parseCookies } from "@/helpers/index";
import styles from "@/styles/Dashboard.module.css";

const DashboardPage = ({ events }) => {
  const { user } = useAuthContext();

  console.log(events);

  const deleteEvent = (id) => {
    console.log("delete", id);
  };

  return (
    <Layout title="Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <p>{user?.username}</p>
        <p>{user?.email}</p>
        <h3>My Events</h3>
      </div>
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
