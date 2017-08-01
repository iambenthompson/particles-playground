import Emitter from './Emitter';
import Particle from './Particle';

class EmitterSphere extends Emitter {
  constructor(x = 0, y = 0, z = 0, num = 1, radius = 10) {
    super(x, y, z, num);
    this.radius = radius;
  }

  createParticle(){
    //basic, poor distrib
    /*
    let radius = this.radius * Math.random();
    let rotation = {
      x: Math.random() * 2 * Math.PI,
      y: Math.random() * 2 * Math.PI,
      z: Math.random() * 2 * Math.PI,
    }
    let x = radius * Math.cos(rotation.y) * Math.cos(rotation.x);
    let y = radius * Math.sin(rotation.x);
    let z = radius * Math.sin(rotation.y) * Math.cos(rotation.x);
    */

    //better uniform way
    let phi = Math.PI * 2 * Math.random();
    let costheta = -1 + Math.random() * 2;
    let u = Math.random();

    let theta = Math.acos( costheta );
    let r = this.radius * Math.cbrt( u );

    let x = r * Math.sin( theta) * Math.cos( phi )
    let y = r * Math.sin( theta) * Math.sin( phi )
    let z = r * Math.cos( theta )  

    return new Particle(this.x + x, this.y + y, this.z + z);
  }


}

export default EmitterSphere;
