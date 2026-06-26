"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Direction of the initial offset */
  direction?: "up" | "left" | "none"
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduced = useReducedMotion()

  const initial = reduced
    ? {}
    : {
        opacity: 0,
        y: direction === "up" ? 24 : 0,
        x: direction === "left" ? 24 : 0,
      }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
