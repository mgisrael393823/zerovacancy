# Border Animation Components

This directory contains components that provide animated border effects.

## Components

- **BorderBeam**: A beam of light that animates around the element's border
- **OptimizedBorderBeam**: An optimized version of the BorderBeam for better performance
- **MovingBorder**: An animated border with a marker that moves along the border path

## Usage

```tsx
import { BorderBeam } from "@/components/ui/animations/borders/border-beam";
import { MovingBorder } from "@/components/ui/animations/borders/moving-border";

export default function AnimatedBorderExample() {
  return (
    <div className="relative p-4 rounded-lg border border-gray-200">
      <BorderBeam 
        size={200} 
        duration={15} 
        colorFrom="#ffaa40" 
        colorTo="#9c40ff"
      />
      <h2>Content with animated border</h2>
    </div>
  );
}
```

## Performance Considerations

- `OptimizedBorderBeam` is recommended for better performance on mobile devices
- Animation timings can be adjusted to reduce CPU usage
- Animations are automatically disabled on mobile devices to preserve battery life
