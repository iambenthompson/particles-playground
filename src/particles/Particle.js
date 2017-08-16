import Point3D from './Point3D';
import Sprite from './Sprite';

class Particle extends Point3D {
  constructor({
                x = 0,
                y = 0,
                z = 0,
                speedX = -2.1 + Math.random() * 4.2,
                speedY = -2.1 + Math.random() * 4.2,
                speedZ = -2.1 - Math.random() * 6.2,
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
    this.lifespan = 50;//80 + Math.random() * 40;
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
