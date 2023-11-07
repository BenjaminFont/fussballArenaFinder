import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


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
  constructor(time_slot_start, time_slot_end, is_available) {
    this.time_slot_start = time_slot_start;
    this.time_slot_end = time_slot_end;
    this.is_available = is_available;
  }
}


export function writeToFile(availabilities, filename) {
  // find relative path, in case script is executed from different directory
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const relativePath = path.join(__dirname, '..', `gh-pages/stuttgart-soccer-24/src/scraped/${filename}.json`);
  // export to file
  const jsonStr = JSON.stringify(availabilities, null, 2);
  fs.writeFileSync(
    relativePath,
    jsonStr,
    'utf8'
  );
}
