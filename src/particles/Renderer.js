import Point3D from './Point3D';
import Particle from './Particle';
import Scene from './Scene';

class Renderer {
  constructor({
                canvas,
                emitters
              } = {}) {
    this.STROKE_WIDTH_MAX = 0.75;
    this.Z_CLIP = -279;

    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.scene = new Scene({emitters});
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
    this.context.fillStyle = '#000000';
    this.context.fillRect(-this.canvasWidth * 0.5, -this.canvasHeight * 0.5, this.canvasWidth, this.canvasHeight);
  }

  update(){

    // clear the canvas for this loop's animation
    //this.context.clearRect(-this.canvasWidth * 0.5, -this.canvasHeight * 0.5, this.canvasWidth, this.canvasHeight);
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
    this.context.save();
    this.context.scale(perspective, perspective);
    this.context.translate(particle.x, particle.y);

    particle.draw({
      context: this.context,
      perspective
    });

    this.context.restore();
  }
}

export default Renderer;
