import { elements } from './elements';

const { gallery } = elements;

export function createImage(searchResults) {
  const imageList = searchResults.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<div class="photo-card">
        <div class="image_wrap">
            <a class="image_link" href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" width="250" loading="lazy" />
            </a>
        </div>
        <div class="info">
            <p class="info-item">
            <b>Likes: ${likes}</b>
            </p>
            <p class="info-item">
            <b>Views: ${views}</b>
            </p>
            <p class="info-item">
            <b>Comments: ${comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads: ${downloads}</b>
            </p>
        </div>
        </div>`;
    }
  );
  gallery.insertAdjacentHTML('beforeend', imageList.join(''));
}
