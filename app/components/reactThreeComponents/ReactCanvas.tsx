'use client'

import { animationType } from "../../globalTypes";
import { Canvas as ReactThreeCanvas, useThree } from '@react-three/fiber'
import Box from "./Box";
import PlaneOfImages from "./PlaneOfImages";
import { useState } from "react";
import { useSpring, animated } from '@react-spring/three'

const PI = Math.PI

interface ReactCanvasProps {
  selectedAnimation: animationType
}

type ViewedPlane = 'front' | 'back'

const ReactCanvas: React.FC<ReactCanvasProps> = (
  {selectedAnimation}
) => {
  const [viewedPlane, setViewedPlane] = useState<ViewedPlane>('front')
  const {planeRotation} = useSpring(
    {planeRotation: viewedPlane ? [0, 0, 0] : [2 * PI, 0, 0]}
  )

  const toggleViewedPlane = () => {
    setViewedPlane(viewedPlane === 'front' ? 'back': 'front')
  }

  return (
    <>
      <ReactThreeCanvas
        onClick={() => toggleViewedPlane()}
        camera={{
          position: [0, 0, 0]
        }}
      >
        <Box position={[4, 0, -4]} />
        <PlaneOfImages
          position={[0, 0, -5]}
          rotation={[0, 0, 0]}
          imageSize={[1, 1]}
          gridSize={5} />
      </ReactThreeCanvas>
    </>
  )
}

export default ReactCanvas
