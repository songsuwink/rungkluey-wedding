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
    ...Array.from({ length: 57 }, (_, i) => `images/gallery/img_${i + 1}.jpg`),
  ];

  const swiperWrapper = document.querySelector(
    '#gallerySlider .swiper-wrapper'
  );
  if (!swiperWrapper) return;

  // Function to check if image is landscape
  function isLandscape(img) {
    return img.naturalWidth > img.naturalHeight;
  }

  // Function to determine slides per view based on image orientation
  function getSlidesPerView() {
    const firstImg = new Image();
    return new Promise((resolve) => {
      firstImg.onload = () => {
        const landscape = isLandscape(firstImg);
        resolve(landscape ? 1 : 3);
      };
      firstImg.onerror = () => resolve(3); // Default to 3 if image fails to load
      firstImg.src = images[0];
    });
  }

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

  // Initialize Swiper after determining image orientation
  getSlidesPerView().then((slidesPerView) => {
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
      slidesPerView: slidesPerView,
      slidesPerGroup: slidesPerView,
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
          slidesPerView: slidesPerView,
          spaceBetween: 30,
        },
      },
    });
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
