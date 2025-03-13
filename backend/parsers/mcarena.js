import axios from "axios";
import * as cheerio from "cheerio";
import dayjs from "dayjs";
import { ArenaEntry, TimeSlot } from "../common.js";


async function retrieve(endpoint_url, requested_date) {
  const axiosResponse = await axios.request({
    method: "GET",
    params: {
      action: "showReservations",
      type_id: "3", // ???
      date: requested_date.format("YYYY-MM-DD"),
    },
    url: endpoint_url,
  });
  return axiosResponse;
}


async function parse(data, endpoint_url, requested_date) {
  const $ = cheerio.load(data);

  const tables = $('table[class=day-reservations-table-area]');
  const courts = tables.toArray().map((table) => {
    const location = $(table).find("tr").find("th").first().text().trim();
    const availabilities = $(table)
      .find("tr")
      .toArray()
      .map((row) => {
        const time_slot_str = $(row).find("td").text().trim();
        if (time_slot_str === "") {
          return;
        }
        const is_available = ($(row).find("td").first().attr("class") === "available");
        const time_slots = time_slot_str
          .split(" - ", 2)
          .map((value) => {
            const dayOfSlot = value === "00:00" ? requested_date.clone().add(1, "DAYS") : requested_date;
            // When the court is 'Vom Betreiber blockiert', we have to remove the spaces since it was done in the same
            // paragraph
            if (value.includes("    "))
              value = value.split("    ", 1)[0]
            // Try parsing the date
            try {
              return dayjs.tz(
                  `${dayOfSlot.format("YYYY-MM-DD")} ${value}`, "YYYY-MM-DD hh:mm", "Europe/Berlin");
            } catch {
              // Happens when the row says, for example, "Kein Betrieb"
              console.log(`Could not parse '${value}' for '${endpoint_url}': invalid date time`);
            }
          });
        if (time_slots[0] === undefined)
            return null;
        return new TimeSlot(time_slots[0], time_slots[1], is_available);
      })
      .filter((availability) => availability !== undefined && availability !== null)
      .sort((a, b) => a.time_slot_start - b.time_slot_start);

    return new ArenaEntry(endpoint_url, location, requested_date, availabilities, dayjs());
  });

  return courts;
}


export async function scrape(requested_date) {
  const courts_metadata = [
    { name: "McArena Schorndorf", url: "https://schorndorf.sportbuchung.net/reservations.php" },
    { name: "McArena Esslingen", url: "https://esslingen.sportbuchung.net/reservations.php" },
    { name: "McArena Aspach", url: "https://ssl.forumedia.eu/mcarena-aspach.de/reservations.php" },
    { name: "McArena Auenstein", url: "https://auenstein.sportbuchung.net/reservations.php" },
  ];

  let results = await Promise.all(courts_metadata.map(async court_meta => {
    const response = await retrieve(court_meta.url, requested_date);
    let parsed = await parse(response.data, court_meta.url, requested_date);
    parsed.map(entry => {
      // fill in the court url so the user can be redirected directly to the correct page
      entry.source_website = `${response.request.protocol}//${response.request.host}${response.request.path}`;
      entry.court = `${court_meta.name}/${entry.court}`
    })
    return parsed;
  }));
  return results.flat(1);
}
