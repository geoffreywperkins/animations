import { animationRenderingContext } from "../globalTypes"

export class Animator {
  declare renderingContext: animationRenderingContext
  declare stageWidth: number
  declare stageHeight: number
  declare canvasElement: HTMLCanvasElement
  declare ctx: RenderingContext
  declare shouldAnimate: boolean

  constructor(canvasElement: HTMLCanvasElement) {
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight
    this.canvasElement = canvasElement
    this.shouldAnimate = true
  }

  resize() {
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight
    this.canvasElement.width = this.stageWidth
    this.canvasElement.height = this.stageHeight
  }

  animate() {
    if (!this.shouldAnimate) return
    window.requestAnimationFrame(() => this.animate()) // Schedule animation for next frame
  }

  stopAnimation() {
    this.shouldAnimate = false
  }

  onClick() {
    
  }
}
