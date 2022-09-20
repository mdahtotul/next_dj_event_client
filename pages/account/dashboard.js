import DashboardEvents from "@/components/DashboardEvents";
import Layout from "@/components/Layout";
import LoginFirst from "@/components/LoginFirst";
import { API_URL } from "@/config/index";
import { useAuthContext } from "@/context/AuthContext";
import { parseCookies } from "@/helpers/index";
import styles from "@/styles/Dashboard.module.css";
import { useRouter } from "next/router";
import { FaRegEnvelope, FaUserCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const DashboardPage = ({ events, token }) => {
  const { user } = useAuthContext();

  const router = useRouter();

  const deleteEvent = async (eventId) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error(`Status Code: ${res.status} | Need Authorization!`);
          return;
        }
        toast.error(`Status Code: ${res.status} | Couldn't delete event!`);
      } else {
        toast.success(
          `Status Code: ${res.status} | Event deleted successfully!`
        );
        router.reload("/account/dashboard");
      }
    }
  };

  return (
    <>
      {token ? (
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
      ) : (
        <Layout title="Unauthorized">
          <LoginFirst />
        </Layout>
      )}
    </>
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
    props: {
      events: events.data,
      token: token || null,
    },
  };
}
