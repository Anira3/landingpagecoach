// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// THEME TOGGLE
const toggle = document.getElementById('themeToggle');
const body = document.body;

toggle.addEventListener('click', () => {
  if (body.classList.contains('night')) {
    body.classList.remove('night');
    body.classList.add('morning');
    toggle.textContent = '🌙';
  } else {
    body.classList.remove('morning');
    body.classList.add('night');
    toggle.textContent = '☀️';
  }
});
