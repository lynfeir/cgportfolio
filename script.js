// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

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

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Slider functionality (separate index per slider)
document.querySelectorAll('.portfolio-item.slider').forEach(item => {
  const images = item.querySelectorAll('.slider-images img');
  const imageContainer = item.querySelector('.slider-images');
  let current = 0;

  const updateSlider = () => {
    imageContainer.style.transform = `translateX(-${current * 100}%)`;
  };

  item.querySelector('.next').addEventListener('click', () => {
    current = (current + 1) % images.length;
    updateSlider();
  });

  item.querySelector('.prev').addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    updateSlider();
  });
});

// Modal Setup
const modal = document.createElement("div");
modal.classList.add("image-modal");
modal.id = "imageModal"; // ✅ Add the missing ID!
modal.innerHTML = `
  <button class="close-btn" aria-label="Close">&times;</button>
  <img id="modalImage" src="" alt="Full size view">
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector("#modalImage");
const closeBtn = modal.querySelector(".close-btn");

// Open modal on image click
document.querySelectorAll(".portfolio-item img").forEach(img => {
  img.addEventListener("click", () => {
    modal.classList.add("active");
    modalImg.src = img.src;
    modalImg.alt = img.alt || "Portfolio image";
  });
});

// Close modal on button click
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Optional: Click outside image to close
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    modal.classList.remove("active");
  }
});
document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const formMessage = document.getElementById('form-message');

  try {
    const response = await fetch('https://formspree.io/f/manevpoy', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    });

    if (response.ok) {
      form.reset();
      formMessage.textContent = "✅ Message sent successfully!";
formMessage.classList.add("show");
formMessage.style.display = "block";
    } else {
      const data = await response.json();
      formMessage.textContent = data?.errors?.[0]?.message || "⚠️ Something went wrong.";
      formMessage.style.color = "red";
      formMessage.style.display = "block";
    }
  } catch (error) {
    formMessage.textContent = "⚠️ Network error. Please try again.";
    formMessage.style.color = "red";
    formMessage.style.display = "block";
  }
});
