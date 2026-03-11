simplyCountdown('.simply-countdown', {
  year: 2027, // required
  month: 1, // required
  day: 1, // required
  hours: 8, // Default is 0 [0-23] integer
  words: { //words displayed into the countdown
    days: { singular: 'Hari', plural: 'Hari' },
    hours: { singular: 'Jam', plural: 'Jam' },
    minutes: { singular: 'Menit', plural: 'Menit' },
    seconds: { singular: 'Detik', plural: 'Detik' }
  },
});

const stickyTop = document.querySelector('.sticky-top');
const offcanvas = document.querySelector('#offcanvasNavbar');

offcanvas.addEventListener('show.bs.offcanvas', function () {
  stickyTop.style.zIndex = '1';
});

offcanvas.addEventListener('hidden.bs.offcanvas', function () {
  stickyTop.style.zIndex = '';
});

const rootElement = document.querySelector(":root");
const audioIconWrapper = document.querySelector('.audio-icon-wrapper');
const audioIcon = document.querySelector('.audio-icon-wrapper i');
const song = document.querySelector('#song');
let isPlaying = false;

function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  }

  rootElement.style.scrollBehavior = 'auto';
}

function enableScroll() {
  window.onscroll = function () { }
  rootElement.style.scrollBehavior = 'smooth';
  // localStorage.setItem('opened', 'true');
  playAudio();
}

function playAudio() {
  song.volume = 0.1;
  audioIconWrapper.style.display = 'flex';
  song.play();
  isPlaying = true;
}

audioIconWrapper.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove('bi-disc');
    audioIcon.classList.add('bi-pause-circle');
  } else {
    song.play();
    audioIcon.classList.add('bi-disc');
    audioIcon.classList.remove('bi-pause-circle');
  }

  isPlaying = !isPlaying;
}

// if (!localStorage.getItem('opened')) {
//   disableScroll();
// }
disableScroll();

const form = document.getElementById('my-form');
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: 'POST',
      body: data,
    })
      .then(() => {
        showToast("Konfirmasi kehadiran berhasil terkirim!");
        form.reset();
      })
      .catch((error) => {
        showToast("Opps! Terjadi kesalahan.", "error");
      });
  });
}

function showToast(message, type = "success") {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `custom-toast ${type}`;
  
  toast.innerHTML = `
    <span class="message">${message}</span>
    <button class="close-btn" onclick="this.parentElement.remove()">&times;</button>
    <div class="progress-bar"></div>
  `;
  
  container.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
  }, 3000);
}

const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get('n') || '';
const pronoun = urlParams.get('p') || 'Bapak/Ibu/Saudara/i';
const namaContainer = document.querySelector('.hero h4 span');

if (namaContainer) {
  namaContainer.innerText = `${pronoun} ${nama},`.replace(/ ,$/, ',');
}

const namaInput = document.querySelector('#nama');
if (namaInput) {
  namaInput.value = nama;
}

// Disqus Configuration
var disqus_config = function () {
  this.page.url = window.location.href.split(/[?#]/)[0];
  this.page.identifier = 'wedding-pernikahan-ibnu';
};

(function () {
  if (document.getElementById('disqus_thread')) {
    var d = document, s = d.createElement('script');
    s.src = 'https://pernikahan-4.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  }
})();
