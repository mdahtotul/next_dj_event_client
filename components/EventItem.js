import styles from "@/styles/EventItem.module.css";
import Image from "next/image";
import Link from "next/link";

const EventItem = ({ eventObj }) => {
  const { attributes } = eventObj;
  const { name, slug, time, date, image } = attributes;

  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            image?.data?.attributes?.formats?.thumbnail?.url
              ? image?.data?.attributes?.formats?.thumbnail?.url
              : "/images/event-default.png"
          }
          alt="image event"
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>
          {date &&
            new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
          at {time}
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
