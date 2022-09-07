import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";

export default function HomePage({ events }) {
  return (
    <Layout title="Home">
      <h1>Upcoming Events</h1>
      {events?.length === 0 && <h3>No events to show</h3>}

      {events?.length > 0 &&
        events?.map((item, idx) => <EventItem key={idx} eventObj={item} />)}

      {events?.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

// export async function getServerSideProps() {
export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/api/events?sort=date:ASC&pagination[limit]=3&populate=*`
  );
  const events = await res.json();

  return {
    props: { events: events?.data },
    revalidate: 1,
  };
}
