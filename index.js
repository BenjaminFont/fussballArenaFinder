import * as cheerio from "cheerio";
import moment from "moment";

import ParsedData from "./parsed-data.js"
import { scrape_website_data } from "./data-scraper.js";
import { dateRetriever } from "./date.utils.js";

async function scrape_mcarena_esslingen(requestedDate) {
  const esslingenEndpointUrl = "https://mcarena-esslingen.de/reservations.php";
  const esslingenRawData = await scrape_website_data(esslingenEndpointUrl, requestedDate);
  const $ = cheerio.load(esslingenRawData);

  const availabilities = [];

  const tables = $('table[class=day-reservations-table-area]')
  tables.each(function (i, elm) {
    const location = $(this).find("tr").find("th").first().text().trim();

    $(this).find("tr").map(function (_, elmInner) {
      const timeSlotStr = $(elmInner).find("td").text().trim();
      if (timeSlotStr === "") {
        return
      }

      const isAvailable = ($(elmInner).find("td").first().attr("class") == 'available');
      const timeSlots = dateRetriever(timeSlotStr, requestedDate);

      availabilities.push(new ParsedData(
        esslingenEndpointUrl, location, timeSlots[0], timeSlots[1], isAvailable
      ))

    })

  })

  availabilities.sort((a, b) => (a.time_slot_start - b.time_slot_start));
  return availabilities;
}

const requested_date = moment().format("YYYY-MM-DD");
console.log(requested_date);
const availabilities = await scrape_mcarena_esslingen(requested_date);
// now for the parser we print only available slots
const date_format = "DD MMM hh:mm"
// TODO Output generisch fuer verschiedene Arenen
availabilities.forEach((elem) => {
  if (elem.is_available)
    console.log(`Court ${elem.court} is available between ${elem.time_slot_start.format(date_format)} and ${elem.time_slot_end.format(date_format)}`)
});
