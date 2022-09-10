import styles from "@/styles/Search.module.css";
import { getEventByName } from "dataLayer/strapi/event";
import { useState } from "react";
import SearchEvent from "./SearchEvent";

const Search = () => {
  const [term, setTerm] = useState("");
  const [searchEvents, setSearchEvent] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (term) {
      getEventByName({
        name: term,
      })
        .then((res) => {
          setSearchEvent(res?.data);
        })
        .catch((err) => console.log("error in line 18", err));

      setTerm("");
      setShowSearch(true);
    } else {
      setSearchEvent([]);
      setShowSearch(false);
    }
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search events"
        />
      </form>
      {showSearch && searchEvents?.length > 0 && (
        <div className={styles.search_events}>
          <div>Events found: {searchEvents?.length}</div>
          {searchEvents?.map((item, idx) => (
            <SearchEvent
              key={idx}
              thumb={
                item?.attributes?.image?.data?.attributes?.formats?.thumbnail
                  ?.url
              }
              name={item?.attributes?.name}
              slug={item?.attributes?.slug}
              time={item?.attributes?.time}
              date={item?.attributes?.date}
              setShowSearch={setShowSearch}
            />
          ))}
        </div>
      )}
      {showSearch && searchEvents?.length === 0 && (
        <div className={styles.search_events}>
          <p className={styles.not_found}>No data found!</p>
        </div>
      )}
    </div>
  );
};

export default Search;
