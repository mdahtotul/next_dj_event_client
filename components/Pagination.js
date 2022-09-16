import styles from "@/styles/Pagination.module.css";
import Link from "next/link";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const Pagination = ({ page, total, PER_PAGE }) => {
  const last_page = Math.ceil(total / PER_PAGE);

  return (
    <div className={styles.pagination}>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">
            {" "}
            <BsArrowLeftCircleFill className={styles.icon} /> Prev
          </a>
        </Link>
      )}

      {page < last_page && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">
            {" "}
            Next
            <BsArrowRightCircleFill className={styles.icon2} />
          </a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
