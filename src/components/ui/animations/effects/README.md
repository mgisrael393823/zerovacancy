# Animation Effect Components

This directory contains animation effect components that provide various visual effects and animations.

## Components

- `ScrollFadeEffect`: Animated fade-in effect triggered by scrolling
- `Confetti`: Component for displaying confetti animations

## Usage

```tsx
import { ScrollFadeEffect, Confetti } from '@/components/ui/animations/effects';

// Scroll fade effect example
<ScrollFadeEffect direction="up" distance={30}>
  <YourContent />
</ScrollFadeEffect>

// Confetti example
<Confetti />
```
