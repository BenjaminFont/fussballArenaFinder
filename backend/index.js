import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import {writeToFile} from "./common.js";
import {scrape} from './parsers/mcarena.js';
import {retrieveAvailableSlots} from './parsers/hallofsoccer.js';
import soccerOlympScraper from "./parsers/soccerolymp.js";

dayjs.extend(utc);
dayjs.extend(timezone);

// parse from argv
const arg = process.argv[2];
const parsingDate = arg ? dayjs(arg, 'YYYY-MM-DD') : dayjs().startOf('day');
// generate filenames
const fileNames = {
    "data_today": parsingDate,
    "data_tomorrow": parsingDate.add(1, 'days'),
    "data_overmorrow": parsingDate.add(2, 'days'),
};

for (const [filename, m] of Object.entries(fileNames)) {
    const requestedDate = new dayjs(m);
    console.log(`Running scraper at the date ${requestedDate}`);

    const getAvailableMcArenaSlots = scrape(requestedDate);
    const getAvailableHallofsoccerSlots = retrieveAvailableSlots(requestedDate);
    const getAvialbleSoccerOlympSlots = soccerOlympScraper(requestedDate);

    const availabilities = (await Promise.all([
        getAvailableMcArenaSlots, getAvailableHallofsoccerSlots, getAvialbleSoccerOlympSlots
    ])).flat(1);

    writeToFile(availabilities, filename);
}
