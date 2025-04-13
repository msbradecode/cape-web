// Simulasi loading progress
let progress = 0;
const progressBar = document.getElementById("progress");
const loadingText = document.getElementById("loading-text");
const loadingScreen = document.querySelector(".loading");
const container = document.querySelector(".container");
const successSound = document.getElementById("success-sound");
const clickSound = document.getElementById("click-sound");

function playSound(audio) {
  if (audio) audio.play();
}

const loadingInterval = setInterval(() => {
  if (progress < 100) {
    progress++;
    progressBar.style.width = `${progress}%`;
    loadingText.textContent = `${progress}%`;
  } else {
    clearInterval(loadingInterval);
    playSound(successSound);
    loadingScreen.style.display = "none";
    container.style.display = "block";
  }
}, 30);

// Payment popup logic
const popup = document.getElementById("popup");
const popupContent = document.getElementById("popup-content");
const errorSound = document.getElementById("error-sound");

const payments = {
  qris: {
    type: "image",
    value: "https://files.catbox.moe/vvyuy0.jpg"
  },
  dana: {
    type: "text",
    value: "0881037689503"
  },
  gopay: {
    type: "text",
    value: "087743048235"
  },
  ovo: {
    type: "text",
    value: "087768378361"
  }
};

function showPopup(method) {
  playSound(clickSound);
  popup.style.display = "flex";
  const data = payments[method];
  if (!data) {
    playSound(errorSound);
    popupContent.innerHTML = `<p>Payment method not available</p>`;
    return;
  }
  if (data.type === "image") {
    popupContent.innerHTML = `<img src="${data.value}" alt="QRIS" />`;
  } else {
    popupContent.innerHTML = `
      <p>${method.toUpperCase()}: ${data.value}</p>
      <button onclick="copyToClipboard('${data.value}')">Copy</button>
    `;
  }
}

function closePopup() {
  popup.style.display = "none";
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    popupContent.innerHTML += `<p style='color: lime'>Copied!</p>`;
  });
}

// Particle.js Setup
particlesJS('particles-js', {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      }
    }
  },
  retina_detect: true
});
