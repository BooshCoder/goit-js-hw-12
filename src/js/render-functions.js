import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

export function createGallery(images) {
    const markup = images.map(image => {
      return `
        <li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}" title="${image.tags}">
  <img
    class="gallery-image"
    src="${image.webformatURL}"
   alt="${image.tags.split(',').slice(0, 3).map(tag => tag.trim()).join(', ')}"
  />
</a>
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${image.likes}
            </p>
            <p class="info-item">
              <b>Views:</b> ${image.views}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${image.comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${image.downloads}
            </p>
          </div>
        </li>
      `;
    }).join('');
  
    galleryContainer.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  }

export function clearGallery() {
    galleryContainer.innerHTML = '';
}
  
export function showLoader() {
    document.body.classList.add('loading');
  }
  
  export function hideLoader() {
    document.body.classList.remove('loading');
  }