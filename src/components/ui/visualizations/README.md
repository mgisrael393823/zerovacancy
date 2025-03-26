# Visualization Components

This directory contains components that create visual effects, patterns, and data visualizations.

## Available Components

### Waves

The `Waves` component creates an animated wave grid pattern using HTML Canvas.

```tsx
import { Waves } from "@/components/ui/visualizations/waves";

<Waves 
  lineColor="rgba(99, 102, 241, 0.2)" 
  backgroundColor="#f8fafc"
/>
```

### Pill Rating

The `PillRating` component displays ratings in a compact, pill-shaped format.

```tsx
import { PillRating } from "@/components/ui/visualizations/rating";

<PillRating rating={4.7} reviews={128} />
```

### Squares

The `Squares` component creates an animated grid of interactive squares.

```tsx
import { Squares } from "@/components/ui/visualizations/squares";

<Squares 
  direction="right"
  borderColor="#6366f1"
/>
```

### Sparkles

The `SparklesCore` component creates a customizable particle system for sparkle effects.

```tsx
import { SparklesCore } from "@/components/ui/visualizations/sparkles";

<SparklesCore
  background="transparent"
  particleColor="#ffffff"
  particleDensity={100}
/>
```

## Usage Guidelines

- Use visualization components to enhance the visual appeal of your UI
- Consider performance implications on lower-end devices
- Ensure visualizations align with your application's overall design
- For data visualizations, prioritize clarity and accuracy over aesthetics