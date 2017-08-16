import Point3D from './Point3D';
import Sprite from './Sprite';

class Particle extends Point3D {
  constructor({
                x = 0,
                y = 0,
                z = 0,
                speedX = -0.3 + Math.random() * 0.6,
                speedY = -0.3 + Math.random() * 0.6,
                speedZ = -10.1 + Math.random() * 10.2,
                accelerationX = 0,
                accelerationY = 0,
                accelerationZ = 0
              } = {}) {
    super({x, y, z});
    this.accelerationX = accelerationX;
    this.accelerationY = accelerationY;
    this.accelerationZ = accelerationZ;
    this.speedX = speedX;
    this.speedY = speedY;
    this.speedZ = speedZ;
    this.sprite = new Sprite();
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

    this.setPosition({
      x: this.x + this.speedX,
      y: this.y + this.speedY,
      z: this.z + this.speedZ
    });

    this.speedX += this.accelerationX;
    this.speedY += this.accelerationY;
    this.speedZ += this.accelerationZ;

    this.age++
  }

  draw({
        context,
        perspective
      } = {}){
    this.sprite.draw({context, perspective, particle: this});
  }
}

export default Particle;
