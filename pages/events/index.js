import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

const PER_PAGE = 2;

export default function EventsPage({ events }) {
  return (
    <Layout title="Home">
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events?.length > 0 &&
        events.map((item, idx) => <EventItem key={idx} eventObj={item} />)}
    </Layout>
  );
}

// export async function getServerSideProps() {
export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const res = await fetch(
    `${API_URL}/api/events?sort=date:ASC&pagination[start]=${start}&pagination[limit]=${PER_PAGE}&populate=*`
  );
  const events = await res.json();

  return {
    props: { events: events?.data },
  };
}
