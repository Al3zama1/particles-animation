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
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.size = Math.random() * 5;
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  updateParticle() {
    this.x += this.speedX;
    this.y += this.speedY;

    this.color = `hsl(${hue}, 100%, 50%)`;

    if (this.x > canvas.width || this.x < 0) {
      this.x = Math.random() * canvas.width;
    }

    if (this.y > canvas.height || this.y < 0) {
      this.y = Math.random() * canvas.height;
    }

    // if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

for (let i = 0; i < 100; i++) {
  particles.push(new Particle());
}

function manageParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].updateParticle();
    particles[i].draw();

    for (let j = i; j < particles.length; j++) {
      const distanceX = particles[i].x - particles[j].x;
      const distanceY = particles[i].y - particles[j].y;
      const totalDist = Math.sqrt(
        distanceX * distanceX + distanceY * distanceY
      );

      if (totalDist < 150) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        // ctx.strokeStyle = "white";
        ctx.strokeStyle = particles[i].color;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    // if (particles[i].size < 0.3) {
    //   particles.splice(i, 1);
    //   i--;
    // }
  }
}

// setInterval(() => {
//   for (let i = 0; i < 5; i++) {
//     particles.push(new Particle());
//   }
// }, 200);

function animation() {
  //   setTimeout(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  manageParticles();
  hue += 2;

  requestAnimationFrame(animation);
  //   }, 100);
}

animation();
