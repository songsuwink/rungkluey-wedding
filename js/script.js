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
  const gallery = document.getElementById('photoGallery');

  // Sample photos (replace with your actual wedding photos)
  const photos = [
    {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
      alt: 'Engagement Photo 1',
    },
    {
      src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop',
      alt: 'Engagement Photo 2',
    },
    {
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
      alt: 'Engagement Photo 3',
    },
    {
      src: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=300&fit=crop',
      alt: 'Engagement Photo 4',
    },
    {
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop',
      alt: 'Engagement Photo 5',
    },
    {
      src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&h=300&fit=crop',
      alt: 'Engagement Photo 6',
    },
  ];

  // Generate gallery HTML
  photos.forEach((photo, index) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4 col-sm-6 mb-4';

    colDiv.innerHTML = `
            <div class="gallery-item fade-in" onclick="openLightbox(${index})">
                <img src="${photo.src}" alt="${photo.alt}" class="img-fluid">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
        `;

    gallery.appendChild(colDiv);
  });

  // Create lightbox modal
  const lightboxHTML = `
        <div class="modal fade" id="lightboxModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center p-0">
                        <img id="lightboxImage" src="" alt="" class="img-fluid">
                        <div class="lightbox-controls mt-3 p-3">
                            <button class="btn btn-outline-primary me-2" onclick="previousImage()">
                                <i class="fas fa-chevron-left"></i> Previous
                            </button>
                            <button class="btn btn-outline-primary" onclick="nextImage()">
                                Next <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML('beforeend', lightboxHTML);

  // Lightbox functionality
  window.currentImageIndex = 0;
  window.galleryPhotos = photos;

  window.openLightbox = function (index) {
    window.currentImageIndex = index;
    document.getElementById('lightboxImage').src = photos[index].src;
    document.getElementById('lightboxImage').alt = photos[index].alt;
    const modal = new bootstrap.Modal(document.getElementById('lightboxModal'));
    modal.show();
  };

  window.previousImage = function () {
    window.currentImageIndex =
      (window.currentImageIndex - 1 + photos.length) % photos.length;
    document.getElementById('lightboxImage').src =
      photos[window.currentImageIndex].src;
    document.getElementById('lightboxImage').alt =
      photos[window.currentImageIndex].alt;
  };

  window.nextImage = function () {
    window.currentImageIndex = (window.currentImageIndex + 1) % photos.length;
    document.getElementById('lightboxImage').src =
      photos[window.currentImageIndex].src;
    document.getElementById('lightboxImage').alt =
      photos[window.currentImageIndex].alt;
  };
}

// RSVP Form
function initRSVPForm() {
  const form = document.getElementById('rsvpForm');
  const successAlert = document.getElementById('rsvpSuccess');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('guestName').value,
      attendance: document.querySelector('input[name="attendance"]:checked')
        .value,
      message: document.getElementById('message').value,
      timestamp: new Date().toISOString(),
    };

    // Store in localStorage (in a real app, you'd send to a server)
    let rsvpList = JSON.parse(localStorage.getItem('weddingRSVPs')) || [];
    rsvpList.push(formData);
    localStorage.setItem('weddingRSVPs', JSON.stringify(rsvpList));

    // Show success message
    successAlert.classList.remove('d-none');
    form.style.display = 'none';

    // Scroll to success message
    successAlert.scrollIntoView({ behavior: 'smooth' });

    // Optional: Reset form after delay
    setTimeout(() => {
      form.reset();
      form.style.display = 'block';
      successAlert.classList.add('d-none');
    }, 10000);

    // Add confetti effect
    createConfetti();
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
  heart.style.color = '#800020';
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
// setInterval(createFloatingHearts, 3000);
