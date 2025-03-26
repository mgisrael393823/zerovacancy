# Progress Component

A progress bar component that visually represents the completion of a task or process.

## Usage

```tsx
import { Progress } from "@/components/ui/data-display/progress";

export default function ProgressExample() {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Uploading...</span>
        <span className="text-sm text-muted-foreground">33%</span>
      </div>
      <Progress value={33} />
    </div>
  );
}
```

## Features

- Animated progress indication
- Customizable styling
- Accepts percentage value
- Smooth transitions between states
- Built on Radix UI primitives for accessibility
