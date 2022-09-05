import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

const SingleEventPage = ({ event }) => {
  const { name } = event;

  return (
    <Layout title="Single Event">
      <h1>Single event page</h1>
      <p>{name}</p>
    </Layout>
  );
};

export default SingleEventPage;

// export async function getServerSideProps({ query: { slug } }) {
//   console.log(slug);

//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const singleEvent = await res.json();

//   return {
//     props: {
//       event: singleEvent[0],
//     },
//   };
// }

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  const paths = events.map((item) => ({
    params: { slug: item.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const singleEvent = await res.json();

  return {
    props: {
      event: singleEvent[0],
    },
    revalidate: 1,
  };
}
