import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import { getEventBySlug } from "dataLayer/strapi/event";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as FaIcons from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const SingleEventPage = ({ event }) => {
  const router = useRouter();

  const deleteEvent = async (eventId) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/events/${eventId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(`Status Code: ${res.status} | ${data.message}`);
      } else {
        toast.success(
          `Status Code: ${res.status} | Event deleted successfully!`
        );
        router.push("/events");
      }
    }
  };

  return (
    <Layout title="Single Event">
      <ToastContainer theme="colored" />
      {event.map((x, idx) => (
        <div key={idx} className={styles.event}>
          <div className={styles.controls}>
            <Link href={`/events/edit/${x?.id}`}>
              <a>
                {" "}
                <FaIcons.FaPencilAlt /> Edit Event{" "}
              </a>
            </Link>
            <a
              href="#"
              className={styles.delete}
              onClick={() => deleteEvent(x?.id)}
            >
              <FaIcons.FaTimes /> Delete Event
            </a>
          </div>

          <span>
            {x?.attributes?.date &&
              new Date(x?.attributes?.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
            at {x?.attributes?.time}{" "}
          </span>
          <h1>{x?.attributes?.name || "N/A"}</h1>
          {x?.attributes?.image && (
            <div className={styles.image}>
              <Image
                src={
                  x?.attributes?.image?.data?.attributes?.formats?.medium?.url
                    ? x?.attributes?.image?.data?.attributes?.formats?.medium
                        ?.url
                    : "/images/event-default.png"
                }
                alt={x?.attributes?.name}
                width={960}
                height={600}
              />
            </div>
          )}

          <h3>Performers</h3>
          <p>{x?.attributes?.performers || "N/A"}</p>
          <h3>Description</h3>
          <p>{x?.attributes?.description || "N/A"}</p>
          <h3>Venue: {x?.attributes?.venue || "N/A"}</h3>
          <p>{x?.attributes?.address || "N/A"}</p>

          <Link href="/events">
            <a className={styles.back}> {"<"}Go Back</a>
          </Link>
        </div>
      ))}
    </Layout>
  );
};

export default SingleEventPage;

// server side and static generation both are working now

export async function getServerSideProps({ params }) {
  const singleEvent = await getEventBySlug({
    slug: params?.slug,
  });

  return {
    props: {
      event: singleEvent?.data,
    },
  };
}
