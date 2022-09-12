import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Image from "next/image";
import Link from "next/link";
import * as FaIcons from "react-icons/fa";

const SingleEventPage = ({ event }) => {
  const {
    name,
    id,
    date,
    time,
    image,
    address,
    performers,
    venue,
    description,
  } = event?.attributes;

  const deleteEvent = () => {};

  return (
    <Layout title="Single Event">
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${id}`}>
            <a>
              {" "}
              <FaIcons.FaPencilAlt /> Edit Event{" "}
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
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

export default SingleEventPage;

// server side and static generation both are working now

export async function getServerSideProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const singleEvent = await res.json();

  return {
    props: {
      event: singleEvent?.data,
    },
  };
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/events`);
//   const events = await res.json();

//   const paths = events?.data?.map((item) => ({
//     params: { slug: item?.attributes?.slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const singleEvent = await res.json();

//   return {
//     props: {
//       event: singleEvent?.data,
//     },
//     revalidate: 1,
//   };
// }
