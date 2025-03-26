# Effects Components

This directory contains components that apply visual and interactive effects to enhance the user experience.

## Available Components

### Parallax Section

The `ParallaxSection` component creates a parallax scrolling effect for background images or content.

```tsx
import { ParallaxSection } from "@/components/ui/effects/parallax";

<ParallaxSection bgImage="/images/background.jpg" speed={0.2}>
  <div>Your content here</div>
</ParallaxSection>
```

### Magnetic

The `Magnetic` component creates a magnetic attraction effect, pulling elements toward the mouse cursor.

```tsx
import { Magnetic } from "@/components/ui/effects/magnetic";

<Magnetic intensity={0.6} range={100}>
  <button>Hover Me</button>
</Magnetic>
```

## Usage Guidelines

- Use effects to enhance the visual appeal and interactivity of your UI
- Consider performance implications, especially on mobile devices
- Respect user preferences for reduced motion
- Apply effects judiciously to avoid overwhelming the user