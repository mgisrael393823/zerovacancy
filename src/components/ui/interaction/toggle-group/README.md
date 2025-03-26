# Toggle Group Component

A set of two-state buttons that can be toggled on or off. Based on Radix UI's Toggle Group primitive.

## Usage

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/interaction/toggle-group";

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}
```

## Props

### ToggleGroup

Extends Radix UI's Toggle Group component with style variants from the Toggle component.

- `variant`: "default" | "outline"
- `size`: "default" | "sm" | "lg"
- `type`: "single" | "multiple"

### ToggleGroupItem

Extends Radix UI's Toggle Group Item component with style variants from the Toggle component.

- `variant`: "default" | "outline" (inherited from ToggleGroup if not specified)
- `size`: "default" | "sm" | "lg" (inherited from ToggleGroup if not specified)
- `value`: string (required)

## Examples

### Single Selection Toggle Group

```tsx
<ToggleGroup type="single" defaultValue="bold">
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
</ToggleGroup>
```

### Multiple Selection Toggle Group

```tsx
<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
</ToggleGroup>
```

### Outline Variant Toggle Group

```tsx
<ToggleGroup type="single" variant="outline">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>
```
