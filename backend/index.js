import moment from "moment";
import { writeToFile } from "./common.js";
import { scrape } from './parsers/mcarena.js';


// parse from argv
const arg = process.argv[2];
const parsingDate = arg ? moment(arg, 'YYYY-MM-DD') : moment().startOf('day');
const endDate = parsingDate.clone().add(3, 'days');
// generate filenames
const fileNames = ["data_today", "data_tomorrow", "data_overmorrow"];
var i = 0;
for (var m = parsingDate.clone(); m.isBefore(endDate); m.add(1, 'days')) {
  const requestedDate = new moment(m);
  console.log(`Running scraper at the date ${requestedDate}`);
  const availabilities = await scrape(requestedDate);
  writeToFile(availabilities, fileNames[i]);
  i += 1;
}
