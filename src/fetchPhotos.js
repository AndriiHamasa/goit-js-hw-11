import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "35021864-8bcde3535af483a0723c672d5";

const searchParams = new URLSearchParams({
    key: API_KEY,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true
})

export const fetchPhotos = async (str) => {
    const response = await axios.get(`${BASE_URL}?${searchParams}&q=${str}`);
    console.log('response: ', response);

    const data = await response.json();
    console.log('data: ', data);

    console.log('the END of fetchPhotos function!');
}