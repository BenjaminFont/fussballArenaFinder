import axios from "axios";
import * as cheerio from "cheerio";
import moment from "moment";
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

  let courts = [];

  const tables = $('table[class=day-reservations-table-area]')
  tables.each(function (i, elm) {
    const location = $(this).find("tr").find("th").first().text().trim();
    let availabilities = [];
    const result = $(this).find("tr").map(function (i_inner, elm_inner) {
      const time_slot_str = $(elm_inner).find("td").text().trim();
      if (time_slot_str === "") {
        return
      }
      // check if available
      const is_available = ($(elm_inner).find("td").first().attr("class") == 'available');
      // now build the object
      // split and re-parse the date in the format '08:00 - 08:30'
      const time_slots = time_slot_str.split(" - ", 2).map((value) => moment(`${requested_date.format("YYYY-MM-DD")} ${value}`, "YYYY-MM-DD hh:mm"));

      availabilities.push(new TimeSlot(time_slots[0], time_slots[1], is_available));
    });
    availabilities.sort((a, b) => (a.time_slot_start - b.time_slot_start));
    courts.push(new ArenaEntry(endpoint_url, location, requested_date, availabilities, moment()));
  })
  return courts;
}


export async function scrape(requested_date) {
  const urls = [
    "https://mcarena-schorndorf.de/reservations.php",
    "https://mcarena-esslingen.de/reservations.php",
    "https://ssl.forumedia.eu/mcarena-aspach.de/reservations.php",
    "https://www.mcarena-auenstein.de/reservations.php",
  ];

  let results = await Promise.all(urls.map(async url => {
    const response = await retrieve(url, requested_date);
    let parsed = await parse(response.data, url, requested_date);
    return parsed;
  }));
  return results.flat(1);
}
