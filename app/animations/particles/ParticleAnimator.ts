import { COLORS, MIN_RADIUS, RADIUS_VARIANCE, NUM_PARTICLES } from "./particleConstants"
import { GlowParticle } from "./GlowParticle"
import { TWO_DIMENSIONAL_CONTEXT_TYPE } from "@/app/globalTypes"
import { Animator } from "../Animator"

class ParticleAnimator extends Animator {
  renderingContext: TWO_DIMENSIONAL_CONTEXT_TYPE = '2d'
  declare particles: GlowParticle[]
  declare ctx: CanvasRenderingContext2D

  constructor(canvasElement: HTMLCanvasElement) {
    super(canvasElement)
    this.particles = Array(NUM_PARTICLES).fill(0)
    this.ctx = canvasElement.getContext(this.renderingContext)!
  }
  // TODO: Create a base animator class that has the resize and startAnimation base functionality
  // resize would just set the stageHeight and width

  resize() {
    super.resize()
    const ctx = this.canvasElement.getContext('2d')
  
    if (ctx) {
      ctx.globalCompositeOperation = 'saturation'
    }

    this.createParticles()
  }

  animate() {
    super.animate()
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

    if (!this.shouldAnimate) {
      this.particles = Array(NUM_PARTICLES).fill(0)
      return
    }

    for (const particle of this.particles) {
      particle.animate(this.ctx, this.stageWidth, this.stageHeight)
    }
  }

  private createParticles() {
    for (var i = 0; i < this.particles.length; i++) {
      const radiusMod = Math.random() + .75
      this.particles[i] = new GlowParticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        radiusMod * MIN_RADIUS,
        radiusMod * RADIUS_VARIANCE,
        COLORS[i % COLORS.length],
      )
    }
  }
}

export default ParticleAnimator
