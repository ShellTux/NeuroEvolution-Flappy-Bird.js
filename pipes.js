class Pipe {
  constructor(width = 50, spc = 150) {
    let canvas = document.querySelector('canvas');
    this.x = canvas.width - 100;
    this.width = width;
    this.spc = spc;
    this.yCut = Math.floor(random(spc, canvas.height - spc));
    this.height2 = canvas.height - this.yCut - this.spc;
  }

  show(color1, color2) {
    ctx.fillStyle = color1 || 'white';
    ctx.fillRect(this.x, 0, this.width, this.yCut);
    ctx.fillStyle = color2 || 'white';
    ctx.fillRect(this.x, this.yCut + this.spc, this.width, this.height2);
  }

  move() {
    this.x -= 2;
  }

  update() {
    this.move();
    this.show();
  }
}