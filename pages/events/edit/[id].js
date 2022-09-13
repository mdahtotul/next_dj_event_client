import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as FaIcons from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const EditEventPage = ({ event }) => {
  const router = useRouter();

  const { name, date, time, image, address, performers, venue, description } =
    event?.attributes;

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
      <div className={styles.event}>
        <ToastContainer theme="colored" />

        <div className={styles.controls}>
          <Link href={`/events/edit/${event?.id}`}>
            <a>
              {" "}
              <FaIcons.FaPencilAlt /> Edit Event{" "}
            </a>
          </Link>
          <a
            href="#"
            className={styles.delete}
            onClick={() => deleteEvent(event?.id)}
          >
            <FaIcons.FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {date &&
            new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
          at {time}{" "}
        </span>
        <h1>{name}</h1>
        {image && (
          <div className={styles.image}>
            <Image
              src={
                image?.data?.attributes?.formats?.medium?.url
                  ? image?.data?.attributes?.formats?.medium?.url
                  : "/images/event-default.png"
              }
              alt={name}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers</h3>
        <p>{performers}</p>
        <h3>Description</h3>
        <p>{description}</p>
        <h3>Venue: {venue}</h3>
        <p>{address}</p>

        <Link href="/events">
          <a className={styles.back}> {"<"}Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default EditEventPage;

// server side and static generation both are working now

export async function getServerSideProps({ params }) {
  console.log("server props", params);
  const res = await fetch(`${API_URL}/api/events/${params.id}?populate=*`);
  const singleEvent = await res.json();

  return {
    props: {
      event: singleEvent?.data,
    },
  };
}
