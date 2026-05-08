"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "fadeUp" | "fadeIn" | "scaleUp" | "slideLeft" | "slideRight";

type ScrollRevealProps = {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
  as?: "div" | "section" | "figure" | "li" | "span" | "article";
  index?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
};

const ease = [0.16, 1, 0.3, 1] as const;

const variants: Record<Variant, { hidden: TargetAndTransition; visible: TargetAndTransition }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
};

const motionComponents = {
  article: motion.article,
  div: motion.div,
  figure: motion.figure,
  li: motion.li,
  section: motion.section,
  span: motion.span,
};

export function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.9,
  className,
  id,
  as = "div",
  index = 0,
  stagger = 0,
  once = true,
  amount = 0.15,
}: ScrollRevealProps) {
  const shouldReduce = useReducedMotion();
  const v = variants[variant];
  const totalDelay = delay + index * stagger;

  const Component = motionComponents[as];

  if (shouldReduce) {
    return (
      <Component id={id} className={className}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      id={id}
      className={className}
      initial={v.hidden}
      whileInView={v.visible}
      viewport={{ once, amount }}
      transition={{ duration, delay: totalDelay, ease }}
    >
      {children}
    </Component>
  );
}

type MaskRevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

export function MaskReveal({
  children,
  delay = 0,
  duration = 1,
  className,
}: MaskRevealProps) {
  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={false}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

type LineDrawProps = {
  direction?: "horizontal" | "vertical";
  delay?: number;
  duration?: number;
  className?: string;
};

export function LineDraw({
  direction = "horizontal",
  delay = 0,
  duration = 0.8,
  className,
}: LineDrawProps) {
  const isH = direction === "horizontal";

  return (
    <motion.span
      className={className}
      aria-hidden="true"
      initial={false}
      whileInView={{ scaleX: 1, scaleY: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration, delay, ease }}
      style={{ transformOrigin: isH ? "left center" : "center top" }}
    />
  );
}
