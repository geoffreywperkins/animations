import { ThreeElements } from "@react-three/fiber";
import { Euler } from "three";
import ImagePlane from "./ImagePlane";

type PlaneOfImagesProps = Omit<ThreeElements['mesh'], 'position'> & {
  position: [x: number, y: number, z: number]
  imageSize: [x: number, y: number]
  gridSize: number
}

export default function PlaneOfImages({position, gridSize, imageSize, rotation}: PlaneOfImagesProps) {
  const images = []
  const xPadding = .1
  const yPadding = .1
  const xOffset = -((gridSize - 1) * (imageSize[0] + xPadding))/2
  const yOffset = -((gridSize - 1) * (imageSize[1] + yPadding))/2

  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      const imageX = xOffset + position[0] + i * (imageSize[0] + xPadding)
      const imageY = yOffset + position[1] + j * (imageSize[1] + yPadding)
      const imageZ = position[2]
      images.push(
        <ImagePlane
          key={`${i}${j}`}
          position={[imageX, imageY, imageZ]}
          rotation={rotation}
          imageSize={imageSize} />
      )
    }
  }

  return <>{images}</>
}