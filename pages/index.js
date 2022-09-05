import Layout from "@/components/Layout";
import { API_URL } from "../config";

export default function HomePage({ events }) {
  console.log(events);
  return (
    <Layout title="Home">
      <h1>Upcoming Events</h1>
    </Layout>
  );
}

// export async function getServerSideProps() {
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
