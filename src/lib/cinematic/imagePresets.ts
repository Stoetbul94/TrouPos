/** Build consistent Unsplash URLs for mock / demo imagery */
export function unsplashUrl(
  photoId: string,
  options?: { width?: number; quality?: number },
): string {
  const w = options?.width ?? 1200;
  const q = options?.quality ?? 80;
  return `https://images.unsplash.com/photo-${photoId}?w=${w}&q=${q}`;
}
