class Population {
  constructor(specie, size) {
    this.birds = new Array(size).fill().map(x => new specie());
    this.specie = specie;
    this.size = size;
    this.reproduceTime = 10;
    this.generation = 1;
  }

  update(pipes) {
    this.birds.forEach(bird => bird.update(pipes));
  }

  reproduce() {
    console.log('reproduce', 'Geração ' + this.generation);
    const a = async function(arr) {
      return await arr.sort((a, b) => a.hits - b.hits);
    };
    a(this.birds).then(ans => {
      this.birds.splice(0, this.birds.length - 5);
      let newBirds = [];
      for (let bird of this.birds) {
        for (let i = 0; i < 6; i++) newBirds.push(new this.specie(bird.brain));
      }
      this.birds = newBirds;
    });
    frame1 = 0;
    frame2 = 0;
    pipes = [new Pipe()];
    this.generation++;
    // setTimeout(() => this.reproduce(), 10 * 1000);
  }
}