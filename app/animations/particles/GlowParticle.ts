import { PARTICLE_GROWTH_SPEED, PARTICLE_SPEED } from "./particleConstants"

interface RGB {
  r: number
  g: number
  b: number
}

const PI2 = Math.PI * 2

const newSpeed = () => Math.random() * PARTICLE_SPEED

export class GlowParticle {
  declare x: number
  declare y: number
  declare minRadius: number
  declare radiusVariance: number
  declare rgb: RGB
  declare vx: number
  declare vy: number
  declare sinValue: number // Makes the growing/shrinking of the circles smooth

  constructor(x: number, y: number, minRadius: number, radiusVariance: number, rgb: RGB) {
    this.x = x
    this.y = y
    this.minRadius = minRadius
    this.radiusVariance = radiusVariance
    this.rgb = rgb

    this.vx = newSpeed()
    this.vy = newSpeed()

    this.sinValue = Math.random() * PI2
  }

  animate(ctx: CanvasRenderingContext2D, stageWidth: number, stageHeight: number) {
    this.sinValue += PARTICLE_GROWTH_SPEED
    this.sinValue %= PI2

    const radius = this.minRadius + (Math.sin(this.sinValue) * this.radiusVariance) + this.radiusVariance

    this.x += this.vx
    this.y += this.vy
    
    // Check if particle is out of bounds
    if (this.x + radius < 0) {
      this.vx *= -1
      this.x += 10
    } else if (this.x - radius > stageWidth) {
      this.vx *= -1
      this.x -= 10
    }

    if (this.y + radius < 0) {
      this.vy *= -1
      this.y += 10
    } else if (this.y - radius > stageHeight) {
      this.vy *= -1
      this.y -= 10
    }

    ctx.beginPath()

    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      radius * .01,
      this.x,
      this.y,
      radius
    )

    gradient.addColorStop(0, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, .5)`)
    gradient.addColorStop(1, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0)`)

    ctx.fillStyle = gradient
    ctx.arc(this.x, this.y, radius, 0, PI2, false)
    ctx.fill()
  }
}
