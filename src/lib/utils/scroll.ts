/** Smooth scroll with fallback for in-app / reduced-motion browsers */
export function scrollToElement(
  id: string,
  options?: { behavior?: ScrollBehavior },
) {
  const el = document.getElementById(id);
  if (!el) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const inApp = /WhatsApp|Instagram|FBAN|MicroMessenger/i.test(
    navigator.userAgent,
  );

  el.scrollIntoView({
    behavior:
      options?.behavior ??
      (prefersReduced || inApp ? "auto" : "smooth"),
    block: "start",
  });
}
