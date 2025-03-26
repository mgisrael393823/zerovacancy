# Grid Animation Components

This directory contains grid animation components that provide dynamic and interactive grid effects.

## Components

- `AnimatedGrid`: Interactive grid animation that responds to mouse movement
- `OptimizedAnimatedGrid`: Performance-optimized version of the animated grid

## Usage

```tsx
import { AnimatedGrid, OptimizedAnimatedGrid } from '@/components/ui/animations/grid';

// Standard animated grid example
<AnimatedGrid className="absolute inset-0" />

// Optimized animated grid example (better performance)
<OptimizedAnimatedGrid 
  className="absolute inset-0" 
  colors={['#dd7bbb', '#d79f1e', '#5a922c', '#4c7894']} 
/>
```
