import { ThreeElements, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"

type ImagePlaneProps = ThreeElements['mesh'] & {
  imageSize: [x: number, y: number]
}

export default function ImagePlane({imageSize, ...props}: ImagePlaneProps) {
  const colorMap = useLoader(TextureLoader, 'http://placekitten.com/200/200')

  return (
    <mesh {...props}>
      <planeGeometry args={imageSize} />
      <meshBasicMaterial map={colorMap} />
    </mesh>
  )
}
