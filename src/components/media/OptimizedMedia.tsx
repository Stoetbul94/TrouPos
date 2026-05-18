import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export function OptimizedMedia({
  src,
  alt,
  priority,
  className,
  sizes = "100vw",
  fill,
  aspectRatio = "3/4",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
  aspectRatio?: string;
}) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div className={cn("relative w-full overflow-hidden", className)} style={{ aspectRatio }}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
