# Squares Component

A composite visualization component that combines an animated grid with border beam and glowing effects to create an interactive square pattern.

## Usage

```tsx
import { Squares } from "@/components/ui/visualizations/squares";

export default function SquaresDemo() {
  return (
    <div className="h-64 w-full">
      <Squares 
        direction="right"
        speed={1}
        borderColor="#6366f1"
        squareSize={32}
        hoverFillColor="#4f46e5"
      />
    </div>
  );
}
```

## Props

- `direction`: "right" | "left" | "up" | "down" | "diagonal" - Direction of animation (default: "right")
- `speed`: number - Animation speed (default: 1)
- `borderColor`: string - Color of square borders (default: "#333")
- `squareSize`: number - Size of squares in pixels (default: 32)
- `hoverFillColor`: string - Color to fill squares on hover (default: "#222")
- `className`: string - Optional CSS class to apply to the container

## Features

- Composite component combining multiple visual effects
- Animated grid of squares that respond to interaction
- Glowing border beam effect for visual interest
- Rounded container with overflow handling
- Configurable animation direction and speed

## Implementation Details

- Uses the `BorderBeam` component for animated border effects
- Uses the `AnimatedGrid` component for the main grid visualization
- Uses the `GlowingEffect` component for enhanced hover states
- All effects are combined in a container with proper positioning

## Examples

### Basic Squares

```tsx
<Squares />
```

### Custom Colors

```tsx
<Squares 
  borderColor="#ef4444"
  hoverFillColor="#b91c1c"
/>
```

### Diagonal Direction with Larger Squares

```tsx
<Squares 
  direction="diagonal"
  squareSize={48}
  speed={0.8}
/>
```

### Within a Card

```tsx
<div className="rounded-xl overflow-hidden shadow-lg">
  <div className="h-40">
    <Squares borderColor="#8b5cf6" hoverFillColor="#7c3aed" />
  </div>
  <div className="p-4 bg-white">
    <h3 className="font-medium">Card Title</h3>
    <p>Card content</p>
  </div>
</div>
```