import{a as b,S as L,i as n}from"./assets/vendor-frHSA4Lh.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(t){if(t.ep)return;t.ep=!0;const i=e(t);fetch(t.href,i)}})();const w="https://pixabay.com/api/",v="50339629-b1274d664611d8807e14b18d5";async function u(r,o=1){const e={key:v,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15};try{return(await b.get(w,{params:e})).data}catch(s){throw console.error("Помилка запиту до Pixabay API:",s),s}}const m=document.querySelector(".gallery"),P=new L(".gallery a",{captionsData:"alt",captionDelay:250});function f(r){const o=r.map(e=>`
        <li class="gallery-item">
        <a class="gallery-link" href="${e.largeImageURL}" title="${e.tags}">
  <img
    class="gallery-image"
    src="${e.webformatURL}"
   alt="${e.tags.split(",").slice(0,3).map(s=>s.trim()).join(", ")}"
  />
</a>
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${e.likes}
            </p>
            <p class="info-item">
              <b>Views:</b> ${e.views}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${e.comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${e.downloads}
            </p>
          </div>
        </li>
      `).join("");m.insertAdjacentHTML("beforeend",o),P.refresh()}function S(){m.innerHTML=""}function h(){document.body.classList.add("loading")}function p(){document.body.classList.remove("loading")}function q(){document.querySelector(".load-more").classList.remove("hidden")}function c(){document.querySelector(".load-more").classList.add("hidden")}const g=document.querySelector(".form"),d=g.elements["search-text"],R=document.querySelector(".load-more");let a=1,y="";g.addEventListener("submit",M);R.addEventListener("click",$);async function M(r){r.preventDefault();const o=d.value.trim();if(o===""){n.warning({message:"Please enter a search query!",position:"topRight"});return}S(),c(),h(),a=1,y=o;try{const e=await u(o,a);if(e.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}f(e.hits);const s=Math.ceil(e.totalHits/15);a<s?q():c()}catch{n.error({message:"An error occurred while fetching images!",position:"topRight"})}finally{p(),d.value=""}}async function $(){h(),a+=1;try{const r=await u(y,a);if(r.hits.length===0){n.info({message:"No more images to load.",position:"topRight"}),c();return}f(r.hits),r.hits.length<15&&c();const o=Math.ceil(r.totalHits/15);a>=o&&(c(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),setTimeout(()=>{const e=document.querySelector(".gallery");if(e&&e.firstElementChild){const{height:s}=e.firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}},100)}catch{n.error({message:"An error occurred while fetching images!",position:"topRight"})}finally{p()}}
//# sourceMappingURL=index.js.map
