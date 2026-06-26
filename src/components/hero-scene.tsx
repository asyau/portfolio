"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import { useReducedMotion } from "framer-motion"
import type * as THREE from "three"

// Accent color approximations for both themes
const LIGHT_COLOR = "#6d28d9"
const DARK_COLOR = "#a78bfa"

function DistortedSphere({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.12
    meshRef.current.rotation.x +=
      (mouse.current.y * 0.25 - meshRef.current.rotation.x) * 0.04
    meshRef.current.rotation.z +=
      (mouse.current.x * 0.08 - meshRef.current.rotation.z) * 0.04
  })

  return (
    <Sphere ref={meshRef} args={[1.8, 80, 80]}>
      <MeshDistortMaterial
        color={color}
        wireframe
        distort={0.3}
        speed={1.5}
        transparent
        opacity={0.18}
      />
    </Sphere>
  )
}

export function HeroScene() {
  const reduced = useReducedMotion()
  const [color, setColor] = useState(LIGHT_COLOR)

  useEffect(() => {
    const sync = () => {
      setColor(
        document.documentElement.classList.contains("dark") ? DARK_COLOR : LIGHT_COLOR
      )
    }
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => obs.disconnect()
  }, [])

  // Skip on reduced-motion or low-end devices
  if (reduced) return null
  if (typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 2) return null

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ pointerEvents: "none" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1} />
      <DistortedSphere color={color} />
    </Canvas>
  )
}
