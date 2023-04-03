import Notiflix from "notiflix";
import { fetchPhotos } from "./fetchPhotos";

const inputEl = document.querySelector('.search-input');
const btnEl = document.querySelector('button');

btnEl.addEventListener('click', async (event) => {
    event.preventDefault();

    console.log('the START of all functions');

    await fetchPhotos(inputEl.value);

    console.log('the END of all functions');
})

