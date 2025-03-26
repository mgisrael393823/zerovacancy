# Wavy Background Component

A dynamic, canvas-based wavy background animation that creates smooth, colorful waves.

## Usage

```tsx
import { WavyBackground } from "@/components/ui/backgrounds/wavy";

export default function WavyBackgroundDemo() {
  return (
    <WavyBackground className="p-8">
      <div className="backdrop-blur-sm bg-white/75 dark:bg-gray-950/75 rounded-2xl p-8 shadow-lg">
        <h3 className="text-xl font-bold mb-2">Content with Wavy Background</h3>
        <p className="text-gray-700 dark:text-gray-300">
          This content is displayed on top of a beautiful wavy animated background.
        </p>
      </div>
    </WavyBackground>
  );
}
```

## Props

- `children`: React.ReactNode - The content to display on top of the wavy background
- `className`: string - Optional CSS class to apply to the inner content container
- `containerClassName`: string - Optional CSS class to apply to the outer container
- `colors`: string[] - Optional array of colors to use for the waves (defaults to blue/purple gradients)
- `waveWidth`: number - Optional width of the wave lines (defaults to 50)
- `backgroundFill`: string - Optional background color (defaults to "black")
- `blur`: number - Optional blur amount for the waves (defaults to 10)
- `speed`: "slow" | "fast" - Optional animation speed (defaults to "fast")
- `waveOpacity`: number - Optional opacity for the waves (defaults to 0.5)

## Features

- Dynamic, canvas-based animation using noise functions
- Smooth, colorful wave patterns
- Responsive to window resizing
- Configurable colors, speed, and blur effects
- Special handling for Safari browsers
- Proper z-index stacking for content visibility

## Examples

### Custom Colors

```tsx
<WavyBackground 
  colors={["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff"]}
  className="p-6 text-white"
>
  <div className="backdrop-blur-md bg-black/30 rounded-2xl p-6">
    <h4 className="font-medium">Rainbow Waves</h4>
    <p className="text-sm">
      This example uses custom rainbow colors for the waves.
    </p>
  </div>
</WavyBackground>
```

### Slow Speed with Higher Opacity

```tsx
<WavyBackground 
  speed="slow"
  waveOpacity={0.8}
  blur={5}
  className="p-8"
>
  <div className="backdrop-blur-md bg-white/60 dark:bg-gray-900/60 rounded-2xl p-8">
    <h3 className="text-xl font-bold">Slow Waves</h3>
    <p>This example uses slower wave animations with higher opacity and less blur.</p>
  </div>
</WavyBackground>
```