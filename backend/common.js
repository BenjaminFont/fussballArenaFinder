import fs from "fs";

export class ArenaEntry {
  constructor(source_website, court, day, results, parsed_at) {
    this.source_website = source_website;
    this.court = court;
    this.day = day;
    this.results = results;
    this.parsed_at = parsed_at;
  }
}

export class TimeSlot {
  constructor(time_slot_start, time_slot_end) {
    this.time_slot_start = time_slot_start;
    this.time_slot_end = time_slot_end;
  }
}


export function writeToFile(availabilities, requestedDate) {
  // export to a files
  const jsonStr = JSON.stringify(availabilities, null, 2);
  fs.writeFileSync(
    `../gh-pages/stuttgart-soccer-24/src/scraped/data.json`,
    jsonStr,
    'utf8'
  );
}
