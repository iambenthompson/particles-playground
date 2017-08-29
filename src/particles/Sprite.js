import Particle from './Particle';

class Sprite {
  constructor({
                color = {
                  red: 255,
                  green: 255,
                  blue: 255,
                  alpha: 1
                },
                opacity = 1,
                size = 8
              } = {}) {
    this.color = color;
    this.opacity = opacity;
    this.size = size;
  }

  draw({
        context,
        perspective,
        particle
      } = {}){
    let ageRatio = particle.age / particle.lifespan;
    let drawnSize = (this.size * (1 + (0.2 * ageRatio))) * perspective;

    var radgrad = context.createRadialGradient(particle.x,particle.y,0,particle.x,particle.y, drawnSize);
    radgrad.addColorStop(0, 'rgba(' + this.color.red + ', ' + this.color.green + ', ' + this.color.blue + ', ' + this.color.alpha/* * (1-ageRatio)*/ + ')');
    radgrad.addColorStop(0.8, 'rgba(' + this.color.red + ', ' + this.color.green + ', ' + this.color.blue + ', ' + this.color.alpha * (1-ageRatio) + ')');
    radgrad.addColorStop(1, 'rgba(' + this.color.red + ', ' + this.color.green + ', ' + this.color.blue + ', ' + 0 + ')');

    context.fillStyle = radgrad;
    context.fillRect(particle.x-drawnSize,particle.y-drawnSize,drawnSize * 2,drawnSize * 2);
  }

}

export default Sprite;
