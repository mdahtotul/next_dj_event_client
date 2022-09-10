import styles from "@/styles/SearchEvent.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const SearchEvent = ({ thumb, name, slug, time, date, setShowSearch }) => {
  const router = useRouter();

  const goToEvent = (slug) => {
    router.push(`/events/${slug}`);
    setShowSearch(false);
  };

  return (
    <div
      className={styles.list_event}
      title="Go to event"
      onClick={() => goToEvent(slug)}
    >
      <div className={styles.fig}>
        <Image src={thumb} alt={name} width={70} height={50} />
      </div>
      <div className={styles.name_date}>
        <h3>{name}</h3>
        <p>
          {date &&
            new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
          at {time}
        </p>
      </div>
    </div>
  );
};

export default SearchEvent;
