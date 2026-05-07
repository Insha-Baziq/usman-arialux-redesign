"use client";

import { motion, useReducedMotion } from "framer-motion";

type WhoWeAreMissionRevealProps = {
  eyebrow: string;
  heading: string;
  hero: string;
  mission: string;
};

const easing = [0.45, 0, 0.55, 1] as const;

export function WhoWeAreMissionReveal({
  eyebrow,
  heading,
  hero,
  mission,
}: WhoWeAreMissionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const maskChildAnimation = shouldReduceMotion
    ? { y: 0, opacity: 1 }
    : { y: ["105%", "0%"], opacity: [0, 1] };

  return (
    <section id="mission" className="bg-background px-6 py-10 sm:py-14 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
        <motion.div
          className="who-we-are-image-panel overflow-hidden rounded-[1.35rem] bg-transparent lg:sticky lg:top-24 lg:h-[28.5rem] lg:min-h-[28.5rem]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easing }}
        >
          <motion.img
            src={hero}
            alt="AriaLux Homes"
            className="block h-full min-h-[24rem] w-full object-contain sm:min-h-[30rem] lg:min-h-0"
            initial={shouldReduceMotion ? false : { scale: 1 }}
            animate={shouldReduceMotion ? { scale: 1 } : { scale: 1.03 }}
            transition={{ duration: 10, ease: easing }}
          />
        </motion.div>

        <div className="who-we-are-motion-copy max-w-[42rem] self-start pt-2 text-center lg:justify-self-start lg:pt-0 lg:text-left">
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block text-[0.72rem] uppercase tracking-[0.3em] text-black/55"
              initial={shouldReduceMotion ? false : { y: "105%", opacity: 0 }}
              animate={maskChildAnimation}
              transition={{ duration: 0.95, ease: easing }}
            >
              {eyebrow}
            </motion.span>
          </span>

          <span className="mt-4 block overflow-hidden pb-2">
            <motion.h2
              className="font-heading text-[2rem] font-light leading-tight text-black sm:text-[2.5rem] lg:text-[3rem]"
              initial={shouldReduceMotion ? false : { y: "105%", opacity: 0 }}
              animate={maskChildAnimation}
              transition={{ duration: 1.05, delay: 0.08, ease: easing }}
            >
              {heading}
            </motion.h2>
          </span>

          <motion.p
            className="mx-auto mt-8 max-w-[52rem] text-left text-[1.05rem] font-light leading-8 text-black/75 sm:text-[1.1rem] sm:leading-[2.05rem] lg:mx-0"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.3, ease: easing }}
          >
            {mission}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
