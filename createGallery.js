"use strict";
import galleryAray from "./gallery-items.js";

console.log(galleryAray);

const galleryRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".lightbox");
const lightboxImgRef = document.querySelector(".lightbox__image");
const lightboxOverlayRef = document.querySelector(".lightbox__overlay");
const closeLightboxRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);

const arrayNew = [];
const galleryMarkup = galleryAray.map((imageItem, index) => {
  const galleryItemRef = document.createElement("li");
  const galleryLinkRef = document.createElement("a");
  const galleryImageRef = document.createElement("img");

  galleryItemRef.classList.add("gallery__item");

  galleryLinkRef.classList.add("gallery__link");
  galleryLinkRef.href = imageItem.original;

  galleryImageRef.classList.add("gallery__image");
  galleryImageRef.src = imageItem.preview;
  galleryImageRef.dataset.source = imageItem.original;
  galleryImageRef.dataset.index = index;
  galleryImageRef.alt = imageItem.description;

  galleryLinkRef.appendChild(galleryImageRef);
  galleryItemRef.appendChild(galleryLinkRef);
  arrayNew.push(galleryItemRef.innerHTML);
});
galleryRef.innerHTML = arrayNew.join("");

galleryRef.addEventListener("click", onImgClick);
closeLightboxRef.addEventListener("click", closeLightbox);
lightboxOverlayRef.addEventListener("click", closeLightbox);
window.addEventListener("keydown", keydownAnalytic);

function onImgClick(event) {
  if (event.target.nodeName !== "IMG") return;

  lightboxRef.classList.add("is-open");
  event.preventDefault();
  lightboxImgRef.src = event.target.dataset.source;
  lightboxImgRef.index = event.target.dataset.index;
  lightboxImgRef.alt = event.target.alt;
}

function closeLightbox() {
  lightboxRef.classList.remove("is-open");
  lightboxImgRef.src = "";
  lightboxImgRef.alt = "";
}

function keydownAnalytic(event) {
  let index = +lightboxImgRef.index;

  if (
    (index <= 0 && event.code === "ArrowLeft") ||
    (index >= galleryAray.length - 1 && event.code === "ArrowRight") ||
    event.code === "Escape"
  ) {
    closeLightbox();
    return;
  }

  if (event.code === "ArrowRight") {
    lightboxImgRef.src = galleryAray[+lightboxImgRef.index + 1].original;
    lightboxImgRef.index = +lightboxImgRef.index + 1;
  }
  if (event.code === "ArrowLeft") {
    lightboxImgRef.src = galleryAray[+lightboxImgRef.index - 1].original;
    lightboxImgRef.index = +lightboxImgRef.index - 1;
  }
}
