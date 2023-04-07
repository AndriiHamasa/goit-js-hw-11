import Notiflix from 'notiflix';
import { fetchPhotos, searchParams } from './fetchPhotos';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import InfiniteScroll from 'infinite-scroll';

const formEl = document.querySelector('.search-form');
const inputEl = formEl.firstElementChild;
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

const renderMurkupForCard = array => {
  const newArray = array.map(
    card => `<div class="photo-card">
    <a href="${card.largeImageURL}" class="photo-ancor"><img class="photo" src="${card.webformatURL}" alt="${card.tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <span>${card.likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b>
        <span>${card.views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <span>${card.comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b>
        <span>${card.downloads}</span>
      </p>
    </div>
  </div>`
  );

  return newArray.join('');
};

const toRemoveLoadMoreBtn = data => {
  if (searchParams.page >= Math.ceil(data.totalHits / searchParams.per_page)) {
    loadMoreBtnEl.classList.remove('js-load-more');
    if (data.totalHits < searchParams.per_page) {
      return;
    }
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
};

const toScroll = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

formEl.addEventListener('submit', async event => {
  event.preventDefault();

  try {
    loadMoreBtnEl.classList.remove('js-load-more');
  } catch (error) {
    console.log(error);
  }

  if (inputEl.value === '') {
    return Notiflix.Notify.info('Wow, Enter some text.');
  }

  searchParams.page = 1;

  const data = await fetchPhotos(inputEl.value);

  if (data.hits.length === 0) {
    try {
      galleryEl.innerHTML = '';
      loadMoreBtnEl.classList.remove('js-load-more');
    } catch (error) {
      console.log(error);
    }
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

  galleryEl.innerHTML = renderMurkupForCard(data.hits);
  toScroll();
  searchParams.page += 1;

  // ============
  let gallery = new SimpleLightbox('.gallery a');

  gallery.on('show.simplelightbox', function () {});
  // ============

  loadMoreBtnEl.classList.add('js-load-more');

  toRemoveLoadMoreBtn(data);
});

loadMoreBtnEl.addEventListener('click', async () => {
  console.log('load more');
  const data = await fetchPhotos(inputEl.value);
  galleryEl.insertAdjacentHTML('beforeend', renderMurkupForCard(data.hits));
  toScroll();

  // ============
  let gallery = new SimpleLightbox('.gallery a');

  gallery.on('show.simplelightbox', function () {});
  // ============

  toRemoveLoadMoreBtn(data);

  searchParams.page += 1;
});
