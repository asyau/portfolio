"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

const HeroScene = dynamic(
  () => import("@/components/hero-scene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
)

export function HeroSceneClient() {
  return (
    <Suspense fallback={null}>
      <HeroScene />
    </Suspense>
  )
}
