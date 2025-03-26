# Toggle Component

A two-state button that can be either on or off. Based on Radix UI's Toggle primitive.

## Usage

```tsx
import { Toggle } from "@/components/ui/interaction/toggle";

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle italic">
      Italic
    </Toggle>
  );
}
```

## Props

### Toggle

Extends Radix UI's Toggle component with additional style variants.

- `variant`: "default" | "outline"
- `size`: "default" | "sm" | "lg"

## Examples

### Default Toggle

```tsx
<Toggle>
  Click me
</Toggle>
```

### Outline Toggle

```tsx
<Toggle variant="outline">
  Click me
</Toggle>
```

### Small Toggle

```tsx
<Toggle size="sm">
  Click me
</Toggle>
```

### Large Toggle

```tsx
<Toggle size="lg">
  Click me
</Toggle>
```
