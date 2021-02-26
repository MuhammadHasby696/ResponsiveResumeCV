/*==================== TAMPILKAN MENU ====================*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    // Validasi variabel yang ada
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // Menambahkan kelas show-menu ke tag div dengan kelas nav__menu
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== HAPUS MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
        // Saat mengklik setiap nav__link, menghapus kelas menu acara
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== TAMPILKAN TOP GULIR ====================*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 200) scrollTop.classList.add('show-scroll');
    else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== TEMA CAHAYA GELAP ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Topik yang dipilih sebelumnya (jika dipilih pengguna)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Mendapatkan tema saat ini yang dimiliki antarmuka dengan memvalidasi kelas tema gelap
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// Memvalidasi jika pengguna sebelumnya memilih topik
if (selectedTheme) {
    // Jika validasi terpenuhi, bertanya apa masalahnya untuk mengetahui apakah mengaktifkan atau menonaktifkan gelap
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Aktifkan / nonaktifkan tema secara manual dengan tombol
themeButton.addEventListener('click', () => {
    // Tambahkan atau hapus tema gelap / ikon
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
        // Menyimpan tema dan ikon saat ini yang dipilih pengguna
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== KURANGI UKURAN DAN CETAK PADA LEMBAR A4 ====================*/
function scaleCv() {
    document.body.classList.add('scale-cv')
}

/*==================== HAPUS UKURAN KETIKA CV DIUNDUH ====================*/
function removeScale() {
    document.body.classList.remove('scale-cv')
}

/*==================== BUAT PDF ====================*/
// Area yang dihasilkan PDF
let areaCv = document.getElementById('area-cv')

let resumeButton = document.getElementById('resume-button')

// Opsi html2pdf
let opt = {
    margin: 0,
    filename: 'myResume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { format: 'a4', orientation: 'portrait' }
};


// Berfungsi untuk memanggil opsi areaCv dan Html2Pdf
function generateResume() {
    html2pdf(areaCv, opt)
}

// Saat tombol diklik, tiga fungsi tersebut dijalankan
resumeButton.addEventListener('click', () => {
    // 1. Kelas .scale-cv ditambahkan ke body, yang akan mengurangi ukuran elemen
    scaleCv()

    // 2. PDF dibuat
    generateResume()

    // 3. Kelas .scale-cv dihapus dari tubuh setelah 5 detik untuk kembali ke ukuran normal.
    setTimeout(removeScale, 5000)
})