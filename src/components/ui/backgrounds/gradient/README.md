# Background Gradient Component

A component that applies an animated gradient background effect to its children with a blurred outer glow and hover enhancement.

## Usage

```tsx
import { BackgroundGradient } from "@/components/ui/backgrounds/gradient";

export default function BackgroundGradientDemo() {
  return (
    <BackgroundGradient className="p-8 w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-lg">
        <h3 className="text-xl font-bold mb-2">Gradient Background Card</h3>
        <p className="text-gray-700 dark:text-gray-300">
          This card has a beautiful animated gradient background effect.
        </p>
      </div>
    </BackgroundGradient>
  );
}
```

## Props

- `children`: React.ReactNode - The content to display inside the gradient background
- `className`: string - Optional CSS class to apply to the inner content container
- `containerClassName`: string - Optional CSS class to apply to the outer container
- `animate`: boolean - Whether to animate the gradient (default: true)

## Features

- Animated gradient background effect that slowly shifts
- Blurred outer glow that intensifies on hover
- Rounded corners and proper z-index stacking
- Hardware-accelerated animations with will-change-transform
- Option to disable animation for performance or design preference

## Examples

### Static Gradient Background

```tsx
<BackgroundGradient animate={false} className="p-6 w-full max-w-sm">
  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
    <h4 className="font-medium">Static Gradient</h4>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      This card has a non-animated gradient background.
    </p>
  </div>
</BackgroundGradient>
```

### Custom Container Styling

```tsx
<BackgroundGradient 
  containerClassName="p-2 max-w-lg"
  className="p-8 w-full"
>
  <div className="bg-white dark:bg-gray-900 rounded-2xl p-8">
    <h3 className="text-xl font-bold">Custom Container</h3>
    <p>This card has custom container styling applied.</p>
  </div>
</BackgroundGradient>
```
