# Sparkles Core Component

A highly customizable particle system component that creates animated sparkle effects.

## Usage

```tsx
import { SparklesCore } from "@/components/ui/visualizations/sparkles";

export default function SparklesDemo() {
  return (
    <div className="h-screen w-full bg-black">
      <SparklesCore
        id="sparkles"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleColor="#ffffff"
        particleDensity={100}
        className="w-full h-full"
      />
    </div>
  );
}
```

## Props

- `id`: string - Optional unique ID for the particles container
- `className`: string - Optional CSS class to apply to the container
- `background`: string - Background color of the particles container (default: "#0d47a1")
- `minSize`: number - Minimum size of particles in pixels (default: 1)
- `maxSize`: number - Maximum size of particles in pixels (default: 3)
- `speed`: number - Animation speed of particles (default: 4)
- `particleColor`: string - Color of the particles (default: "#ffffff")
- `particleDensity`: number - Density/number of particles (default: 120)

## Features

- Animated particle system with customizable properties
- Interactive particles that respond to clicks
- Fade-in animation when loaded
- Performance optimized with FPS limits
- Responsive to container size
- Configurable particle appearance and behavior

## Implementation Details

- Uses @tsparticles/react for the particle system
- Implements Framer Motion for container animations
- Lazy-loads the particle engine for better performance
- Handles initialization and cleanup properly
- Highly configurable with sensible defaults

## Examples

### Colorful Sparkles

```tsx
<SparklesCore
  background="#111111"
  particleColor="#ff5e78"
  minSize={1}
  maxSize={3}
  speed={2}
  particleDensity={80}
  className="rounded-lg"
/>
```

### Subtle Background Effect

```tsx
<div className="relative">
  <SparklesCore
    background="transparent"
    particleColor="rgba(100, 100, 255, 0.3)"
    minSize={0.2}
    maxSize={0.8}
    speed={1}
    particleDensity={40}
    className="absolute inset-0 z-0"
  />
  <div className="relative z-10 p-8">
    <h2 className="text-2xl font-bold">Your content here</h2>
    <p>This content appears above the subtle sparkle effect</p>
  </div>
</div>
```

### High-Density Star Field

```tsx
<SparklesCore
  background="#050816"
  particleColor="#ffffff"
  minSize={0.2}
  maxSize={1.5}
  speed={0.5}
  particleDensity={200}
  className="w-full h-[500px]"
/>
```