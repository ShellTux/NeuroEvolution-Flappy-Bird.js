const gravity = 0.5;

class Bird {
  constructor(brain, x = 100, y, r = 20, cor) {
    this.canvasHeight = document.querySelector('canvas').height;
    this.x = x;
    this.y = y || random(100, this.canvasHeight - 100);
    this.r = r;
    this.color = cor || rgb(Math.random() * 256, Math.random() * 256, Math.random() * 256);
    this.vel = 0;
    this.acc = 0;
    if (brain) this.brain = brain.mutate(x => Math.random() < 0.8 ? x + random(-0.5, 0.5) : x);
    else this.brain = new NeuralNetwork(5, 10, 1);
    this.hits = 0;
  }

  show() {
    let ctx = document.querySelector('canvas').getContext('2d');
    ctx.fillStyle = this.color;
    ctx.ellipse(this.x, this.y, 2 * this.r);
  }

  update(pipes) {
    this.move();
    this.think(pipes);
    this.show();
    this.check(pipes);
  }

  move(force = 0) {
    if (this.y + this.r > this.canvasHeight || this.y - this.r < 0) {
      this.y = constrain(this.y, this.r, this.canvasHeight - this.r);
      this.vel = 0;
    }
    this.acc = gravity + force;
    this.vel += this.acc;
    this.y += this.vel;
  }

  jump() {
    this.move(-15);
  }

  check(pipes) {
    let bird = this;
    pipes.forEach(function(pipe) {
      if (bird.x + bird.r >= pipe.x && bird.x - bird.r <= pipe.x + pipe.width) {
        if (bird.y - bird.r < pipe.yCut) {
          bird.hits++;
          // pipe.show('red', 'white');
        } else if (bird.y + bird.r > pipe.yCut + pipe.spc) {
          bird.hits++;
          // pipe.show('white', 'red');
        }
      }
    });
  };

  think(pipes) {
    let pipe = pipes[pipes.min(true, 'x')];
    let inputs = [pipe.x, pipe.yCut, pipe.spc, this.vel, this.y];
    let output = this.brain.feedforward(inputs)[0];
    if (output > 0.5) this.jump();
  }
};