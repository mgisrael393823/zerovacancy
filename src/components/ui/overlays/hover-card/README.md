# Hover Card Component

The hover card component provides a popup card that appears when hovering over a trigger element. It's useful for displaying additional information without requiring a click.

## Usage

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/overlays/hover-card";

export default function MyComponent() {
  return (
    <HoverCard>
      <HoverCardTrigger>Hover me</HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">@username</h4>
          <p className="text-sm">The Hovercard displays additional information.</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

## Features

- Accessible hover interactions
- Customizable positioning
- Animated transitions
- Radix UI primitives for reliability
