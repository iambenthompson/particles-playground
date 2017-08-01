import Point3D from './Point3D';
import Particle from './Particle';

class Emitter extends Point3D {
  constructor(x = 0, y = 0, z = 0, num = 1) {
    super(x, y, z);
    this.num = num;
  }

  emit(){
    let particles = [];
    let i;
    for (i = 0; i < this.num; i++ ){
      particles.push(this.createParticle());
    }
    return particles;
  }

  createParticle(){
    return new Particle();
  }
  //
}

export default Emitter;
