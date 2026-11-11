import { animate, inView, press, stagger } from "motion";

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

  document.querySelectorAll<HTMLElement>("[data-stagger-group]").forEach((group) => {
    const items = Array.from(group.querySelectorAll<HTMLElement>("[data-animate='scroll']"));
    if (items.length === 0) return;
    inView(
      group,
      () => {
        reveal(items, { delay: stagger(0.04) });
      },
      { amount: 0.2 }
    );
  });

  document.querySelectorAll<HTMLElement>("[data-animate='scroll']").forEach((el) => {
    if (el.closest("[data-stagger-group]")) return;
    inView(
      el,
      () => {
        reveal(el);
      },
      { amount: 0.2 }
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
