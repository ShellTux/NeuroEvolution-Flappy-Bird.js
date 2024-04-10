let cv;
let ctx;
let pipes;
let frame1 = 0;
let frame2 = 0;
let population;

const setup = function() {
  cv = document.querySelector('canvas');
  ctx = cv.getContext('2d');
  pipes = new Array(1).fill().map(x => new Pipe());
  population = new Population(Bird, 30);
  // window.addEventListener('keypress', function(event) {
  //   // console.log('key press');
  //   bird.jump();
  // });
  document.getElementById('reproduce').onclick = () => population.reproduce();
  draw();
}

window.onload = setup;

const draw = function() {
  background(cv, 'black');
  frame1 = (frame1 + 1) % 120;
  frame2 = (frame2 + 1) % 720;
  if (frame1 === 0) pipes.push(new Pipe());
  pipes = pipes.filter(pipe => pipe.x + pipe.width >= 0);
  pipes.forEach(pipe => pipe.update());
  population.update(pipes);
  if (frame2 === 0) population.reproduce();
  setTimeout(draw, 5);
}