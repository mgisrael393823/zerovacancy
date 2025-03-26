# Spotlight Animation Components

This directory contains spotlight animation components that create interactive spotlight effects.

## Components

- `Spotlight`: Full-featured spotlight effect that follows the mouse
- `OptimizedSpotlight`: Performance-optimized version of the spotlight effect

## Usage

```tsx
import { Spotlight, OptimizedSpotlight } from '@/components/ui/animations/spotlight';

// Standard spotlight example
<Spotlight className="w-full h-64" size={300} color="rgba(255, 255, 255, 0.1)">
  <YourContent />
</Spotlight>

// Optimized spotlight example (better performance)
<div className="relative h-64 w-full">
  <OptimizedSpotlight className="from-blue-500/20 via-cyan-500/20 to-teal-500/20" />
  <YourContent className="relative z-10" />
</div>
```
