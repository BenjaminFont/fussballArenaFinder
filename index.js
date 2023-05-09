import axios from "axios";
import * as cheerio from "cheerio";
import moment from "moment";
import fs from "fs";

class ParsedData {
  constructor(source_website, court, time_slot_start, time_slot_end, is_available) {
    this.source_website = source_website;
    this.court = court;
    this.time_slot_start = time_slot_start;
    this.time_slot_end = time_slot_end;
    this.is_available = is_available;
  }
}

async function scrape_mcarena_esslingen(requested_date) {
  const endpoint_url = "https://mcarena-esslingen.de/reservations.php";
  const axiosResponse = await axios.request({
    method: "GET",
    params: {
      action: "showReservations",
      type_id: "3", // ???
      date: requested_date.format("YYYY-MM-DD"),
    },
    url: endpoint_url,
  })

  const $ = cheerio.load(axiosResponse.data);

  let availabilities = [];

  const tables = $('table[class=day-reservations-table-area]')
  tables.each(function (i, elm) {
    const location = $(this).find("tr").find("th").first().text().trim();
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
      availabilities.push(new ParsedData(
        endpoint_url, location, time_slots[0], time_slots[1], is_available
      ))
    })
  })
  // sort
  availabilities.sort((a, b) => (a.time_slot_start - b.time_slot_start));
  return availabilities;
}


const parsingDate = "2023-05-10"
const requestedDate = new moment(parsingDate);
const availabilities = await scrape_mcarena_esslingen(requestedDate);
// now for the parser we print only available slots
const date_format = "DD MMM hh:mm"
availabilities.forEach((elem) => {
  if (elem.is_available)
    console.log(`Court ${elem.court} is available between ${elem.time_slot_start.format(date_format)} and ${elem.time_slot_end.format(date_format)}`)
});

// export to a files
const jsonStr = JSON.stringify(availabilities, null, 2);
fs.writeFileSync(`gh-pages/stuttgart-soccer-24/src/data.json`, jsonStr, 'utf8');
