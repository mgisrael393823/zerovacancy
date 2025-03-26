# Skeleton Component

A skeleton loading component that provides visual feedback while content is loading.

## Usage

```tsx
import { Skeleton } from "@/components/ui/data-display/skeleton";

export default function SkeletonExample() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <Skeleton className="h-[300px] w-full rounded-xl" />
    </div>
  );
}
```

## Features

- Customizable dimensions
- Pulsing animation
- Shape flexibility (squares, circles, etc.)
- Lightweight implementation
- Responsive design
