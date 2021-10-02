const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

const particles = [];
let hue = 0;

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;

  for (let i = 0; i < 5; i++) {
    particles.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.size = Math.random() * 5;
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  updateParticle() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function manageParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].updateParticle();
    particles[i].draw();

    if (particles[i].size < 0.3) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  manageParticles();
  hue += 2;
  requestAnimationFrame(animation);
}

animation();
