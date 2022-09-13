import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const EditEventPage = ({ event }) => {
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(true);

  const {
    name,
    slug,
    date,
    time,
    image,
    address,
    performers,
    venue,
    description,
  } = event?.attributes;

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const createSlug = () => {
    if (formData.name) {
      const slug = formData?.name.toLowerCase().replace(/ /g, "-");
      setFormData((prevState) => ({ ...prevState, slug }));
    } else {
      setFormData((prevState) => ({ ...prevState, slug: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(formData).some((elem) => elem === "");
    if (hasEmptyFields) {
      toast.error("Please fill up all fields");
      return;
    }

    const dataObj = { data: formData };

    const res = await fetch(`${API_URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });

    if (!res.ok) {
      toast.error(`Status Code: ${res.status} | ${res.statusText}`);
    } else {
      toast.success(`Status Code: ${res.status} | Event added successfully!`);
      const resData = await res.json();
      const { slug } = resData?.data?.attributes;

      if (slug) {
        router.push(`/events/${slug}`);
      } else {
        router.push(`/events`);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 500);
  }, [router?.query?.id]);

  return (
    <Layout title="Edit New Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>

      <ToastContainer theme="colored" />
      {pageLoading && (
        <>
          <div className={styles.grid}>
            {[...Array(7)].map((_, i) => (
              <div key={i}>
                <Skeleton width={150} height={35} />
                <Skeleton variant="rectangular" height={45} />
              </div>
            ))}
          </div>
          <div>
            <Skeleton width={150} />
            <Skeleton variant="rectangular" height={200} />
          </div>
          <div>
            <Skeleton height={60} />
          </div>
        </>
      )}

      {!pageLoading && event === null && <p>No event exist.</p>}

      {!pageLoading && event !== null && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div>
              <label htmlFor="name">
                Name <span className={styles.unique}>(Should be unique)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData?.name || name}
                onChange={handleChange}
                onBlur={createSlug}
              />
            </div>
            <div>
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData?.slug || slug}
                onChange={handleChange}
                disabled
              />
            </div>
            <div>
              <label htmlFor="performers">Performers</label>
              <input
                type="text"
                id="performers"
                name="performers"
                value={formData?.performers || performers}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="venue">Venue</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData?.venue || venue}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData?.address || address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={
                  formData?.date || new Date(date).toISOString().slice(0, 10)
                }
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="time">Time</label>
              <input
                type="text"
                id="time"
                name="time"
                value={formData?.time || time}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={formData?.description || description}
              onChange={handleChange}
            />
          </div>

          <input type="submit" value="Update Event" className="btn" />
        </form>
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
