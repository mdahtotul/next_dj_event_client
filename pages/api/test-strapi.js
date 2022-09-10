import { getEventByName } from "dataLayer/strapi/event";

// HACK: before testing api import function from "dataLayer/strapi/event"
// export default async function handler(req, res) {
//   const data = await getEventsSlugs();
//   res.status(200).json(data);
// }

// NOTE: test done for getting query by event slug
// import {getEventBySlug} from "dataLayer/strapi/event";
// export default async function handler(req, res) {
//   const slugArr = Object.keys(req.query);
//   const slug = slugArr[0];
//   const data = await getEventBySlug({
//     slug: slug,
//   });
//   res.status(200).json(data);
// }

// NOTE: test done for getting query by event name
// import {getEventByName} from "dataLayer/strapi/event";
export default async function handler(req, res) {
  const data = await getEventByName({
    name: "Throwback",
  });
  res.status(200).json(data);
}

// NOTE: test done for getting event users_permissions email
// import {getEventByUser} from "dataLayer/strapi/event";
// export default async function handler(req, res) {
//   const data = await getEventByUser({
//     email: "mdahtotul@gmail.com",
//   });
//   res.status(200).json(data);
// }

// NOTE: test done for getting event users_permissions email
// import {getLimitedEvent} from "dataLayer/strapi/event";
// export default async function handler(req, res) {
//   const data = await getLimitedEvent({ start: 2, limit: 3 });
//   res.status(200).json(data);
// }
