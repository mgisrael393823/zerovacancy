# Parallax Section Component

A component that creates a parallax scrolling effect for background images or content.

## Usage

```tsx
import { ParallaxSection } from "@/components/ui/effects/parallax";

export default function HeroSection() {
  return (
    <ParallaxSection 
      bgImage="/images/hero-background.jpg" 
      speed={0.2}
      direction="up"
      className="min-h-screen"
    >
      <div className="container mx-auto py-24 px-4">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Site</h1>
        <p className="text-xl">Discover amazing content with beautiful parallax effects.</p>
      </div>
    </ParallaxSection>
  );
}
```

## Props

- `children`: ReactNode - Content to display in the foreground
- `className`: string - Optional CSS class to apply to the container
- `bgClassName`: string - Optional CSS class to apply to the background
- `bgImage`: string - URL of the background image to apply the parallax effect to
- `speed`: number - Speed of the parallax effect (default: 0.2)
- `direction`: 'up' | 'down' - Direction of the parallax movement (default: 'up')
- `overflow`: 'visible' | 'hidden' - Overflow behavior of the container (default: 'hidden')
- `disabled`: boolean - Whether to disable the parallax effect (default: false)

## Features

- Smooth parallax scrolling effect for background images
- Automatically disables on mobile devices for better performance
- Respects user preferences for reduced motion
- Performance optimized with spring physics for smooth transitions
- Customizable speed and direction
- Proper z-index stacking for content visibility

## Implementation Details

- Uses Framer Motion for smooth animations
- Calculates scroll position with proper offset for ideal timing
- Applies hardware acceleration for smoother performance
- Disables automatically on mobile devices and for users with reduced motion preferences

## Examples

### Parallax with Text Content

```tsx
<ParallaxSection 
  className="min-h-[60vh] flex items-center"
  bgImage="/images/mountains.jpg"
  bgClassName="opacity-50"
  speed={0.3}
>
  <div className="container mx-auto text-center text-white">
    <h2 className="text-3xl font-bold mb-4">Explore Nature</h2>
    <p className="max-w-2xl mx-auto">
      Discover the beauty of the natural world with our guided tours.
    </p>
  </div>
</ParallaxSection>
```

### Downward Parallax Effect

```tsx
<ParallaxSection 
  bgImage="/images/clouds.jpg"
  direction="down"
  speed={0.1}
  className="min-h-[400px]"
>
  <div className="container mx-auto p-8">
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg max-w-md">
      <h3 className="text-xl font-bold">Our Mission</h3>
      <p>We're dedicated to providing the best experience for our users.</p>
    </div>
  </div>
</ParallaxSection>
```