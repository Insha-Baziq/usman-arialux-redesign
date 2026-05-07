"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type ContactRevealProps = {
  eyebrow: ReactNode;
  heading: ReactNode;
  body: ReactNode;
  form: ReactNode;
  notice: ReactNode;
  media: ReactNode;
  details: ReactNode;
};

const easing = [0.45, 0, 0.55, 1] as const;

export function ContactReveal({
  eyebrow,
  heading,
  body,
  form,
  notice,
  media,
  details,
}: ContactRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const maskAnimation = shouldReduceMotion
    ? { y: 0, opacity: 1 }
    : { y: ["105%", "0%"], opacity: [0, 1] };

  return (
    <div className="contact-reveal-stage grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="lg:pr-8">
        <span className="contact-heading-mask block overflow-hidden pb-1">
          <motion.span
            className="block text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#bfa15c]"
            initial={shouldReduceMotion ? false : { y: "105%", opacity: 0 }}
            animate={maskAnimation}
            transition={{ duration: 0.95, ease: easing }}
          >
            {eyebrow}
          </motion.span>
        </span>

        <span className="contact-heading-mask mt-3 block overflow-hidden pb-2">
          <motion.h1
            className="font-heading text-[2.25rem] font-light leading-[1.04] text-black sm:text-[2.75rem] lg:text-[3.25rem]"
            initial={shouldReduceMotion ? false : { y: "105%", opacity: 0 }}
            animate={maskAnimation}
            transition={{ duration: 1.05, delay: 0.08, ease: easing }}
          >
            {heading}
          </motion.h1>
        </span>

        <motion.div
          className="contact-body-reveal"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.3, ease: easing }}
        >
          <span aria-hidden="true" className="mt-4 block h-px w-16 bg-[#bfa15c]" />
          {body}
          {form}
          {notice}
        </motion.div>
      </div>

      <motion.div
        className="contact-image-reveal lg:pl-8"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.12, ease: easing }}
      >
        {media}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.3, ease: easing }}
        >
          {details}
        </motion.div>
      </motion.div>
    </div>
  );
}
