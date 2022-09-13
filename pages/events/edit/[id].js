import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const EditEventPage = ({ event }) => {
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(true);

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

  useEffect(() => {
    setPageLoading(false);
  }, [router?.query?.id]);

  return (
    <Layout title="Single Event">
      <ToastContainer theme="colored" />
      {pageLoading && (
        <div className={styles.event}>
          <div className={styles.load_controls}>
            <Skeleton />
            <Skeleton />
          </div>
          <div className={styles.load_date}>
            <Skeleton />
          </div>
          <div className={styles.load_name}>
            <Skeleton height={80} />
          </div>
          <div className={styles.load_img}>
            <Skeleton variant="rectangular" height={600} />
          </div>
          <div className={styles.load_name}>
            <Skeleton height={80} />
          </div>
          <div>
            <Skeleton />
          </div>
          <div className={styles.load_name}>
            <Skeleton height={80} />
          </div>
          <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div className={styles.load_name}>
            <Skeleton height={80} />
          </div>
          <div>
            <Skeleton />
          </div>
          <div>
            <Skeleton width={100} />
          </div>
        </div>
      )}

      {!pageLoading && event === null && <p>No event exist.</p>}

      {!pageLoading && event !== null && (
        <div className={styles.event}>
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
      )}
    </Layout>
  );
};

export default EditEventPage;

// server side and static generation both are working now
export async function getServerSideProps({ params }) {
  const res = await fetch(`${API_URL}/api/events/${params.id}?populate=*`);
  const singleEvent = await res.json();

  return {
    props: {
      event: singleEvent?.data,
    },
  };
}
