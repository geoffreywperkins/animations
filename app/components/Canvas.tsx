'use client'

import { useEffect, useState } from "react"
import { ANIMATION_TYPE_TO_ANIMATOR_CLASS } from "../globalConstants";
import { animationType } from "../globalTypes";
import { Animator } from "../animations/Animator";

interface CanvasProps {
  selectedAnimation: animationType
}

const Canvas: React.FC<CanvasProps> = (
  {selectedAnimation}
) => {
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement>()
  const [animator, setAnimator] = useState<Animator>()

  const resizeListener = () => {
    if (canvasElement && animator) {
      animator.resize()
    }
  }

  const onClickHandler = () => {
    if (animator) {
      animator.onClick()
    }
  }

  useEffect(() => {
    // Stop previous animation
    if (animator) {
      animator.stopAnimation()
    }

    // Delete old canvas
    const canvasWrapper = document.getElementById('canvas-wrapper')!
    canvasWrapper.children

    // Create new canvas
    const newCanvasString = '<canvas id="canvas" class="h-full -z-10"/>'
    const template = document.createElement('template')
    template.innerHTML = newCanvasString

    const newCanvasElement = template.content.firstChild! as HTMLCanvasElement
    canvasWrapper.replaceChildren(newCanvasElement)
    setCanvasElement(newCanvasElement)
  }, [selectedAnimation])

  useEffect(() => {
    // Set up new animator instance
    const Animator = ANIMATION_TYPE_TO_ANIMATOR_CLASS[selectedAnimation]
    if (canvasElement) {
      setAnimator(new Animator(canvasElement))
    }
  }, [canvasElement])

  useEffect(() => {
    if (!animator) return

    window.addEventListener('resize', () => resizeListener())
    resizeListener()

    window.requestAnimationFrame(() => animator.animate())

    return () => window.removeEventListener('resize', () => resizeListener());
  }, [animator])

  return (
    <div id="canvas-wrapper" className="h-full fixed top-0 left-0 z-0" onClick={onClickHandler}>

    </div>
  )
}

export default Canvas
