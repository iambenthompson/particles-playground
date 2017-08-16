class Point3D {
  constructor ({
                x = 0,
                y = 0,
                z = 0
              } = {}) {
    this.oldX = this.x = x;
    this.oldY = this.y = y;
    this.oldZ = this.z = z;
    this.nextAnchorX = null;
    this.nextAnchorY = null;
    this.nextAnchorZ = null;
  }

  setPosition ({
                x = this.x,
                y = this.y,
                z = this.z,
                interpolate = true
              } = {}) {
    this.oldX = (interpolate ? this.x : x);
    this.x = x;
    this.oldY = (interpolate ? this.y : y);
    this.y = y;
    this.oldZ = (interpolate ? this.z : z);
    this.z = z;

    if (!interpolate){
      this.nextAnchorX = this.nextAnchorY = this.nextAnchorZ = null;
    }
  }
}

export default Point3D;
