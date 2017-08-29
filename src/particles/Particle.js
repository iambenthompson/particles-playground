import Point3D from './Point3D';
import Sprite from './Sprite';

class Particle extends Point3D {
  constructor({
                x = 0,
                y = 0,
                z = 0,
                speedX = -0.3 + Math.random() * 0.6,
                speedY = -0.3 + Math.random() * 0.6,
                speedZ = -0.1 - Math.random() * 3.2,
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
    this.lifespan = 42 + Math.random() * 4;
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
