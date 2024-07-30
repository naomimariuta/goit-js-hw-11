import { elements } from './elements';
import { fetchPhoto } from './imports';
import { lightbox } from './imports';
import { createImage } from './image';
import { Notify } from 'notiflix';

const { search, gallery, loadMore } = elements;
const parameters = {
  position: 'center-center',
  timeout: 4000,
  width: '750px',
  fontSize: '30px',
};

const perPage = 25;
let page = 1;
let searchingKey = '';

loadMore.classList.add('hidden');
search.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  const { searchQuery } = event.currentTarget.elements;
  searchingKey = searchQuery.value.trim().toLowerCase().split(' ').join('+');
  if (searchingKey === '') {
    Notify.info('Please enter something to search!', parameters);
    return;
  }

  fetchPhoto(searchingKey, page, perPage)
    .then(data => {
      const results = data.hits;
      console.log(data.hits);
      if (data.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          parameters
        );
      } else {
        Notify.info(`Hooray! We found ${data.totalHits} images.`, parameters);
        createImage(results);
        lightbox.refresh();
      }
      if (data.totalHits > perPage) {
        loadMore.classList.remove('hidden');
        window.addEventListener('scroll', loadMorePage);
      }
    })
    .catch(onError);
  loadMore.addEventListener('click', clickLoadMore);
  event.currentTarget.reset();
}

function clickLoadMore() {
  page += 1;
  fetchPhoto(searchingKey, page, perPage)
    .then(data => {
      const results = data.hits;
      const pageNumber = Math.ceil(data.totalHits / perPage);
      createImage(results);
      if (page === pageNumber) {
        loadMore.classList.add('hidden');
        Notify.info(
          "We're sorry, but you've reached the end of search results.",
          parameters
        );
        loadMore.removeEventListener('click', clickLoadMore);
        window.removeEventListener('scroll', loadMorePage);
      }
      lightbox.refresh();
    })
    .catch(onError);
}

function loadMorePage() {
  if (endOfPage()) {
    clickLoadMore();
  }
}

function endOfPage() {
  return (
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
  );
}

function onError() {
  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or make another choice!',
    parameters
  );
}
