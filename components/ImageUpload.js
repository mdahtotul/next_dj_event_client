import styles from "@/styles/Form.module.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { API_URL } from "../config";

const ImageUpload = ({ evtId, imageUploaded }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.info("Uploading image...");

    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "api::event.event");
    formData.append("refId", evtId);
    formData.append("field", "image");

    const url = `${API_URL}/api/upload`;
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      console.log(res);
      imageUploaded();
      setLoading(false);
      toast.success(
        `Status Code ${res.status} ::: Image uploaded successfully`
      );
    } else {
      toast.error(`Status Code ${res.status} ::: ${res.statusText}`);
      setLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <ToastContainer theme="colored" />

      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
          />
        </div>

        {!loading && <input type="submit" value="Upload" className="btn" />}
      </form>
    </div>
  );
};

export default ImageUpload;
