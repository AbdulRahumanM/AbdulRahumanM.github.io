// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Theme toggle (persists via localStorage, defaults to system preference)
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('themeIconSun');
const moonIcon = document.getElementById('themeIconMoon');

function applyTheme(theme) {
  if (theme === 'dark' || theme === 'light') {
    root.setAttribute('data-theme', theme);
  } else {
    root.removeAttribute('data-theme');
  }
  const isDark = theme === 'dark' || (theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  sunIcon.style.display = isDark ? 'none' : 'block';
  moonIcon.style.display = isDark ? 'block' : 'none';
}

const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));
