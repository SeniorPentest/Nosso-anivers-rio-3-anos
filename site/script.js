const START_DATE = new Date("2023-05-18T00:00:00");

function drawMathHeart(canvas, time = 0) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const pulse = 1 + Math.sin(time / 260) * 0.055;
  const scale = Math.min(width, height) / 36 * pulse;

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(width / 2, height / 2 + 18);
  ctx.scale(scale, -scale);

  const gradient = ctx.createLinearGradient(-18, -16, 18, 16);
  gradient.addColorStop(0, "#f5d5e8");
  gradient.addColorStop(0.5, "#cc6b9d");
  gradient.addColorStop(1, "#7fb3e5");

  ctx.beginPath();
  for (let t = 0; t <= Math.PI * 2 + 0.02; t += 0.02) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    if (t === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.shadowColor = "rgba(204, 107, 157, 0.45)";
  ctx.shadowBlur = 1.2;
  ctx.fill();

  ctx.lineWidth = 0.18;
  ctx.strokeStyle = "rgba(255,255,255,0.82)";
  ctx.stroke();
  ctx.restore();
}

function animateHearts(time) {
  document.querySelectorAll("[data-heart-canvas]").forEach((canvas) => drawMathHeart(canvas, time));
  requestAnimationFrame(animateHearts);
}

function calculateDaysTogether() {
  const today = new Date();
  const days = Math.floor((today - START_DATE) / (1000 * 60 * 60 * 24));
  const output = document.getElementById("daysTogether");
  output.textContent = `${days.toLocaleString("pt-BR")} dias juntos desde 18/05/2023`;
}

function revealTimelineWithObserver() {
  const items = document.querySelectorAll(".timeline-item");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.22 });

  items.forEach((item) => observer.observe(item));
}

function initScrollReveal() {
  if (!window.ScrollReveal) return;

  ScrollReveal().reveal(".reveal-item", {
    distance: "34px",
    duration: 900,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    interval: 120,
    origin: "bottom",
    reset: false,
  });

  ScrollReveal().reveal(".map-item", {
    distance: "28px",
    duration: 850,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    interval: 160,
    origin: "bottom",
    scale: 0.95,
    reset: false,
  });
}

function initGsapParallax() {
  if (!window.gsap) return;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    gsap.to(".hero-content", {
      y: y * 0.12,
      duration: 0.45,
      overwrite: true,
      ease: "power1.out",
    });
  }, { passive: true });
}

function initMapInteractions() {
  const mapItems = document.querySelectorAll(".map-item");
  mapItems.forEach((item) => {
    item.addEventListener("click", () => {
      mapItems.forEach((map) => map.classList.remove("active"));
      item.classList.add("active");
      item.animate([
        { transform: "translateY(-10px) scale(1)" },
        { transform: "translateY(-10px) scale(1.025)" },
        { transform: "translateY(-10px) scale(1)" },
      ], {
        duration: 420,
        easing: "ease-out",
      });
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(animateHearts);
  calculateDaysTogether();
  revealTimelineWithObserver();
  initMapInteractions();
  initSmoothScroll();
});

window.addEventListener("load", () => {
  initScrollReveal();
  initGsapParallax();
});
