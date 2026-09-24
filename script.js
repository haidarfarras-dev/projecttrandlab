const track = document.querySelector('#track');
const slides = [...document.querySelectorAll('.slide')];
const currentNumber = document.querySelector('#currentNumber');
const progressBar = document.querySelector('#progressBar');
const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');
let current = 0;

function updateSlide(behavior = 'smooth') {
  slides[current].scrollIntoView({ behavior, block: 'start' });
  updateIndicator();
}

function updateIndicator() {
  currentNumber.textContent = String(current + 1).padStart(2, '0');
  progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;
  prevButton.disabled = current === 0;
  nextButton.disabled = current === slides.length - 1;
  prevButton.style.opacity = current === 0 ? '.35' : '1';
  nextButton.style.opacity = current === slides.length - 1 ? '.35' : '1';
}

function move(direction) {
  current = Math.max(0, Math.min(slides.length - 1, current + direction));
  updateSlide();
}

const imageLightbox = document.querySelector('#imageLightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const pdrnGalleries = document.querySelectorAll('.pdrn-gallery');

function closeLightbox() {
  imageLightbox.classList.remove('open');
  imageLightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxImage.alt = '';
}

document.querySelectorAll('.pdrn-image img').forEach((image) => {
  image.addEventListener('click', (event) => {
    event.stopPropagation();
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    imageLightbox.classList.add('open');
    imageLightbox.setAttribute('aria-hidden', 'false');
  });
});

imageLightbox.addEventListener('click', closeLightbox);
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

pdrnGalleries.forEach((gallery) => {
  gallery.addEventListener('mousemove', (event) => {
    const bounds = gallery.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    gallery.style.setProperty('--cursor-x', `${x * 10}px`);
    gallery.style.setProperty('--cursor-y', `${y * 10}px`);
  });

  gallery.addEventListener('mouseleave', () => {
    gallery.style.setProperty('--cursor-x', '0px');
    gallery.style.setProperty('--cursor-y', '0px');
  });
});

prevButton.addEventListener('click', () => move(-1));
nextButton.addEventListener('click', () => move(1));
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === ' ') move(1);
  if (event.key === 'ArrowLeft') move(-1);
});
const sectionObserver = new IntersectionObserver((entries) => {
  const visibleSection = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visibleSection) return;
  current = slides.indexOf(visibleSection.target);
  updateIndicator();
}, { threshold: 0.55 });

slides.forEach((slide) => sectionObserver.observe(slide));
updateSlide('auto');
