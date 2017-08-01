import Emitter from './Emitter';
import Particle from './Particle';

class Scene {
  constructor() {
    this.emitters = [];
    this.particles = [];
  }

  add(item){
    if (item instanceof Emitter){
      this.emitters.push(item);
    } else if (item instanceof Particle){
      this.particles.push(item);
    } else {
      throw new Error("Can only add Emitters and Particles to a Scene.");
    }
  }

  update() {
    this._prune();

    for (let particle of this.particles){
      particle.update();
    }
    for (let emitter of this.emitters){
      this.particles.push(...emitter.emit());
    }
  }

  _prune(){
    let indicies = [];
    for (let i = 0; i < this.particles.length; i++) {
        if (this.particles[i].dead) indicies.push(i);
    }

    for (let index of indicies) {
        this.particles.splice(index,1);
    }
  }

}

export default Scene;
