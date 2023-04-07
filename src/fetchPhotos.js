import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '35021864-8bcde3535af483a0723c672d5';

export const searchParams = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
  page: 1,
};

export const fetchPhotos = async str => {
  const { data } = await axios.get(
    `${BASE_URL}/?${new URLSearchParams(searchParams)}&q=${str}`
  );

  console.log('data: ', data);

  return data;
};

