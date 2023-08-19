import { WEBGL_CONTEXT_TYPE } from "@/app/globalTypes"
import { Animator } from "../Animator"
import * as THREE from 'three'
import * as TWEEN from "@tweenjs/tween.js";

interface xyz {
  x: number
  y: number
  z: number
}

interface Keyframe {
  position: xyz
  rotation: xyz
}

const PI = Math.PI

class FlipAnimator extends Animator {
  renderingContext: WEBGL_CONTEXT_TYPE = 'webgl2'
  declare ctx: WebGL2RenderingContext
  declare renderer: THREE.WebGLRenderer
  declare scene: THREE.Scene
  declare camera: THREE.PerspectiveCamera
  declare cube: THREE.Mesh
  declare tweens: TWEEN.Tween<xyz>[]
  declare nextTweenIndex: number

  constructor(canvasElement: HTMLCanvasElement) {
    super(canvasElement)

    // Set up scene, renderer, & camera
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasElement })
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    // Define tweens and next tween
    const coordSequence: xyz[] = [
      {x: 0, y: 0, z: 0},
      {x: PI, y: 0, z: PI}
    ]

    this.nextTweenIndex = 0
    this.tweens = []

    coordSequence.forEach((_, i) => {
      const nextCoords = coordSequence[(i+1) % coordSequence.length]
      this.tweens.push(
        new TWEEN.Tween(this.camera.rotation)
          .to(nextCoords)
          .easing(TWEEN.Easing.Back.InOut) // TODO: Look at using interpolation instead of easing???
      )
    })

    console.log(this.tweens)

    // Set up box 1
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    this.cube = new THREE.Mesh(boxGeometry, boxMaterial)
    this.cube.position.set(4, 0, -4)
    this.scene.add(this.cube)

    // Set up plane 1
    const imageTexture = new THREE.TextureLoader().load('http://placekitten.com/200/200')

    var imageMaterial = new THREE.MeshBasicMaterial({map: imageTexture});
    if (imageMaterial.map) {
      imageMaterial.map.needsUpdate = true; //ADDED
    }

    this.setupPlaneOfImages(
      5,
      imageMaterial,
      {x: 1, y: 1},
      {x: 0, y: 0, z: -3},
      {x: 0, y: 0, z: 0}
    )

    this.setupPlaneOfImages(
      5,
      imageMaterial,
      {x: 1, y: 1},
      {x: 0, y: 0, z: 3},
      {x: 0, y: Math.PI, z: 0}
    )
    
    // Render call. SHOULD BE THE LAST THING IN THE CONSTRUCTOR
    this.renderer.render(this.scene, this.camera)
  }

  private setupPlaneOfImages(
    gridSize: number,
    imageMaterial: THREE.MeshBasicMaterial,
    imageSize: {x: number, y: number},
    planeCoords: {x: number, y: number, z: number},
    planeRotation: {x: number, y: number, z: number}
  ) {
    const xPadding = .1
    const yPadding = .1
    const xOffset = -((gridSize - 1) * (imageSize.x + xPadding))/2
    const yOffset = -((gridSize - 1) * (imageSize.y + yPadding))/2

    for (var i = 0; i < gridSize; i++) {
      for (var j = 0; j < gridSize; j++) {
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(imageSize.x, imageSize.y), imageMaterial)
        plane.position.set(
          xOffset + planeCoords.x + i * (imageSize.x + xPadding),
          yOffset + planeCoords.y + j * (imageSize.y + yPadding),
          planeCoords.z
        )
        plane.rotation.set(planeRotation.x, planeRotation.y, planeRotation.z)
        this.scene.add(plane)
      }
    }
  }

  public resize() {
    super.resize()
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  animate() {
    super.animate()
    this.renderer.render(this.scene, this.camera);
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    TWEEN.update();
  }

  onClick() {
    console.log('onClick', this.nextTweenIndex)

    // Start next tween
    this.tweens[this.nextTweenIndex].start()
    this.nextTweenIndex = (this.nextTweenIndex + 1) % this.tweens.length
  }
}

export default FlipAnimator
