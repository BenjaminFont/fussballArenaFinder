import axios from "axios";

export const scrape_website_data = async (endpointUrl, requestedData) => {
    const axiosResponse = await axios.request({
    method: "GET",
    params: {
        action: "showReservations",
        type_id: "3", // ???
        date: requestedData,
    },
    url: endpointUrl,
    })

    return axiosResponse.data;
}