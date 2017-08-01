import Point3D from './Point3D';

class Particle extends Point3D {
  constructor(x = 0, y = 0, z = 0) {
    super(x, y, z);
    this.speedX = -0.3 + Math.random() * 0.6;
    this.speedY = -0.3 + Math.random() * 0.6;
    this.speedZ = -10.1 + Math.random() * 10.2;
    this.red = 255;
    this.green = 255;
    this.blue = 255;
    this.opacity = 1;
    this.size = 2 + Math.random() * 5;
    this.age = 0;
    this.lifespan = 70;//80 + Math.random() * 40;
    this.dead = false;
  }

  update(){
    //update position and stuff
    if (this.age >= this.lifespan) {
      this.dead = true;
      return;
    }

    this.x += this.speedX;
    this.y += this.speedY;
    this.z += this.speedZ;

    this.age++
  }
}

export default Particle;
