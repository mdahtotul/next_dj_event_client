import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import styles from "@/styles/Form.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddEventPage = ({ token }) => {
  const router = useRouter();

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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataObj),
    });

    if (!res.ok) {
      toast.error(`Status Code: ${res.status} | ${res.statusText}`);
    } else {
      toast.success(`Status Code: ${res.status} | Event added successfully!`);
      const resData = await res.json();

      const { slug } = resData;

      if (slug) {
        router.push(`/events/${slug}`);
      } else {
        router.push(`/events`);
      }
    }
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Add Event</h1>

      <ToastContainer theme="colored" />

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
              value={formData?.name}
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
              value={formData?.slug}
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
              value={formData?.performers}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData?.venue}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData?.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData?.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={formData?.time}
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
            value={formData?.description}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
};

export default AddEventPage;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token: token || null,
    },
  };
}
