# Tooltip Component

A tooltip component that displays additional information when hovering over an element.

## Features

- Shows content on hover
- Customizable position and offset
- Animated entrance/exit
- Keyboard accessible

## Usage

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/feedback/tooltip';

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```
