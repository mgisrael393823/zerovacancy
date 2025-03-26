# Magnetic Component

A component that creates a magnetic attraction effect, pulling elements toward the mouse cursor.

## Usage

```tsx
import { Magnetic } from "@/components/ui/effects/magnetic";

export default function MagneticButton() {
  return (
    <Magnetic intensity={0.6} range={100}>
      <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
        Hover Me
      </button>
    </Magnetic>
  );
}
```

## Props

- `children`: React.ReactNode - The element to apply the magnetic effect to
- `intensity`: number - Strength of the magnetic pull (default: 0.6)
- `range`: number - Distance in pixels from which the effect starts (default: 100)
- `actionArea`: 'self' | 'parent' | 'global' - Element that activates the effect (default: 'self')
- `springOptions`: SpringOptions - Framer Motion spring configuration for the animation

## Features

- Smooth magnetic attraction toward mouse cursor
- Configurable intensity and range
- Multiple activation modes (self, parent, or global)
- Spring physics for natural, bouncy movement
- Graceful fallback to normal positioning when not hovered

## Implementation Details

- Uses Framer Motion for smooth animations
- Creates a spring-based motion that follows the mouse position
- Calculates the distance from element center to mouse position
- Scales the effect based on distance for natural feel
- Cleans up event listeners when component unmounts

## Examples

### Parent-Activated Magnetic Effect

```tsx
<div className="relative p-12 border rounded-lg">
  <Magnetic intensity={0.4} range={150} actionArea="parent">
    <div className="bg-blue-500 text-white p-4 rounded-md inline-block">
      Move your mouse around the container
    </div>
  </Magnetic>
</div>
```

### Strong Magnetic Effect

```tsx
<Magnetic intensity={1.2} range={200}>
  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 rounded-full flex items-center justify-center w-24 h-24">
    Strong Pull
  </div>
</Magnetic>
```

### Custom Spring Physics

```tsx
<Magnetic 
  springOptions={{ 
    stiffness: 400, 
    damping: 10,
    mass: 0.5 
  }}
>
  <button className="bg-black text-white px-4 py-2 rounded">
    Bouncy Effect
  </button>
</Magnetic>
```