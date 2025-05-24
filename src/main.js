import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
    event.preventDefault();
  
    const query = input.value.trim();
  
    if (query === '') {
      iziToast.warning({
        message: 'Please enter a search query!',
        position: 'topRight',
      });
      return;
    }
  
    clearGallery();
    hideLoadMoreButton();
    showLoader();
    currentPage = 1;
    currentQuery = query;

    try {
      const data = await getImagesByQuery(query, currentPage);
  
      if (data.hits.length === 0) {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
  
      createGallery(data.hits);
      const totalPages = Math.ceil(data.totalHits / 15);
      if (currentPage < totalPages) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
      }
    } catch (error) {
      iziToast.error({
        message: 'An error occurred while fetching images!',
          position: 'topRight',
        
      });
    } finally {
      hideLoader();
      input.value = '';
    }
}

async function onLoadMore() {
  showLoader();
  currentPage += 1;

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.info({
        message: 'No more images to load.',
        position: 'topRight',
      });
      hideLoadMoreButton();
      return;
    }

    createGallery(data.hits);
    if (data.hits.length < 15) {
      hideLoadMoreButton();
    }
    const totalPages = Math.ceil(data.totalHits / 15);
    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
    // Smooth scroll after new images are loaded
    setTimeout(() => {
      const gallery = document.querySelector('.gallery');
      if (gallery && gallery.firstElementChild) {
        const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    }, 100);
  } catch (error) {
    iziToast.error({
      message: 'An error occurred while fetching images!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
