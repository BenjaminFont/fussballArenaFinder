import moment from "moment";
import { writeToFile } from "./common.js";
import { scrape } from './parsers/mcarena.js';

// parse from argv
const arg = process.argv[2];

const parsingDate = arg ? moment(arg, 'YYYY-MM-DD') : moment().startOf('day');
const requestedDate = new moment(parsingDate);
console.log(`Running scraper at the date ${requestedDate}`);
const availabilities = await scrape(requestedDate);
// now for the parser we print only available slots
// const date_format = "DD MMM hh:mm"
// availabilities.forEach((elem) => {
//   if (elem.is_available)
//     console.log(`Court ${elem.court} is available between ${elem.time_slot_start.format(date_format)} and ${elem.time_slot_end.format(date_format)}`)
// });

console.log(availabilities);
writeToFile(availabilities, requestedDate);
