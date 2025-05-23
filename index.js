import{a as d,S as f,i as a}from"./assets/vendor-frHSA4Lh.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const m="https://pixabay.com/api/",p="50339629-b1274d664611d8807e14b18d5";async function y(s){const o={key:p,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0};try{return(await d.get(m,{params:o})).data}catch(e){throw console.error("Помилка запиту до Pixabay API:",e),e}}const l=document.querySelector(".gallery"),g=new f(".gallery a",{captionsData:"alt",captionDelay:250});function h(s){const o=s.map(e=>`
        <li class="gallery-item">
        <a class="gallery-link" href="${e.largeImageURL}" title="${e.tags}">
  <img
    class="gallery-image"
    src="${e.webformatURL}"
   alt="${e.tags.split(",").slice(0,3).map(i=>i.trim()).join(", ")}"
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
      `).join("");l.insertAdjacentHTML("beforeend",o),g.refresh()}function b(){l.innerHTML=""}function L(){document.body.classList.add("loading")}function w(){document.body.classList.remove("loading")}const u=document.querySelector(".form"),c=u.elements["search-text"];u.addEventListener("submit",v);async function v(s){s.preventDefault();const o=c.value.trim();if(o===""){a.warning({message:"Please enter a search query!",position:"topRight"});return}b(),L();try{const e=await y(o);if(e.hits.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}h(e.hits),c.value=""}catch{a.error({message:"An error occurred while fetching images!",position:"topRight"})}finally{w()}}
//# sourceMappingURL=index.js.map
