"use client"

import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import type { ComponentPropsWithoutRef } from "react"

const MotionDiv = motion.div
const MotionLink = motion(Link)

const hoverProps = {
  whileHover: { y: -3, transition: { type: "spring" as const, stiffness: 380, damping: 22 } },
}

export function MotionCard({
  className,
  children,
}: ComponentPropsWithoutRef<"div">) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <MotionDiv className={className} {...hoverProps}>
      {children}
    </MotionDiv>
  )
}

export function MotionCardLink({
  href,
  className,
  children,
  target,
  rel,
}: ComponentPropsWithoutRef<typeof Link>) {
  const reduced = useReducedMotion()
  if (reduced) return <Link href={href} className={className} target={target} rel={rel}>{children}</Link>
  return (
    <MotionLink href={href} className={className} target={target} rel={rel} {...hoverProps}>
      {children}
    </MotionLink>
  )
}
