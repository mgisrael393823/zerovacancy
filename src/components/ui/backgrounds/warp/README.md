# Warp Background Component

A 3D background component that creates the illusion of traveling through a grid with colorful beams moving towards the viewer.

## Usage

```tsx
import { WarpBackground } from "@/components/ui/backgrounds/warp";

export default function WarpBackgroundDemo() {
  return (
    <WarpBackground className="min-h-screen">
      <div className="text-center py-24">
        <h1 className="text-4xl font-bold mb-4">Warp Speed</h1>
        <p className="text-xl max-w-md mx-auto">
          Content placed inside the warp background component
        </p>
      </div>
    </WarpBackground>
  );
}
```

## Props

- `children`: React.ReactNode - The content to display inside the warp background
- `className`: string - Optional CSS class to apply to the container
- `perspective`: number - The CSS perspective value in pixels (default: 100)
- `beamsPerSide`: number - The number of beams to show per side (default: 3)
- `beamSize`: number - The size of each beam as a percentage (default: 5)
- `beamDelayMax`: number - The maximum delay before a beam appears in seconds (default: 3)
- `beamDelayMin`: number - The minimum delay before a beam appears in seconds (default: 0)
- `beamDuration`: number - How long it takes for a beam to travel in seconds (default: 3)
- `gridColor`: string - The color of the grid lines (default: "hsl(var(--border))")

## Features

- 3D perspective grid with colorful beams
- Customizable grid and beam properties
- Infinite animation
- Built with Framer Motion for smooth animations
- Uses container queries for responsive 3D effects

## Examples

### Customized Speed and Density

```tsx
<WarpBackground 
  beamsPerSide={5}
  beamDuration={2}
  beamDelayMin={0}
  beamDelayMax={1.5}
  className="min-h-[400px]"
>
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold">Faster Speed</h2>
    <p>More beams with faster movement</p>
  </div>
</WarpBackground>
```

### Custom Grid Color

```tsx
<WarpBackground 
  gridColor="rgba(100, 100, 255, 0.5)"
  perspective={150}
  className="min-h-[400px]"
>
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold">Custom Grid</h2>
    <p>Blue grid with increased perspective</p>
  </div>
</WarpBackground>
```
