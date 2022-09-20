import styles from "@/styles/DashboardEvent.module.css";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

const DashboardEvents = ({ eventProps, handleDelete }) => {
  const { id, attributes } = eventProps;
  const { name, slug, performers, venue, address, date, time, image } =
    attributes;

  return (
    <div className={styles.event}>
      <h4 title="Go to event">
        <Link href={`/events/${slug}`}>
          <a>{name}</a>
        </Link>
      </h4>
      {date && <small>{new Date(date).toDateString()}</small>}

      <Link href={`/events/edit/${id}`}>
        <a className={styles.edit}>
          <FaPencilAlt /> <span>Edit Event</span>
        </a>
      </Link>

      <a href="#" className={styles.delete} onClick={() => handleDelete()}>
        <FaTimes /> <span>Delete</span>{" "}
      </a>
    </div>
  );
};

export default DashboardEvents;
