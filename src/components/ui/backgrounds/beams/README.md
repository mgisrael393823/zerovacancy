# Beams Background Component

A component that provides an optimized background with various visual patterns, gradients, and highlights.

## Usage

```tsx
import { BeamsBackground } from "@/components/ui/backgrounds/beams";

export default function BeamsBackgroundDemo() {
  return (
    <BeamsBackground intensity="medium" className="p-8 min-h-screen">
      <div className="bg-white/90 dark:bg-gray-950/90 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-2">Content with Beams Background</h3>
        <p className="text-gray-700 dark:text-gray-300">
          This content is displayed on top of a beautiful beams background pattern.
        </p>
      </div>
    </BeamsBackground>
  );
}
```

## Props

### BeamsBackground Component

- `children`: React.ReactNode - The content to display inside the background
- `className`: string - Optional CSS class to apply to the container
- `intensity`: "subtle" | "medium" | "strong" - Controls the intensity of the background pattern (default: "medium")
- `id`: string - Optional ID for the container element

### OptimizedBackground Component (Advanced Usage)

The BeamsBackground uses the OptimizedBackground component internally, which provides more customization options:

- `children`: React.ReactNode - The content to display inside the background
- `className`: string - Optional CSS class to apply to the container
- `sectionIndex`: number - Index that controls the background gradient style (0-2)
- `pattern`: 'diagonal' | 'dots' | 'grid' - Background pattern style
- `patternOpacity`: number - Opacity of the background pattern (0-1)
- `withRadialGradient`: boolean - Whether to include a radial gradient effect
- `withTopHighlight`: boolean - Whether to include a highlight at the top
- `id`: string - Optional ID for the container element

## Features

- Optimized for performance with static CSS-based patterns
- Multiple intensity levels to match your design needs
- Support for different pattern styles: diagonal, dots, grid
- Optional radial gradient and top highlight effects
- Proper z-index stacking for content visibility

## Examples

### Subtle Intensity

```tsx
<BeamsBackground intensity="subtle" className="p-6 min-h-[400px]">
  <div className="bg-white/95 dark:bg-gray-900/95 rounded-2xl p-6 backdrop-blur-sm">
    <h4 className="font-medium">Subtle Beams Background</h4>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      This card has a subtle beams background pattern.
    </p>
  </div>
</BeamsBackground>
```

### Strong Intensity

```tsx
<BeamsBackground intensity="strong" className="p-8 min-h-[500px]">
  <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl p-8 backdrop-blur-sm">
    <h3 className="text-xl font-bold">Strong Beams Background</h3>
    <p>This card has a strong beams background pattern that's more visible.</p>
  </div>
</BeamsBackground>
```

### Using OptimizedBackground Directly (Advanced)

```tsx
import { OptimizedBackground } from "@/components/ui/backgrounds/beams";

export default function CustomBackgroundDemo() {
  return (
    <OptimizedBackground 
      sectionIndex={2}
      pattern="grid"
      patternOpacity={0.1}
      withRadialGradient={true}
      withTopHighlight={true}
      className="p-8 min-h-screen"
    >
      <div className="bg-white/80 dark:bg-gray-950/80 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-2">Custom Background</h3>
        <p>This uses the OptimizedBackground component directly for full customization.</p>
      </div>
    </OptimizedBackground>
  );
}
```