import React, { Suspense, useRef } from "react"
import SEO from "../components/seo"
import {
  Canvas,
  useLoader,
  useFrame,
  extend,
  useThree,
} from "react-three-fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import model from "../models/targetB.glb"
//import model1 from "../models/hamburger.glb"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import Layout from "../components/layout"

extend({ OrbitControls })

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  )
}

function ArWing() {
  const group = useRef()
  const { nodes } = useLoader(GLTFLoader, model)
  console.log(nodes)
  return (
    <group ref={group}>
      <mesh visible geometry={nodes.Mesh_targetB.geometry}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  )
}

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree()

  const controls = useRef(null)
  useFrame(state => controls.current.update())
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={true}
      maxAzimuthAngle={Math.PI / 2}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 2}
      minPolarAngle={0}
    />
  )
}

const aboutPage = () => {
  return (
    <Layout>
      <SEO title="MKMR About" />
      <Canvas style={{ background: "white" }}>
        <CameraControls />
        <directionalLight intensity={0.3} />
        <Suspense fallback={<Loading />}>
          <ArWing />
        </Suspense>
      </Canvas>
    </Layout>
  )
}

export default aboutPage
