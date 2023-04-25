export default class ParsedData {
    constructor(source_website, court, time_slot_start, time_slot_end, is_available) {
      this.source_website = source_website;
      this.court = court;
      this.time_slot_start = time_slot_start;
      this.time_slot_end = time_slot_end;
      this.is_available = is_available;
    }
}
