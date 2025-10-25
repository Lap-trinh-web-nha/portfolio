// Hiệu ứng cho navigation khi scroll
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.padding = "10px 0";
    nav.style.background = "rgba(26, 31, 46, 0.95)";
  } else {
    nav.style.padding = "20px 0";
    nav.style.background = "rgba(26, 31, 46, 0.9)";
  }
});

// Hiệu ứng scroll mượt cho các liên kết nội bộ
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Hiệu ứng typing text
const typedTextSpan = document.getElementById("typed-text");
const textArray = [
  "Frontend Developer",
  "Creative Thinker",
  "Problem Solver",
  "Tech Enthusiast",
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1500;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 500);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(type, newTextDelay + 250);
});

// Hiệu ứng hiển thị phần trăm kỹ năng khi hover
document.querySelectorAll(".skill__box-list__item").forEach((item) => {
  const progress = item.querySelector(".skill-progress");
  const percent = item.getAttribute("data-skill");

  item.addEventListener("mouseenter", () => {
    progress.style.width = percent + "%";
  });

  item.addEventListener("mouseleave", () => {
    progress.style.width = "0";
  });

  // Hiển thị phần trăm khi click
  item.addEventListener("click", function () {
    alert(`Kỹ năng ${this.querySelector("span").textContent}: ${percent}%`);
  });
});

// ========== PHẦN JS CHO SLIDER ẢNH CÁ NHÂN ==========
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slider-track img");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;

  function showSlide(index) {
    if (index < 0) currentIndex = slides.length - 1;
    else if (index >= slides.length) currentIndex = 0;
    else currentIndex = index;

    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevBtn.addEventListener("click", () => showSlide(currentIndex - 1));
  nextBtn.addEventListener("click", () => showSlide(currentIndex + 1));

  // Tự động chuyển ảnh sau 4 giây
  setInterval(() => showSlide(currentIndex + 1), 4000);
});

// ========== PHẦN JS CHO SLIDER CHỨNG CHỈ ==========
document.addEventListener("DOMContentLoaded", () => {
  const certTrack = document.querySelector(".certificates-track");
  const certSlides = document.querySelectorAll(".certificate-slide");
  const certPrevBtn = document.querySelector(".cert-prev-btn");
  const certNextBtn = document.querySelector(".cert-next-btn");

  let certCurrentIndex = 0;

  function showCertSlide(index) {
    if (index < 0) certCurrentIndex = certSlides.length - 1;
    else if (index >= certSlides.length) certCurrentIndex = 0;
    else certCurrentIndex = index;

    certTrack.style.transform = `translateX(-${certCurrentIndex * 100}%)`;
  }

  certPrevBtn.addEventListener("click", () =>
    showCertSlide(certCurrentIndex - 1)
  );
  certNextBtn.addEventListener("click", () =>
    showCertSlide(certCurrentIndex + 1)
  );

  // Tự động chuyển slide sau 5 giây
  setInterval(() => showCertSlide(certCurrentIndex + 1), 5000);
});
