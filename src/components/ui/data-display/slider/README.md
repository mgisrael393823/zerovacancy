# Slider Component

A slider component that allows users to make selections from a range of values.

## Usage

```tsx
import { Slider } from "@/components/ui/data-display/slider";

export default function SliderExample() {
  return (
    <div className="w-full max-w-sm px-8 py-6">
      <div className="space-y-2">
        <h4 className="font-medium">Volume</h4>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
    </div>
  );
}
```

## Features

- Range selection
- Customizable min, max, and step values
- Multiple thumbs support
- Keyboard accessible
- Touch-friendly
- Customizable styling
- Built on Radix UI primitives for accessibility
