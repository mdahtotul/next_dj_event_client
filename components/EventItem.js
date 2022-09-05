import styles from "@/styles/EventItem.module.css";
import Image from "next/image";
import Link from "next/link";

const EventItem = ({ event }) => {
  const { name, slug, venue, address, time, date, performers, image } = event;
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={image ? image : "/images/event-default.png"}
          alt="image event"
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>
          {date} at {time}
        </span>
        <h3>{name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
