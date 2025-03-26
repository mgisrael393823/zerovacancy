# Animation Components

This directory contains components that provide visual animations and effects used throughout the application.

## Components

- **Border Effects**: Animated borders and glowing effects
- **Background Effects**: Animated backgrounds and gradients
- **Text Effects**: Animated and interactive text components
- **Particle Effects**: Confetti and sparkles components

## Usage

Each component can be imported individually from its respective subdirectory, or the main barrel export:

```tsx
// Individual import
import { BorderBeam } from "@/components/ui/animations/borders/border-beam";

// Or from the main barrel export
import { BorderBeam, SparklesCore } from "@/components/ui/animations";
```

## Design Principles

- **Performance**: Components are optimized for smooth animations and minimal impact on main thread
- **Accessibility**: Animations respect user preferences (prefers-reduced-motion)
- **Responsive**: Components adapt to different screen sizes and disable animations on mobile when appropriate
- **Customizable**: Components accept styling and animation configuration props
