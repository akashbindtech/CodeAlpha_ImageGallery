
const galleryItems = [
  ...document.querySelectorAll(".gallery-item")
];

const filters = document.querySelectorAll(".filter");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const imageCaption = document.getElementById("imageCaption");
const counter = document.getElementById("counter");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleItems = [...galleryItems];
let currentIndex = 0;
let lastFocusedElement = null;

// Category filter
filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(filter => filter.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.category;

    galleryItems.forEach(item => {
      const matches =
        category === "all" ||
        item.dataset.category === category;

      item.hidden = !matches;
    });

    visibleItems = galleryItems.filter(item => !item.hidden);
  });
});

// Open lightbox
function openLightbox(index) {
  currentIndex = index;
  lastFocusedElement = document.activeElement;

  updateLightbox();
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  closeBtn.focus();
}

// Update displayed image
function updateLightbox() {
  const item = visibleItems[currentIndex];
  const img = item.querySelector("img");
  const caption = item.querySelector(".caption");

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  imageCaption.textContent = caption.textContent;

  counter.textContent =
    `${currentIndex + 1} / ${visibleItems.length}`;
}

// Gallery click
galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    const index = visibleItems.indexOf(item);

    if (index !== -1) {
      openLightbox(index);
    }
  });
});

// Next image
nextBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex + 1) % visibleItems.length;

  updateLightbox();
});

// Previous image
prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + visibleItems.length) %
    visibleItems.length;

  updateLightbox();
});

// Close lightbox
function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

closeBtn.addEventListener("click", closeLightbox);

// Close by clicking the dark background
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener("keydown", event => {
  if (lightbox.hidden) return;

  if (event.key === "Escape") {
    closeLightbox();
  } else if (event.key === "ArrowRight") {
    nextBtn.click();
  } else if (event.key === "ArrowLeft") {
    prevBtn.click();
  }
});
