import {ArenaEntry, TimeSlot} from "../common.js";
import dayjs from "dayjs";


function groupBy(array, keySelector) {
  const grouped = {};
  for (const item of array) {
    const key = keySelector(item);
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
  }
  return grouped;
}

export async function retrieveAvailableSlots(requested_date) {
  const court_meta = {
    name: "Hall of soccer",
    url: "https://www.eversports.de/widget/w/sao3ov",
    apiEndpoint: `https://www.eversports.de/widget/api/slot?facilityId=68770&sport=fussball&startDate=${requested_date.format("YYYY-MM-DD")}&courts%5B%5D=53694&courts%5B%5D=53695&courts%5B%5D=53696&courts%5B%5D=53697`
  };

  const response = await fetch(court_meta.apiEndpoint);
  const {slots: bookedSlots} = await response.json()

  const bookedSlotsToday = bookedSlots.filter(slot => slot.date === `${requested_date.format('YYYY-MM-DD')}`)
  const numberOfCourts = 4
  const bookedSlotsTodayByStartTime = groupBy(bookedSlotsToday, slot => slot.start)

  const timesWhenNoCourtIsAvailable = Object.entries(bookedSlotsTodayByStartTime).map(([startTime, slot]) => {
    return slot.length === numberOfCourts ? parseInt(startTime.substring(0,2)) : undefined
  }).filter(a => a)

  const timesWhenACourtIsAvailable = []
  for (let i = 10; i <= 23; i++) {
    !timesWhenNoCourtIsAvailable.includes(i) && timesWhenACourtIsAvailable.push(i);
  }

  const dateTimesWhenACourtIsAvailable = timesWhenACourtIsAvailable
    .map(time => dayjs(requested_date).tz('europe/berlin').set("hour", time))
    .filter((time) => time.isAfter())

  const availabilities = dateTimesWhenACourtIsAvailable.map(dateTimeWhenACourtIsAvailable => {
    return new TimeSlot(dateTimeWhenACourtIsAvailable, dayjs(dateTimeWhenACourtIsAvailable).add(1, 'hours'), true)
  })

  return new ArenaEntry(court_meta.url, 'Hall of soccer', requested_date, availabilities, dayjs())
}
