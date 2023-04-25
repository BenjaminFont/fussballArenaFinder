import moment from "moment";


export function dateRetriever(htmlElement, requestedDate) {
   
    // split and re-parse the date in the format '08:00 - 08:30'
    const timeSlots = htmlElement.split(" - ", 2)
      .map((value) => moment(`${requestedDate} ${value}`, "YYYY-MM-DD hh:mm"));
      console.log("timeslots: ", timeSlots);
    return timeSlots;
  
}