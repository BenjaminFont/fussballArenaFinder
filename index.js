import axios from "axios";
import * as cheerio from "cheerio";

const axiosResponse = await axios.request({
  method: "GET",
  url: "https://mcarena-esslingen.de/reservations.php?action=showReservations&type_id=3&date=2023-03-10",
})

const $ = cheerio.load(axiosResponse.data)

const someThing = $('table[class=day-reservations-table-area]')
console.log(someThing.html())