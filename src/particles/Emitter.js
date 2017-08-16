import Bezier from 'bezier-js';
import Point3D from './Point3D';
import Particle from './Particle';

class Emitter extends Point3D {
  constructor({
                x = 0,
                y = 0,
                z = 0,
                num = 1
              } = {}) {
    super({x, y, z});
    this.num = num;
  }

  emit(){
    if (this.num <= 0) return;

    //Weird way of doing interpolations
    // let dx = (this.x - this.oldX) / this.num;
    // this.x = this.oldX;
    // let dy = (this.y - this.oldY) / this.num;
    // this.y = this.oldY;
    // let dz = (this.z - this.oldZ) / this.num;
    // this.z = this.oldZ;

    let curve = new Bezier(
      {x: this.oldX, y: this.oldY, z: this.oldZ},
      {x: (this.nextAnchorX || this.oldX), y: (this.nextAnchorY || this.oldY), z: (this.nextAnchorZ || this.oldZ)},
      {x: this.x, y: this.y, z: this.z},
      {x: this.x, y: this.y, z: this.z}
    );

    this.nextAnchorX = this.x + (this.x - (this.nextAnchorX || this.oldX));
    this.nextAnchorY = this.y + (this.y - (this.nextAnchorY || this.oldY));
    this.nextAnchorZ = this.z + (this.z - (this.nextAnchorZ || this.oldZ));

    //still weird
    this.x = this.oldX;
    this.y = this.oldY;
    this.z = this.oldZ;

    let points = curve.getLUT(this.num);
    console.log(points);
    let particles = [];
    let i;
    for (i = 0; i < this.num; i++ ){
      this.oldX = this.x = points[i+1].x;
      this.oldY = this.y = points[i+1].y;
      this.oldZ = this.z = points[i+1].z;
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
