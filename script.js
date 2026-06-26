const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', () => {
    closeSidebar();
    document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) closeSidebar();
});

/* ---- FIREBASE FORM ---- */
const firebaseConfig = {
  apiKey: "AIzaSyCy4haQUGGVWZT1IXSCD1NQYuIfmCJVf9Y",
  authDomain: "vinnlabs-cmd.firebaseapp.com",
  databaseURL: "https://vinnlabs-cmd-default-rtdb.firebaseio.com",
  projectId: "vinnlabs-cmd",
  storageBucket: "vinnlabs-cmd.firebasestorage.app",
  messagingSenderId: "618321652111",
  appId: "1:618321652111:web:5258fc5c7a38e208e283fa"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  formMessage.textContent = '';
  formMessage.className = 'form-message';

  const nama = this.nama.value.trim();
  const alamat = this.alamat.value.trim();
  const email = this.email.value.trim();
  const pesan = this.pesan.value.trim();

  if (!nama ||!alamat ||!pesan) {
    formMessage.textContent = 'Harap isi semua field yang wajib.';
    formMessage.classList.add('error');
    return;
  }

  const data = {
    nama: nama,
    alamat: alamat,
    email: email || '-',
    pesan: pesan,
    waktu: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Makassar' })
  };

  db.ref('pesan/').push(data)
  .then(() => {
      formMessage.textContent = 'Pesan sudah terkirim! thanks!! 🙏';
      formMessage.classList.add('success');
      contactForm.reset();
      setTimeout(() => { formMessage.textContent = ''; }, 5000);
    })
  .catch(err => {
      formMessage.textContent = 'Gagal kirim: ' + err.message;
      formMessage.classList.add('error');
    });
});

/* ---- SCROLL SPY ---- */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) current = section.getAttribute('id');
  });
  document.querySelectorAll('.menu-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});