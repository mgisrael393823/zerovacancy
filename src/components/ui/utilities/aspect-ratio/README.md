# AspectRatio Component

A component that maintains a consistent aspect ratio.

## Features

- Maintains specified aspect ratio for content
- Useful for images, videos, and other media
- Prevents layout shift during loading

## Usage

```tsx
import { AspectRatio } from '@/components/ui/utilities/aspect-ratio';

export function AspectRatioDemo() {
  return (
    <div className="w-[300px]">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://example.com/image.jpg"
          alt="Image"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  );
}
```
