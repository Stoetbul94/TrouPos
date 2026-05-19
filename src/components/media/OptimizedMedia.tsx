import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export function OptimizedMedia({
  src,
  alt,
  priority,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px",
  fill,
  aspectRatio = "3/4",
  quality = 75,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
  aspectRatio?: string;
  quality?: number;
}) {
  const loading = priority ? undefined : ("lazy" as const);
  const fetchPriority = priority ? "high" : "auto";

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={loading}
        fetchPriority={fetchPriority}
        quality={quality}
        sizes={sizes}
        decoding="async"
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={loading}
        fetchPriority={fetchPriority}
        quality={quality}
        sizes={sizes}
        decoding="async"
        className="object-cover"
      />
    </div>
  );
}
