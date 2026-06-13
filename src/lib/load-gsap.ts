type GsapModule = typeof import("gsap");
type ScrollTriggerModule = typeof import("gsap/ScrollTrigger");

let gsapPromise:
  | Promise<{
      gsap: GsapModule["gsap"];
      ScrollTrigger: ScrollTriggerModule["ScrollTrigger"];
    }>
  | undefined;

export function loadGsap() {
  gsapPromise ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]).then(([gsapModule, scrollTriggerModule]) => {
    const { gsap } = gsapModule;
    const { ScrollTrigger } = scrollTriggerModule;

    gsap.registerPlugin(ScrollTrigger);

    return { gsap, ScrollTrigger };
  });

  return gsapPromise;
}
