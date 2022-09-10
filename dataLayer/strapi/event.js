import { API_URL } from "@/config/index";
import qs from "qs";

export const getEventsSlugs = async () => {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  const rawSlugs = events.data;

  const slugs = rawSlugs?.map((item) => ({
    params: { slug: item?.attributes?.slug },
  }));

  return slugs;
};

export const getEventBySlug = async ({ slug }) => {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      // populate: "*", // NOTE: use this if u want to populate all fields
      populate: ["image", "users_permissions"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${API_URL}/api/events?${query}`);
  const jsonEvent = await res.json();
  return jsonEvent;
};

export const getEventByName = async ({ name }) => {
  console.log("name", name);
  const query = qs.stringify(
    {
      filters: {
        name: {
          $containsi: name,
        },
      },
      // populate: "*", // NOTE: use this if u want to populate all fields
      populate: ["image", "users_permissions"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${API_URL}/api/events?${query}`);
  const jsonEvent = await res.json();
  return jsonEvent;
};

export const getEventByUser = async ({ email }) => {
  const query = qs.stringify(
    {
      filters: {
        users_permissions: {
          email: {
            $eq: email,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${API_URL}/api/events?${query}`);
  const jsonEvent = await res.json();
  return jsonEvent;
};

export const getLimitedEvent = async ({ start = 0, limit = 2 } = {}) => {
  const query = qs.stringify(
    {
      pagination: {
        start,
        limit,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${API_URL}/api/events?${query}`);
  const jsonLimitedEvent = await res.json();
  return jsonLimitedEvent;
};
