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
                size = 1
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
    let drawnSize = this.size * perspective;
    let ageRatio = particle.age / particle.lifespan;
    context.beginPath();
    context.arc(particle.x, particle.y, drawnSize, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = 'rgba(' + this.color.red + ', ' + this.color.green + ', ' + this.color.blue + ', ' + this.color.alpha * (1-ageRatio) + ')';
    context.fill();

//    this.context.strokeStyle = 'rgba(' + particle.red + ', ' + particle.green + ', ' + particle.blue + ', ' + particle.opacity * ageRatio + ')';
//    this.context.lineWidth = this.STROKE_WIDTH_MAX * perspective;
//    this.context.stroke();
  }

}

export default Sprite;
