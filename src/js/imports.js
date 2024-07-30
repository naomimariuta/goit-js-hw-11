import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = '45180979-107bff5819a4dc169e4529cb0';

export async function fetchPhoto(q, page, perPage) {
  const url = `${ENDPOINT}?key=${API_KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
  const response = await axios.get(url);
  return response.data;
}

export let lightbox = new SimpleLightbox('.image_wrap a', {
  captionsData: 'alt',
  captionDelay: 250,
});
