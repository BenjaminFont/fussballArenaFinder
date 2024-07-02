import moment from "moment";
import {writeToFile} from "./common.js";
import {scrape} from './parsers/mcarena.js';
import {retrieveAvailableSlots} from './parsers/hallofsoccer.js';
import soccerOlympScraper from "./parsers/soccerolymp.js";

// parse from argv
const arg = process.argv[2];
const parsingDate = arg ? moment(arg, 'YYYY-MM-DD') : moment().startOf('day');
const endDate = parsingDate.clone().add(3, 'days');
// generate filenames
const fileNames = ["data_today", "data_tomorrow", "data_overmorrow"];
let i = 0;
for (let m = parsingDate.clone(); m.isBefore(endDate); m.add(1, 'days')) {
  const requestedDate = new moment(m);
  console.log(`Running scraper at the date ${requestedDate}`);

  const getAvailableMcArenaSlots = scrape(requestedDate);
  const getAvailableHallofsoccerSlots = retrieveAvailableSlots(requestedDate);
  const getAvialbleSoccerOlympSlots = soccerOlympScraper(requestedDate);

  const availabilities = (await Promise.all([getAvailableMcArenaSlots, getAvailableHallofsoccerSlots, getAvialbleSoccerOlympSlots])).flat(1);

  writeToFile(availabilities, fileNames[i]);
  i += 1;
}
