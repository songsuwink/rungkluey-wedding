// Wedding Invitation Website JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Initialize all functionality
  initCountdown();
  initAnimations();
  initPhotoGallery();
  initRSVPForm();
  initSmoothScrolling();
});

// Countdown Timer
function initCountdown() {
  // Set wedding date (change this to your actual wedding date)
  const weddingDate = new Date('2026-01-31T16:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      // Wedding day has passed
      document.getElementById('countdownTimer').innerHTML =
        "<h3>We're Married! 💕</h3>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days
      .toString()
      .padStart(2, '0');
    document.getElementById('hours').textContent = hours
      .toString()
      .padStart(2, '0');
    document.getElementById('minutes').textContent = minutes
      .toString()
      .padStart(2, '0');
    document.getElementById('seconds').textContent = seconds
      .toString()
      .padStart(2, '0');
  }

  // Update countdown immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Scroll Animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in and slide-up classes
  document.querySelectorAll('.fade-in, .slide-up').forEach((el) => {
    observer.observe(el);
  });
}

// Photo Gallery
function initPhotoGallery() {
  const images = [
    ...Array.from({ length: 57 }, (_, i) => `images/gallery/img_${i + 1}.jpg`),
  ];

  const swiperWrapper = document.querySelector(
    '#gallerySlider .swiper-wrapper'
  );
  if (!swiperWrapper) return;

  // Inject slides
  swiperWrapper.innerHTML = images
    .map(
      (src) => `
      <div class="swiper-slide" style="display:flex;align-items:center;justify-content:center;min-height:300px;">
        <img src="${src}" class="img-fluid rounded shadow" alt="Gallery Image" style="max-width:100%;max-height:500px;object-fit:contain; background:#f8f9fa; display:block;">
      </div>
    `
    )
    .join('');

  // Initialize Swiper
  new Swiper('#gallerySlider', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 20,
    centeredSlides: true,
    grabCursor: true,
    breakpoints: {
      // Mobile and small tablets
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      // Desktop and larger tablets
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}

// RSVP Form
function initRSVPForm() {
  const form = document.getElementById('rsvpForm');
  const successAlert = document.getElementById('rsvpSuccess');
  const submitBtn = document.getElementById('rsvpSubmitBtn');
  const spinner = document.getElementById('rsvpSpinner');
  const GOOGLE_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbxkLcqBsao_lZXFfbUTPnKVHq51X_6kmbwb8eASORP7YbcDXiobKbpIrIR28FypD59T/exec';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Show spinner and disable button
    spinner.classList.remove('d-none');
    submitBtn.disabled = true;

    const formData = {
      name: document.getElementById('guestName').value,
      attendance: document.querySelector('input[name="attendance"]:checked')
        .value,
      message: document.getElementById('message').value,
      timestamp: new Date().toISOString(),
    };

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log('RSVP submitted sccessfully:', res);
        spinner.classList.add('d-none');
        submitBtn.disabled = false;
        successAlert.classList.remove('d-none');
        form.style.display = 'none';
        successAlert.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
          form.reset();
          form.style.display = 'block';
          successAlert.classList.add('d-none');
        }, 10000);

        createConfetti();
      })
      .catch((error) => {
        spinner.classList.add('d-none');
        submitBtn.disabled = false;
        alert('There was an error submitting your RSVP. Please try again.');
        console.error(error);
      });
  });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
}

// Confetti Effect for RSVP Success
function createConfetti() {
  const colors = ['#8B4513', '#800020', '#E2725B', '#355E3B'];
  const confettiCount = 100;

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.pointerEvents = 'none';
      confetti.style.borderRadius = '50%';
      confetti.style.zIndex = '9999';
      confetti.style.transition = 'transform 3s ease-out, opacity 3s ease-out';

      document.body.appendChild(confetti);

      // Animate confetti
      setTimeout(() => {
        confetti.style.transform = `translateY(100vh) rotate(${
          Math.random() * 360
        }deg)`;
        confetti.style.opacity = '0';
      }, 50);

      // Remove confetti after animation
      setTimeout(() => {
        document.body.removeChild(confetti);
      }, 3050);
    }, i * 30);
  }
}

// Navbar scroll effect
window.addEventListener('scroll', function () {
  // const navbar = document.querySelector('.navbar');
  // if (window.scrollY > 100) {
  //   navbar.style.background = 'rgba(255, 255, 255, 0.98)';
  //   navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
  // } else {
  //   navbar.style.background = 'rgba(255, 255, 255, 0.95)';
  //   navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  // }
});

// Scroll down arrow functionality
document.addEventListener('DOMContentLoaded', function () {
  const scrollDown = document.querySelector('.scroll-down');
  if (scrollDown) {
    scrollDown.addEventListener('click', function () {
      const countdownSection = document.getElementById('countdown');
      if (countdownSection) {
        countdownSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

// Add floating hearts animation
function createFloatingHearts() {
  const heart = document.createElement('div');
  heart.innerHTML = '♥';
  heart.style.position = 'fixed';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = '100vh';
  heart.style.fontSize = Math.random() * 20 + 15 + 'px';
  heart.style.color = '#4f6f52';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '1000';
  heart.style.opacity = '0.7';
  heart.style.transition = 'transform 6s linear, opacity 6s linear';

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.style.transform = 'translateY(-110vh) rotate(360deg)';
    heart.style.opacity = '0';
  }, 100);

  setTimeout(() => {
    document.body.removeChild(heart);
  }, 6100);
}

// Start floating hearts animation every 3 seconds
setInterval(createFloatingHearts, 3000);
