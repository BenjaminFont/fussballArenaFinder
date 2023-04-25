import { scrape_website_data } from "../../data-scraper.js";
import MockAdapter from "axios-mock-adapter";
import moment from "moment";
import axios from "axios";

const requestedDate = moment().format("YYYY-MM-DD");
const endPointUrl = "https://mcarena-esslingen.de/reservations.php"

let mock = new MockAdapter(axios);
mock.onGet(endPointUrl, { params: {
    action: "showReservations",
    type_id: "3",
    date: requestedDate,
}}).reply(200, {
    data: "<div>Hello World</div>",
  });

describe("Retrieve data", () => {
    it("retrieve data", async () => {
        console.log("1");
        const data = await scrape_website_data(endPointUrl, requestedDate);
        console.log("2");
        expect(data.data).toBe("<div>Hello World</div>");
        console.log("3");
    })
})