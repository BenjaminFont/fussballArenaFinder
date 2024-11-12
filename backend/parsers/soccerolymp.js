import axios from "axios";
import dayjs from "dayjs";
import { ArenaEntry, TimeSlot } from "../common.js";


async function getCourtAvailableTimeSlots(courtId, requested_date) {
    const axiosResponse = await axios.request({
      method: "GET",
      params: {
        CourtId: courtId,
        dateString: requested_date.format("DD.MM.YYYY"),
        _: 1719937252223
      },
      headers: {
        "Cookie": "DateString=02.07.2024; OrderSession=7f778735-b0ce-4ce9-b3ae-a4d51e033ad9",

      },
      url: "https://booking.soccerolymp.de/api/court/getCourtList",
    });
    return JSON.parse(axiosResponse.data);
  }


async function getCourts() {
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://booking.soccerolymp.de/api/court/getCourts",
      });
      return JSON.parse(axiosResponse.data);
}

export async function scrape(requested_date) {
    const courts = await getCourts();

    const arenas = await Promise.all(courts.map(async court => {
        // extract information from API
        const courtId = court.Id;
        const courtName = court.CourtName;
        const courtInfo = court.courtInfo;
        // request the court available time slots
        const availabilities = await getCourtAvailableTimeSlots(courtId, requested_date);

        const timeSlots = availabilities.Bookings.map(booking => {
            const date = booking.Date;
            const isAvailable = (booking.BookingStat === 0);
            const ts = new TimeSlot(dayjs(date), dayjs(date).add(1, 'hours'), isAvailable);
            return ts;
        })
        return new ArenaEntry("https://booking.soccerolymp.de/", `SoccerOlymp/${courtName}`, requested_date, timeSlots, dayjs());
    }));
    return arenas;
}

export default scrape;
