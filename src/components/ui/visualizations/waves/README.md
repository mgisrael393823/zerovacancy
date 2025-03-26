# Waves Component

A component that renders an animated wave grid pattern using HTML Canvas.

## Usage

```tsx
import { Waves } from "@/components/ui/visualizations/waves";

export default function WavesDemo() {
  return (
    <div className="relative h-64 w-full">
      <Waves 
        lineColor="rgba(99, 102, 241, 0.2)" 
        backgroundColor="#f8fafc"
        waveAmpX={20}
        waveAmpY={15}
      />
      <div className="relative z-10 p-6">
        <h3 className="text-xl font-bold">Content on Waves</h3>
        <p>Your content here</p>
      </div>
    </div>
  );
}
```

## Props

- `className`: string - Optional CSS class to apply to the container
- `lineColor`: string - Color of the wave lines (default: 'rgba(0, 0, 0, 0.1)')
- `backgroundColor`: string - Background color of the canvas (default: '#ffffff')
- `xGap`: number - Horizontal spacing between wave lines (default: 20)
- `yGap`: number - Vertical spacing between wave lines (default: 30)
- `waveAmpX`: number - Amplitude of horizontal waves (default: 20)
- `waveAmpY`: number - Amplitude of vertical waves (default: 15)
- `waveSpeedX`: number - Speed of horizontal wave movement (default: 0.012)
- `waveSpeedY`: number - Speed of vertical wave movement (default: 0.01)
- `static`: boolean - If true, waves will not animate (default: false)

## Features

- Canvas-based wave grid pattern
- Smooth animation with sine waves
- Performance optimized with intersection observer (only animates when visible)
- Responsive to container size
- Customizable colors, spacing, amplitude, and speed
- Option for static (non-animated) waves

## Implementation Details

- Uses HTML Canvas for efficient rendering
- Implements intersection observer for performance
- Handles canvas resizing on window resize
- Cleans up event listeners and animation frames when unmounted

## Examples

### Static Waves

```tsx
<Waves 
  static={true}
  lineColor="rgba(0, 0, 0, 0.05)"
  backgroundColor="#f3f4f6"
  xGap={15}
  yGap={15}
/>
```

### Colorful Waves

```tsx
<Waves 
  lineColor="rgba(244, 114, 182, 0.3)"
  backgroundColor="#fdf2f8"
  waveAmpX={30}
  waveAmpY={25}
  waveSpeedX={0.02}
  waveSpeedY={0.015}
/>
```

### Subtle Background Waves

```tsx
<div className="relative min-h-screen">
  <Waves 
    lineColor="rgba(99, 102, 241, 0.1)"
    backgroundColor="transparent"
    xGap={40}
    yGap={40}
    waveAmpX={10}
    waveAmpY={10}
    waveSpeedX={0.008}
    waveSpeedY={0.006}
  />
  <div className="relative z-10 container mx-auto p-8">
    {/* Page content */}
  </div>
</div>
```