import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
form.addEventListener('submit', onFormSubmit);

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
    showLoader();
  
    try {
      const data = await getImagesByQuery(query);
  
      if (data.hits.length === 0) {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
  
      createGallery(data.hits);
      input.value = '';
    } catch (error) {
      iziToast.error({
        message: 'An error occurred while fetching images!',
          position: 'topRight',
        
      });
    } finally {
      hideLoader();
    }
}
  
