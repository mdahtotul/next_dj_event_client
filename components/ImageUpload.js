import styles from "@/styles/Form.module.css";
import Image from "next/image";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { blobToDataURL } from "utils/handleBlobFiles";
import { API_URL } from "../config";

const ImageUpload = ({ evtId, imageUploaded }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size <= 160446) {
      blobToDataURL(file, setImagePreview);
      setImage(file);
    } else {
      toast.error("Image size is too big. Max size is 150kb");
      return;
    }
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
          {imagePreview && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Image src={imagePreview?.file} width={270} height={200} alt="" />
            </div>
          )}
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
