// Wedding Invitation Website JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Initialize all functionality
  initCountdown();
  initAnimations();
  initPhotoGallery();
  initRSVPForm();
  initSmoothScrolling();

  const addToCalendarBtn = document.getElementById('addToCalendarBtn');

  if (addToCalendarBtn) {
    addToCalendarBtn.addEventListener('click', function () {
      addToCalendar();
    });
  }
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
    ...Array.from({ length: 88 }, (_, i) => `images/gallery/img_${i + 1}.jpg`),
  ];

  // Shuffle the images array randomly
  const shuffledImages = [...images].sort(() => Math.random() - 0.5);

  const swiperWrapper = document.querySelector(
    '#gallerySlider .swiper-wrapper'
  );
  if (!swiperWrapper) return;

  // Inject slides with click functionality using shuffled images
  swiperWrapper.innerHTML = shuffledImages
    .map(
      (src, index) => `
      <div class="swiper-slide">
        <img src="${src}" class="img-fluid rounded shadow gallery-image" 
             alt="Gallery Image" 
             style="width:100%;height:400px;object-fit:cover;cursor:pointer;" 
             data-src="${src}" 
             data-index="${images.indexOf(src)}">
      </div>
    `
    )
    .join('');

  // Initialize basic Swiper
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
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    grabCursor: true,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
  });

  // Add click event listeners to images
  document.querySelectorAll('.gallery-image').forEach((img) => {
    img.addEventListener('click', function (e) {
      e.stopPropagation();
      openLightbox(this.dataset.src, parseInt(this.dataset.index), images);
    });
  });
}

// Lightbox functionality
function openLightbox(src, currentIndex, allImages) {
  // Create lightbox overlay
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox-overlay';
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    cursor: pointer;
    overflow: hidden;
  `;

  // Create image container
  const imageContainer = document.createElement('div');
  imageContainer.style.cssText = `
    position: relative;
    max-width: 95%;
    max-height: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
  `;

  // Create image element
  let img = document.createElement('img');
  img.src = src;
  img.style.cssText = `
    border-radius: 8px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
  `;

  // Responsive image sizing
  function setResponsiveImageSize(imgElement) {
    const aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

    if (isMobile) {
      // Mobile responsive settings
      if (aspectRatio > 1.3) {
        // Wide image on mobile
        imgElement.style.cssText += `
          width: 100%;
          max-width: 95vw;
          max-height: 60vh;
          object-fit: contain;
        `;
      } else if (aspectRatio < 0.8) {
        // Tall image on mobile
        imgElement.style.cssText += `
          height: 80vh;
          max-width: 90vw;
          object-fit: contain;
        `;
      } else {
        // Square-ish image on mobile
        imgElement.style.cssText += `
          max-width: 90vw;
          max-height: 70vh;
          object-fit: contain;
        `;
      }
    } else if (isTablet) {
      // Tablet responsive settings
      if (aspectRatio > 1.5) {
        imgElement.style.cssText += `
          width: 90%;
          max-height: 75vh;
          object-fit: contain;
        `;
      } else if (aspectRatio < 0.7) {
        imgElement.style.cssText += `
          height: 85vh;
          max-width: 80%;
          object-fit: contain;
        `;
      } else {
        imgElement.style.cssText += `
          max-width: 85%;
          max-height: 80vh;
          object-fit: contain;
        `;
      }
    } else {
      // Desktop settings (original)
      if (aspectRatio > 1.5) {
        imgElement.style.cssText += `
          width: 95%;
          max-height: 85vh;
          object-fit: contain;
        `;
      } else if (aspectRatio < 0.7) {
        imgElement.style.cssText += `
          height: 95vh;
          max-width: 85%;
          object-fit: contain;
        `;
      } else {
        imgElement.style.cssText += `
          max-width: 90%;
          max-height: 90vh;
          object-fit: contain;
        `;
      }
    }
  }

  img.onload = function () {
    setResponsiveImageSize(this);
  };

  // Create close button with responsive positioning
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  const isMobile = window.innerWidth <= 768;

  closeBtn.style.cssText = `
    position: absolute;
    top: ${isMobile ? '10px' : '0px'};
    right: ${isMobile ? '10px' : '-40px'};
    background: white;
    border: none;
    border-radius: 50%;
    width: ${isMobile ? '35px' : '40px'};
    height: ${isMobile ? '35px' : '40px'};
    font-size: ${isMobile ? '20px' : '24px'};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    z-index: 10001;
    transition: all 0.2s ease;
  `;

  // Create navigation buttons with responsive positioning
  const prevBtn = document.createElement('button');
  prevBtn.innerHTML = '‹';
  prevBtn.style.cssText = `
    position: absolute;
    left: ${isMobile ? '10px' : '-60px'};
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border: none;
    border-radius: 50%;
    width: ${isMobile ? '40px' : '50px'};
    height: ${isMobile ? '40px' : '50px'};
    font-size: ${isMobile ? '24px' : '30px'};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    z-index: 10001;
    transition: all 0.2s ease;
    opacity: 50%;
  `;

  const nextBtn = document.createElement('button');
  nextBtn.innerHTML = '›';
  nextBtn.style.cssText = `
    position: absolute;
    right: ${isMobile ? '10px' : '-60px'};
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border: none;
    border-radius: 50%;
    width: ${isMobile ? '40px' : '50px'};
    height: ${isMobile ? '40px' : '50px'};
    font-size: ${isMobile ? '24px' : '30px'};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    z-index: 10001;
    transition: all 0.2s ease;
    opacity: 50%;
  `;

  // Add image counter with responsive positioning
  const counter = document.createElement('div');
  counter.style.cssText = `
    position: absolute;
    bottom: ${isMobile ? '-20px' : '0px'};
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.9);
    padding: ${isMobile ? '6px 12px' : '8px 16px'};
    border-radius: 20px;
    font-size: ${isMobile ? '12px' : '14px'};
    color: #333;
    z-index: 10001;
    white-space: nowrap;
  `;
  counter.textContent = `${currentIndex + 1} / ${allImages.length}`;

  // Assemble lightbox
  imageContainer.appendChild(img);
  imageContainer.appendChild(closeBtn);
  imageContainer.appendChild(prevBtn);
  imageContainer.appendChild(nextBtn);
  imageContainer.appendChild(counter);
  lightbox.appendChild(imageContainer);
  document.body.appendChild(lightbox);

  // Prevent body scroll
  document.body.style.overflow = 'hidden';

  // Event listeners
  let currentImageIndex = currentIndex;

  function updateImage() {
    const newImg = document.createElement('img');
    newImg.src = allImages[currentImageIndex];
    newImg.style.cssText = img.style.cssText;

    newImg.onload = function () {
      setResponsiveImageSize(this);
      imageContainer.replaceChild(newImg, img);
      img = newImg;
    };

    counter.textContent = `${currentImageIndex + 1} / ${allImages.length}`;
  }

  // Close lightbox
  function closeLightbox() {
    if (document.body.contains(lightbox)) {
      document.body.removeChild(lightbox);
      document.body.style.overflow = 'auto';
    }
  }

  // Navigation
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex =
      (currentImageIndex - 1 + allImages.length) % allImages.length;
    updateImage();
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    updateImage();
  });

  // Close events
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });
  lightbox.addEventListener('click', closeLightbox);
  imageContainer.addEventListener('click', (e) => e.stopPropagation());

  // Keyboard navigation
  function handleKeyboard(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
    if (e.key === 'ArrowLeft') {
      currentImageIndex =
        (currentImageIndex - 1 + allImages.length) % allImages.length;
      updateImage();
    }
    if (e.key === 'ArrowRight') {
      currentImageIndex = (currentImageIndex + 1) % allImages.length;
      updateImage();
    }
  }

  document.addEventListener('keydown', handleKeyboard);

  // Handle window resize
  function handleResize() {
    const newIsMobile = window.innerWidth <= 768;

    // Update button positions and sizes
    closeBtn.style.cssText =
      closeBtn.style.cssText.replace(
        /top: \d+px;|right: -?\d+px;|width: \d+px;|height: \d+px;|font-size: \d+px;/g,
        ''
      ) +
      `
      top: ${newIsMobile ? '10px' : '0px'};
      right: ${newIsMobile ? '10px' : '-40px'};
      width: ${newIsMobile ? '35px' : '40px'};
      height: ${newIsMobile ? '35px' : '40px'};
      font-size: ${newIsMobile ? '20px' : '24px'};
    `;

    prevBtn.style.cssText =
      prevBtn.style.cssText.replace(
        /left: -?\d+px;|width: \d+px;|height: \d+px;|font-size: \d+px;/g,
        ''
      ) +
      `
      left: ${newIsMobile ? '10px' : '-60px'};
      width: ${newIsMobile ? '40px' : '50px'};
      height: ${newIsMobile ? '40px' : '50px'};
      font-size: ${newIsMobile ? '24px' : '30px'};
    `;

    nextBtn.style.cssText =
      nextBtn.style.cssText.replace(
        /right: -?\d+px;|width: \d+px;|height: \d+px;|font-size: \d+px;/g,
        ''
      ) +
      `
      right: ${newIsMobile ? '10px' : '-60px'};
      width: ${newIsMobile ? '40px' : '50px'};
      height: ${newIsMobile ? '40px' : '50px'};
      font-size: ${newIsMobile ? '24px' : '30px'};
    `;

    counter.style.cssText =
      counter.style.cssText.replace(
        /bottom: -?\d+px;|padding: \d+px \d+px;|font-size: \d+px;/g,
        ''
      ) +
      `
      bottom: ${newIsMobile ? '10px' : '-40px'};
      padding: ${newIsMobile ? '6px 12px' : '8px 16px'};
      font-size: ${newIsMobile ? '12px' : '14px'};
    `;

    // Resize current image
    if (img.complete) {
      setResponsiveImageSize(img);
    }
  }

  window.addEventListener('resize', handleResize);

  // Store original close function to clean up event listeners
  const originalCloseLightbox = closeLightbox;
  closeLightbox = function () {
    document.removeEventListener('keydown', handleKeyboard);
    window.removeEventListener('resize', handleResize);
    originalCloseLightbox();
  };

  // Update event handlers to use new close function
  closeBtn.removeEventListener('click', originalCloseLightbox);
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });
  lightbox.removeEventListener('click', originalCloseLightbox);
  lightbox.addEventListener('click', closeLightbox);

  // Add hover effects for desktop
  if (!isMobile) {
    [closeBtn, prevBtn, nextBtn].forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform =
          btn === prevBtn || btn === nextBtn
            ? 'translateY(-50%) scale(1.1)'
            : 'scale(1.1)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform =
          btn === prevBtn || btn === nextBtn
            ? 'translateY(-50%) scale(1)'
            : 'scale(1)';
      });
    });
  }

  // Add touch gestures for mobile
  if (isMobile) {
    let startX = 0;
    let startY = 0;

    imageContainer.addEventListener(
      'touchstart',
      (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      },
      { passive: true }
    );

    imageContainer.addEventListener(
      'touchend',
      (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;

        // Only trigger if horizontal swipe is more significant than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
          if (diffX > 0) {
            // Swiped left - next image
            currentImageIndex = (currentImageIndex + 1) % allImages.length;
            updateImage();
          } else {
            // Swiped right - previous image
            currentImageIndex =
              (currentImageIndex - 1 + allImages.length) % allImages.length;
            updateImage();
          }
        }
      },
      { passive: true }
    );
  }
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

function addToCalendar() {
  // Wedding event details
  const eventDetails = {
    title: 'Piyaphat & Songsuwin Wedding',
    description: 'พิธีหมั้น พิธีรับไหว้ และงานฉลองมงคลสมรส #RungKlueyWedding',
    location:
      'สวนเจริญทรัพย์ระยอง, 3161, Tambon Wang Wa, Amphoe Klaeng, Changwat Rayong, Thailand',
    startDate: '2026-01-31',
    startTime: '16:09',
    endTime: '21:00',
  };

  // Create start and end datetime
  const startDateTime = new Date(
    `${eventDetails.startDate}T${eventDetails.startTime}:00+07:00`
  );
  const endDateTime = new Date(
    `${eventDetails.startDate}T${eventDetails.endTime}:00+07:00`
  );

  // Format dates for different calendar systems
  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  // Check if user is on mobile device
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    // For mobile devices, create ICS file
    createICSFile(eventDetails, startDateTime, endDateTime);
  } else {
    // For desktop, show options
    showCalendarOptions(eventDetails, startDateTime, endDateTime);
  }
}

function createICSFile(eventDetails, startDateTime, endDateTime) {
  const formatICSDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//Wedding Event//EN',
    'BEGIN:VEVENT',
    `DTSTART:${formatICSDate(startDateTime)}`,
    `DTEND:${formatICSDate(endDateTime)}`,
    `SUMMARY:${eventDetails.title}`,
    `DESCRIPTION:${eventDetails.description}`,
    `LOCATION:${eventDetails.location}`,
    `UID:${Date.now()}@wedding-invitation.com`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  // Create blob and download
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'rungkluey-wedding.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

function showCalendarOptions(eventDetails, startDateTime, endDateTime) {
  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventDetails.title
  )}&dates=${formatDate(startDateTime)}/${formatDate(
    endDateTime
  )}&details=${encodeURIComponent(
    eventDetails.description
  )}&location=${encodeURIComponent(eventDetails.location)}`;

  // Outlook Calendar URL
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
    eventDetails.title
  )}&startdt=${startDateTime.toISOString()}&enddt=${endDateTime.toISOString()}&body=${encodeURIComponent(
    eventDetails.description
  )}&location=${encodeURIComponent(eventDetails.location)}`;

  // Create modal or simple selection
  const calendarChoice = confirm(
    'เลือกปฏิทินที่ต้องการเพิ่ม:\nกด OK สำหรับ Google Calendar\nกด Cancel สำหรับดาวน์โหลดไฟล์ .ics'
  );

  if (calendarChoice) {
    window.open(googleCalendarUrl, '_blank');
  } else {
    createICSFile(eventDetails, startDateTime, endDateTime);
  }
}

function showColorImage(colorName) {
  // Create modal if it doesn't exist
  let modal = document.getElementById('colorModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'colorModal';
    modal.className = 'color-modal';
    modal.innerHTML = `
      <span class="close-btn" onclick="closeColorModal()">&times;</span>
      <img id="colorImage" src="" alt="Dress Color">
    `;
    document.body.appendChild(modal);
  }

  // Set image source and show modal
  const img = document.getElementById('colorImage');
  img.src = `images/dress_color/${colorName}.jpg`;
  console.log('Showing color image:', img.src);
  modal.style.display = 'flex';
}

function closeColorModal() {
  const modal = document.getElementById('colorModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Close modal when clicking outside the image
document.addEventListener('click', function (e) {
  const modal = document.getElementById('colorModal');
  if (modal && e.target === modal) {
    closeColorModal();
  }
});
