 // Load theme preference on page load
 window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }

  // Theme toggle
  const toggleButton = document.getElementById('theme-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Section fade-in using IntersectionObserver
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });
  document.querySelectorAll('.section').forEach(section => observer.observe(section));

  // Slider functionality (per item)
  document.querySelectorAll('.portfolio-item.slider').forEach(item => {
    const images = item.querySelectorAll('.slider-images img');
    const imageContainer = item.querySelector('.slider-images');
    let current = 0;

    const updateSlider = () => {
      imageContainer.style.transform = `translateX(-${current * 100}%)`;
    };

    item.querySelector('.next')?.addEventListener('click', () => {
      current = (current + 1) % images.length;
      updateSlider();
    });

    item.querySelector('.prev')?.addEventListener('click', () => {
      current = (current - 1 + images.length) % images.length;
      updateSlider();
    });
  });

  // Modal Setup
  const modal = document.createElement("div");
  modal.classList.add("image-modal");
  modal.id = "imageModal";
  modal.innerHTML = `
    <button class="close-btn" aria-label="Close">&times;</button>
    <img id="modalImage" src="" alt="Full size view">
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("#modalImage");
  const closeBtn = modal.querySelector(".close-btn");

  document.querySelectorAll(".portfolio-item img").forEach(img => {
    img.addEventListener("click", () => {
      modal.classList.add("active");
      modalImg.src = img.src;
      modalImg.alt = img.alt || "Portfolio image";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
    }
  });

  // Form handling
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://formspree.io/f/manevpoy', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });

        if (response.ok) {
          contactForm.reset();
          formMessage.textContent = "✅ Message sent successfully!";
          formMessage.classList.add("show");
          formMessage.style.display = "block";
          formMessage.style.color = "green";
        } else {
          const data = await response.json();
          formMessage.textContent = data?.errors?.[0]?.message || "⚠️ Something went wrong.";
          formMessage.style.display = "block";
          formMessage.style.color = "red";
        }
      } catch (error) {
        formMessage.textContent = "⚠️ Network error. Please try again.";
        formMessage.style.color = "red";
        formMessage.style.display = "block";
      }
    });
  }
});
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const closeNav = document.querySelector('.close-nav');

if (hamburger && navMenu && closeNav) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.add('nav-open');
  });

  closeNav.addEventListener('click', () => {
    navMenu.classList.remove('nav-open');
  });

  // Close nav when any link inside the nav is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('nav-open');
    });
  });
}
