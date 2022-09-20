import ImageUpload from "@/components/ImageUpload";
import Layout from "@/components/Layout";
import LoginFirst from "@/components/LoginFirst";
import Modal from "@/components/Modal";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import styles from "@/styles/Form.module.css";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const EditEventPage = ({ event, token }) => {
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
    name: name,
    slug: slug,
    performers: performers,
    venue: venue,
    address: address,
    date: date,
    time: time,
    description: description,
  });

  const [imagePreview, setImagePreview] = useState(
    image?.data?.attributes?.formats?.thumbnail?.url || null
  );

  const [showModal, setShowModal] = useState(false);

  const handleModalShow = () => {
    setShowModal(true);
    window.scrollTo(0, 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const createSlug = () => {
    if (formData?.name) {
      const slug = formData?.name.toLowerCase().replace(/ /g, "-");
      setFormData((prevState) => ({ ...prevState, slug }));
    } else {
      setFormData((prevState) => ({ ...prevState, slug: "" }));
    }
  };

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/api/events/${event?.id}?populate=*`);
    const data = await res.json();
    setImagePreview(
      data?.data?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url
    );
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(formData).some((elem) => elem === "");
    if (hasEmptyFields) {
      toast.error("Please fill up all fields");
      return;
    }

    const dataObj = { data: formData };

    const res = await fetch(`${API_URL}/api/events/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataObj),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error(`Status Code: ${res.status} | Need Authorization!`);
        return;
      }
      toast.error(`Status Code: ${res.status} | Couldn't update event!`);
    } else {
      toast.success(`Status Code: ${res.status} | Event update successfully!`);
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
    setPageLoading(false);
  }, [router?.query?.id]);

  return (
    <>
      {token ? (
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
            <>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.grid}>
                  <div>
                    <label htmlFor="name">
                      Name{" "}
                      <span className={styles.unique}>(Should be unique)</span>
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
                      value={new Date(formData?.date)
                        .toISOString()
                        .slice(0, 10)}
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

                <input type="submit" value="Update Event" className="btn" />
              </form>
              <h2>Image Preview</h2>
              {imagePreview ? (
                <Image src={imagePreview} height={100} width={170} />
              ) : (
                <div>
                  <Image
                    src="/images/event-default.png"
                    height={100}
                    width={170}
                  />
                  <p>No image uploaded</p>
                </div>
              )}
              <div>
                <button onClick={handleModalShow} className="btn-secondary">
                  <FaImage
                    style={{
                      marginRight: "5px",
                    }}
                  />
                  Set Image
                </button>
              </div>

              <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload
                  evtId={event.id}
                  imageUploaded={imageUploaded}
                  token={token}
                />
              </Modal>
            </>
          )}
        </Layout>
      ) : (
        <Layout title="Unauthorized">
          {" "}
          <LoginFirst />{" "}
        </Layout>
      )}
    </>
  );
};

export default EditEventPage;

// server side and static generation both are working now
export async function getServerSideProps({ params, req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/events/${params.id}?populate=*`);
  const singleEvent = await res.json();

  return {
    props: {
      event: singleEvent?.data,
      token: token || null,
    },
  };
}
