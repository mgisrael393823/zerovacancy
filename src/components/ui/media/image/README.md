# Image Components

This directory contains optimized image components that implement best practices for web image loading and display.

## Optimized Image

A general-purpose image component with various optimizations:

```tsx
import { OptimizedImage } from "@/components/ui/media/image";

export default function MyComponent() {
  return (
    <OptimizedImage 
      src="/path/to/image.jpg" 
      alt="Description of the image"
      width={800}
      height={600}
      priority={false}
      blurPlaceholder={true}
      quality="high"
    />
  );
}
```

## Desktop Optimized Image

An image component with specific optimizations for desktop devices:

```tsx
import { DesktopOptimizedImage } from "@/components/ui/media/image";

export default function MyComponent() {
  return (
    <DesktopOptimizedImage
      src="/path/to/image.jpg"
      alt="Description of the image"
      width={1200}
      height={675}
      aspectRatio="16:9"
      priority={true}
    />
  );
}
```

## Features

- Modern image formats (WebP, AVIF) with appropriate fallbacks
- Lazy loading with Intersection Observer
- Responsive sizing and aspect ratio preservation
- Placeholder loading states
- Hardware-accelerated animations
- Priority loading for critical above-the-fold images
- Error handling with fallback display
