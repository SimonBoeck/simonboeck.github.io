import { animate, inView, press } from "motion";

const DURATION = 0.4;
const EASE = "easeOut";

function reveal(target: Element | Element[], extra: Record<string, unknown> = {}) {
  return animate(target, { opacity: 1, y: 0 }, { duration: DURATION, ease: EASE, ...extra });
}

export function initRevealAnimations() {
  if (!document.documentElement.classList.contains("js-ready")) return;

  document.querySelectorAll<HTMLElement>("[data-animate='load']").forEach((el, i) => {
    reveal(el, { delay: i * 0.05 });
  });

  // Reveal each [data-animate='scroll'] element as it individually enters the
  // viewport. Items inside a [data-stagger-group] get a small index-based delay
  // so siblings that enter together still animate in as a stagger.
  //
  // Each item is observed on its own (not the group container) because a
  // group's total height can exceed what a small viewport can ever satisfy
  // for a ratio-based amount (e.g. a tall list of CV entries on a phone),
  // which would leave the whole group permanently unrevealed.
  document.querySelectorAll<HTMLElement>("[data-stagger-group]").forEach((group) => {
    const items = Array.from(group.querySelectorAll<HTMLElement>("[data-animate='scroll']"));
    items.forEach((el, i) => {
      inView(
        el,
        () => {
          reveal(el, { delay: i * 0.04 });
        },
        { amount: "some" }
      );
    });
  });

  document.querySelectorAll<HTMLElement>("[data-animate='scroll']").forEach((el) => {
    if (el.closest("[data-stagger-group]")) return;
    inView(
      el,
      () => {
        reveal(el);
      },
      { amount: "some" }
    );
  });
}

export function initPressFeedback() {
  document.querySelectorAll<HTMLElement>("[data-press]").forEach((el) => {
    press(el, () => {
      animate(el, { scale: 0.97 }, { duration: 0.1 });
      return () => animate(el, { scale: 1 }, { duration: 0.15 });
    });
  });
}
