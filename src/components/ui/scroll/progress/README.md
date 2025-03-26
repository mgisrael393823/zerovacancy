# Scroll Progress Component

A fixed progress bar that shows how far the user has scrolled down the page.

## Usage

```tsx
import { ScrollProgress } from "@/components/ui/scroll/progress";

export default function Layout() {
  return (
    <>
      <ScrollProgress />
      <main>{/* Page content */}</main>
    </>
  );
}
```

## Features

- Fixed position at the top of the page
- Smooth, gradient-filled progress bar
- Performance-optimized with throttled scroll updates
- Accessible with proper ARIA roles and attributes
- Automatically calculates page height and scroll position

## Customization

You can customize the component by modifying its style. Example:

```tsx
// Custom colored scroll progress bar
<div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent pointer-events-none">
  <div 
    className="h-full bg-blue-500 transition-transform duration-150 ease-out"
    style={{ 
      width: `${scrollPercentage}%`,
      transform: `translateZ(0)`
    }}
    role="progressbar"
    aria-valuenow={scrollPercentage}
    aria-valuemin={0}
    aria-valuemax={100}
  ></div>
</div>
```

## Implementation Details

- Uses React's `useState` to track scroll percentage
- Uses a custom `useThrottledScroll` hook for performance optimization
- Calculates the maximum possible scroll distance for accuracy
- Applies hardware acceleration for smoother animations