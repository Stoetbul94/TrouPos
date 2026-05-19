export function rafThrottle<T extends (...args: unknown[]) => void>(fn: T): T {
  let ticking = false;

  return ((...args: unknown[]) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      fn(...args);
    });
  }) as T;
}
