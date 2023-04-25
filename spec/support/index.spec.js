import { dateRetriever } from "../../date.utils.js";
import moment from "moment";


const timeSlotStr = `06:00 - 06:30`
const requestedDate = moment().format("YYYY-MM-DD");
const expectedTimeSlots = [ 
    moment(`2023-04-25 06:00`, "YYYY-MM-DD hh:mm"), 
    moment(`2023-04-25 06:30`, "YYYY-MM-DD hh:mm")
];

describe("Date retrieving", () => {
    it("retrieve date", () => {
        console.log(requestedDate);
        const timeSlots = dateRetriever(timeSlotStr, requestedDate);
        console.log("==>", timeSlots); 
        expect(timeSlots).toEqual(expectedTimeSlots)
    })
})