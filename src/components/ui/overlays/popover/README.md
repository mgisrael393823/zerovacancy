# Popover Component

The popover component provides a popup that appears when clicking on a trigger element. It's commonly used for displaying additional options, forms, or information that don't require a full modal dialog.

## Usage

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/overlays/popover";

export default function MyComponent() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded-md px-4 py-2 bg-primary text-white">Open Popover</button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            {/* Content goes here */}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## Features

- Click-triggered popover
- Customizable positioning
- Animated transitions
- Radix UI primitives for accessibility
