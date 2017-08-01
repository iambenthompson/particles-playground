/*
do something to give access to all parts of particles here...
particles.Particle
particles.Emitter
etc...

and place Particle, Emitter, and other classes in ./src/particles to stay organized

import Particle from './particles/Particle'
etc

and in Particle
class Particle{
}
export default Particle
*/

import Particle from './particles/Particle'
import Emitter from './particles/Emitter'
import EmitterSphere from './particles/EmitterSphere'
import Scene from './particles/Scene'
import Renderer from './particles/Renderer'
export {
  Particle,
  Emitter,
  EmitterSphere,
  Scene,
  Renderer
};
