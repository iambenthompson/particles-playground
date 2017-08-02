import Emitter from './Emitter';
import Particle from './Particle';

class Scene {
  constructor({
                emitters = [], particles = []
              } = {}) {
    this.emitters = emitters;
    this.particles = particles;

    // ref measurements on my 15 inch mbp
    // viewport height: 0.14224 meters
    // y range at z clip: 28
    // gravity in real life is 9.8 m/s^2
    // 0.14224 / 28 = 9.8 / ?
    // then divide by approximate framerate to get gravity per sec
    this.gravity = 9.8 * 28 / 0.14224 / 960;
  }

  add(items){
    for (let item of items){
      if (item instanceof Emitter){
        this.emitters.push(item);
      } else if (item instanceof Particle){
        this.particles.push(item);
      } else {
        throw new Error("Can only add Emitters and Particles to a Scene.");
      }
    }
  }

  update() {
    this._prune();

    for (let particle of this.particles){
      particle.update();
      particle.speedY += this.gravity;
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
