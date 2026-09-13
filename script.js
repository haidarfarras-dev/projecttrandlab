const track = document.querySelector('#track');
const slides = [...document.querySelectorAll('.slide')];
const currentNumber = document.querySelector('#currentNumber');
const progressBar = document.querySelector('#progressBar');
const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');
let current = 0;

function updateSlide() {
  track.style.transform = `translateX(-${current * 100}vw)`;
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

prevButton.addEventListener('click', () => move(-1));
nextButton.addEventListener('click', () => move(1));
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === ' ') move(1);
  if (event.key === 'ArrowLeft') move(-1);
});
window.addEventListener('wheel', (event) => {
  if (Math.abs(event.deltaY) < 15) return;
  move(event.deltaY > 0 ? 1 : -1);
}, { passive: true });

updateSlide();
