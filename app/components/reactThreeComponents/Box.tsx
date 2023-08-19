import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Box(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta
    meshRef.current.rotation.y += delta;
  })
  return (
    <mesh
      {...props}
      ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color='cyan' />
    </mesh>
  )
}
