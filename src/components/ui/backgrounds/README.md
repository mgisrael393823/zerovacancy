# Background Components

This directory contains various background components that provide different visual styles and effects for sections of your application.

## Available Components

### Beams Background

The `BeamsBackground` component creates a background with beam-like patterns and supports various intensity levels.

```tsx
import { BeamsBackground } from "@/components/ui/backgrounds/beams";

<BeamsBackground intensity="medium">
  {/* Your content */}
</BeamsBackground>
```

### Gradient Background

The `BackgroundGradient` component applies an animated gradient background effect with blurred outer glow.

```tsx
import { BackgroundGradient } from "@/components/ui/backgrounds/gradient";

<BackgroundGradient>
  {/* Your content */}
</BackgroundGradient>
```

### Warp Background

The `WarpBackground` component creates a dynamic warping effect that responds to hover and mouse movements.

```tsx
import { WarpBackground } from "@/components/ui/backgrounds/warp";

<WarpBackground>
  {/* Your content */}
</WarpBackground>
```

### Wavy Background

The `WavyBackground` component creates a dynamic, canvas-based animation of colorful waves.

```tsx
import { WavyBackground } from "@/components/ui/backgrounds/wavy";

<WavyBackground>
  {/* Your content */}
</WavyBackground>
```

## Usage Guidelines

- Each background component is designed to wrap your content, providing a visual foundation
- Choose the appropriate background style based on your section's purpose and desired aesthetic
- Many components offer customization options for colors, intensity, and animation behavior
- Consider using these components for:
  - Hero sections
  - Feature highlights
  - Call-to-action areas
  - Testimonial backgrounds
  - Product showcases

## Performance Considerations

- Some background components use canvas or advanced CSS effects that may impact performance
- For performance-sensitive applications, consider using the optimized versions where available
- Test backgrounds on lower-end devices to ensure smooth performance