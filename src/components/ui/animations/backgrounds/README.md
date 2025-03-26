# Background Animation Components

This directory contains background animation components that provide dynamic and interactive background effects.

## Components

- `FloatingBackground`: Animated floating shapes in the background
- `GradientBlobBackground`: Animated gradient blob background effects

## Usage

```tsx
import { FloatingBackground, GradientBlobBackground } from '@/components/ui/animations/backgrounds';

// Floating background example
<FloatingBackground intensity="medium">
  <YourContent />
</FloatingBackground>

// Gradient blob background example
<GradientBlobBackground withSpotlight>
  <YourContent />
</GradientBlobBackground>
```
