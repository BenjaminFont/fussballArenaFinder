import fs from "fs";

export class ParsedData {
  constructor(source_website, court, time_slot_start, time_slot_end, is_available) {
    this.source_website = source_website;
    this.court = court;
    this.time_slot_start = time_slot_start;
    this.time_slot_end = time_slot_end;
    this.is_available = is_available;
  }
}


export function writeToFile(availabilities, requestedDate) {
  // export to a files
  const jsonStr = JSON.stringify(availabilities, null, 2);
  fs.writeFileSync(
    `../gh-pages/stuttgart-soccer-24/src/scraped/mac-arena-${requestedDate.format("YYYY-MM-DD")}.json`,
    jsonStr,
    'utf8'
  );
}
