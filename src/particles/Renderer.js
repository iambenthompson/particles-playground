import Point3D from './Point3D';
import Particle from './Particle';

class Renderer {
  constructor({
                canvas,
                scene
              } = {}) {
    this.STROKE_WIDTH_MAX = 0.75;
    this.Z_CLIP = -279;

    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.scene = scene;
    this.document = canvas.ownerDocument;
    this.window = this.document.defaultView || this.document.parentWindow;
    this.focalLength = 300;

    // maybe grab prefixed requestAnimationFrame funcs here for class

    this._init();
  }

  _init(){
    this._resizeHandler();
    this.window.addEventListener("resize", this._resizeHandler.bind(this), false);
    this.update();
  }

  _resizeHandler (event = null){
    this.canvasWidth = this.canvas.width = this.window.innerWidth;
    this.canvasHeight = this.canvas.height = this.window.innerHeight;
    this.context.translate(this.canvasWidth * 0.5, this.canvasHeight * 0.5);
  }

  update(){

    // clear the canvas for this loop's animation
    this.context.clearRect(-this.canvasWidth * 0.5, -this.canvasHeight * 0.5, this.canvasWidth, this.canvasHeight);
    this.context.fillStyle = '#000000';
    this.context.fillRect(-this.canvasWidth * 0.5, -this.canvasHeight * 0.5, this.canvasWidth, this.canvasHeight);

    for (let particle of this.scene.particles) {
       this.drawParticle(particle);
    }

    this.scene.update();

    this.window.requestAnimationFrame(this.update.bind(this));
  }

  drawParticle(particle){
    if (particle.z < this.Z_CLIP) return;
    let perspective = this.focalLength / (this.focalLength + particle.z);
    let size = particle.size * perspective;
    let ageRatio = particle.age / particle.lifespan;
    this.context.save();
    this.context.scale(perspective, perspective);
    this.context.translate(particle.x, particle.y);
    this.context.beginPath();
    this.context.arc(particle.x, particle.y, size, 0, 2 * Math.PI);
    this.context.closePath();
    //this.context.fillStyle = 'rgba(' + particle.red + ', ' + particle.green + ', ' + particle.blue + ', ' + particle.opacity * (particle.lifespan - particle.age) / particle.lifespan + ')';
    //this.context.fill();
    this.context.strokeStyle = 'rgba(' + particle.red + ', ' + particle.green + ', ' + particle.blue + ', ' + particle.opacity * ageRatio + ')';
    this.context.lineWidth = this.STROKE_WIDTH_MAX * perspective;
    this.context.stroke();
    this.context.restore();
  }
}

export default Renderer;
